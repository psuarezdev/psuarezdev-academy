import type { Request, Response } from 'express';
import { GET, POST, route } from 'awilix-express';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { CertificateService } from './certificate.service';
import { BaseController } from '@/shared/base.controller';

@route('/api/certificates')
export class CertificateController extends BaseController {
  constructor(
    private readonly certificateService: CertificateService
  ) { super(); }

  @route('/:id')
  @GET()
  async findById(req: Request, res: Response) {
    try {
      const { certificate, file } = await this.certificateService.findById(req.params.id);

      return res.set({
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${certificate.id}.png"`,
        'Content-Length': file.size.toString()
      }).send(file.stream());
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @POST()
  async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { courseId } = req.body;

      if (!req.user) {
        return res.status(401).json(
          { message: 'Sin autorización' }
        );
      }

      if (!courseId) {
        return res.status(400).json(
          { message: 'El id del curso es obligatorio' }
        );
      }

      const certificate = await this.certificateService.create(req.user, courseId);

      return res.status(201).json(certificate);
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}
