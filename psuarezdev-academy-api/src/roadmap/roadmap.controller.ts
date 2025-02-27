import type { Response } from 'express';
import { GET, route } from 'awilix-express';
import { BaseController } from '@/shared/base.controller';
import { RoadmapService } from './roadmap.service';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { MIN_ROADMAPS_SUBSCRIPTION_PRICE } from '@/lib/config';

@route('/api/roadmaps')
export class RoadmapController extends BaseController {
  constructor(
    private readonly roadmapService: RoadmapService
  ) { super(); }

  @GET()
  async findAll(req: AuthenticatedRequest, res: Response) {
    try {
      if (
        !req.user?.subscription ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (((req.user?.subscription as any)?.plan?.amount ?? 0) / 100) < MIN_ROADMAPS_SUBSCRIPTION_PRICE
      ) {
        return this.unathorized(res);
      }

      const query = req.query.q as string;
      const page = parseInt(req.query.page as string ?? '1');
      const pageSize = 12;
      const skip = (page - 1) * pageSize;

      const data = await this.roadmapService.findAll(query, pageSize, skip);

      return res.status(200).json(data);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @route('/:id')
  @GET()
  async findById(req: AuthenticatedRequest, res: Response) {
    try {
      if (
        !req.user?.subscription ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (((req.user?.subscription as any)?.plan?.amount ?? 0) / 100) < MIN_ROADMAPS_SUBSCRIPTION_PRICE
      ) {
        return this.unathorized(res);
      }

      const roadmap = await this.roadmapService.findById(req.params.id);

      return res.status(200).json(roadmap);
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}
