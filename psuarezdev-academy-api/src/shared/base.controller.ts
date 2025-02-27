import type { Response } from 'express';
import { CustomApiError } from '@/lib/errors';

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

  protected unathorized(res: Response, message?: string) {
    return res.status(401).json({
      message: message ?? 'Unathorized'
    });
  }
}
