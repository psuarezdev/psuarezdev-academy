import type { Response } from 'express';
import { GET, POST, route } from 'awilix-express';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { BaseController } from '@/shared/base.controller';
import { UploadService } from './upload.service';
import { CustomApiError } from '@/lib/errors';
import { UtilsService } from '@/shared/utils.service';
import { UploadPaths } from '@/lib/config';
import { PrismaClient } from '@prisma/client';
import { lookup } from 'mime-types';

@route('/api/uploads')
export class UploadController extends BaseController {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly utilsService: UtilsService,
    private readonly uploadSerive: UploadService
  ) { super(); }

  @route('/:dir/:fileName')
  @GET()
  async findUpload(req: AuthenticatedRequest, res: Response) {
    try {
      const { dir, fileName } = req.params;

      if (!this.utilsService.isValidUploadPath(dir)) {
        throw new CustomApiError(
          400,
          `The path field is not correct, it must be one of the following: ${Object.values(UploadPaths).join(', ')}`
        );
      }

      if (req.user?.role !== 'admin' && dir === UploadPaths.CoursesVideos) {
        if (!req.user?.subscriptionId) {
          return this.unathorized(res);
        }
      }

      const file = await this.uploadSerive.getFile(dir as UploadPaths, fileName);

      if (!file) {
        throw new CustomApiError(404, 'No se ha encontrado el archivo');
      }

      return res.set({
        'Content-Type': lookup(fileName) || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`
      }).send(file);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  @POST()
  async upload(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return this.unathorized(res);
      const file = req.body.file as File;
      const dir = req.body.dir as string;

      if (!file) {
        throw new CustomApiError(400, 'File is required');
      }

      if (!this.utilsService.isValidUploadPath(dir)) {
        throw new CustomApiError(
          400,
          `The path field is not correct, it must be one of the following: ${Object.values(UploadPaths).join(', ')}`
        );
      }

      if (req.user.role === 'user' && dir !== UploadPaths.Avatars) {
        return this.unathorized(res, 'Operation not allowed');
      }

      const fileName = await this.uploadSerive.uploadFile(dir as UploadPaths, file);

      if (!fileName) {
        throw new CustomApiError(500, 'Error uploading file');
      }

      return res.status(200).json({ fileName });
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}
