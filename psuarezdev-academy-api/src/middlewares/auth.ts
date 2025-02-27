import type { Request, NextFunction } from 'express';
import { UserDTO } from '@/user/dto/user.dto';
import { container } from '@/app';
import { CustomApiError } from '@/lib/errors';

export interface AuthenticatedRequest extends Request {
  user?: UserDTO;
}

const excludedPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/stripe/subscriptions'
];

export const authenticate = async (req: any, res: any, next: NextFunction) => {
  try {
    if (excludedPaths.includes(req.originalUrl)) return next();

    const { authorization } = req.headers;

    if (!authorization?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid authorization header' });
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const jwtService = container.resolve('jwtService');

    if (!jwtService) throw new Error('Dependency injection error');

    const user = await jwtService.verifyToken(token);

    if (!user) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    return next();
  } catch (err) {
    if (err instanceof CustomApiError) {
      return res.status(err.statusCode).json({
        message: err.message,
        errors: err.errors
      });
    }

    return res.status(500).json({
      message: 'Something went wrong, please try again.'
    });
  }
};
