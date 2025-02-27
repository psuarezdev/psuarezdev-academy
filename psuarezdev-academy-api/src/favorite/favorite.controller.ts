import type { Response } from 'express';
import { route } from 'awilix-express';
import { BaseController } from '@/shared/base.controller';
import { FavoriteService } from './favorite.service';
import { AuthenticatedRequest } from '@/middlewares/auth';

@route('/api/favorites')
export class FavoriteController extends BaseController {
  constructor(
    private readonly favoriteService: FavoriteService
  ) { super(); }

  async findAll(req: AuthenticatedRequest, res: Response) {
    try {
      if(!req.user) return this.unathorized(res);
      const favorites = await this.favoriteService.findAll(req.user);
      return res.status(200).json(favorites);
    } catch (err) {
      return this.handleError(res, err)
    }
  }
}
