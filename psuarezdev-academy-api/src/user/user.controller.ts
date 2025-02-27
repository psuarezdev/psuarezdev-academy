import type { Response } from 'express';
import { GET, route } from 'awilix-express';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { BaseController } from '@/shared/base.controller';
import { UserService } from './user.service';

@route('/api')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService
  ) { super(); }

  @route('/favorites')
  @GET()
  async findFavorites(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return this.unathorized(res);

      const courses = await this.userService.findFavorites(req.user);

      return res.status(200).json(courses);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/my-learning')
  @GET()
  async findLearning(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return this.unathorized(res);

      const myLearning = await this.userService.findLearning(req.user);

      return res.status(200).json(myLearning);
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}
