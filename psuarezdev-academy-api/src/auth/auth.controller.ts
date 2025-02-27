import type { Request, Response } from 'express';
import { GET, POST, route } from 'awilix-express';
import { type AuthenticatedRequest } from '@/middlewares/auth';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UtilsService } from '@/shared/utils.service';
import { CustomApiError } from '@/lib/errors';
import { BaseController } from '@/shared/base.controller';

@route('/api/auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService
  ) { super(); }

  @route('/login')
  @POST()
  async login(req: Request, res: Response) {
    try {
      const { dto: loginDto, errors } = await this.utilsService.mapToDto(req.body, LoginDTO);

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          message: 'Validation failed',
          errors
        });
      }

      const data = await this.authService.login(loginDto);

      if (!data) {
        return res.status(403).json({ message: 'Wrong credentials' });
      }

      return res.status(200).json(data);
    } catch(err) {
      return this.handleError(res, err);
    }
  }

  @route('/register')
  @POST()
  async register(req: Request, res: Response) {
    try {
      const { dto: registerDto, errors } = await this.utilsService.mapToDto(req.body, RegisterDTO);

      if (Object.keys(errors).length > 0) {
        throw new CustomApiError(400, 'Validation failed', errors);
      }

      const data = await this.authService.register(registerDto);

      if (!data) {
        throw new CustomApiError(403, 'Wrong credentials');
      }

      return res.status(201).json(data);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/profile')
  @GET()
  async profile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return this.unathorized(res);

      return await this.authService.profile(
        req.user,
        req.headers.authorization?.replace('Bearer ', '') ?? ''
      );
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}
