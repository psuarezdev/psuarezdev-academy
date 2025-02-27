import type { Response } from 'express';
import { CustomApiError } from '@/lib/errors';
import { UserDTO } from '@/user/dto/user.dto';

export class BaseController {
  protected handleError(res: Response, err: unknown) {
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

  protected unathorized(res: Response) {
    return res.status(401).json({
      message: 'Unathorized'
    });
  }
}
