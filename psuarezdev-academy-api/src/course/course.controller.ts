import type { Request, Response } from 'express';
import { GET, POST, route } from 'awilix-express';
import { BaseController } from '@/shared/base.controller';
import { CourseService } from './course.service';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { FavoriteService } from '@/favorite/favorite.service';
import { RatingService } from '@/shared/rating.service';
import { CustomApiError } from '@/lib/errors';

@route('/api/courses')
export class CourseController extends BaseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly ratingService: RatingService,
    private readonly favoriteService: FavoriteService
  ) { super(); }

  @GET()
  async findAll(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      const page = parseInt(req.query.page as string ?? '1');
      const pageSize = 12;
      const skip = (page - 1) * pageSize;

      const data = await this.courseService.findAll(query, pageSize, skip);

      return res.status(200).json(data);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/:courseId')
  @GET()
  async findById(req: AuthenticatedRequest, res: Response) {
    try {
      const course = await this.courseService.finById(req.params.courseId, req.user);
      return res.status(200).json(course);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/:courseId/ratings')
  @GET()
  async findRatings(req: AuthenticatedRequest, res: Response) {
    try {
      const course = await this.courseService.finById(req.params.courseId);
      const ratings = await this.ratingService.findByCourse(req.params.courseId);
      return res.status(200).json({ course, ratings });
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/:courseId/ratings')
  @POST()
  async createRating(req: AuthenticatedRequest, res: Response) {
    try {
      const { rating, comment } = req.body;

      if (!rating || (rating < 0.5 || rating > 5)) {
        throw new CustomApiError(400, 'The rating is mandatory and must be between 0.5 and 5.');
      }

      if (!req.user || req.user.subscription?.status !== 'active') {
        return this.unathorized(res);
      }

    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/:courseId/favorites')
  @POST()
  async toggleFavorite(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return this.unathorized(res);

      const success = await this.favoriteService.toggle(req.user, req.params.courseId);

      return res.status(success ? 200 : 500).end();
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}
