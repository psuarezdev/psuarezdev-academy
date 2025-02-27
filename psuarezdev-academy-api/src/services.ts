import { UtilsService } from '@/shared/utils.service';
import { JwtService } from '@/shared/jwt.service';
import { UserService } from '@/user/user.service';
import { StripeService } from './stripe/stripe.service';
import { CourseService } from './course/course.service';
import { CertificateService } from './certificate/certificate.service';
import { UploadService } from './upload/upload.service';
import { RoadmapService } from './roadmap/roadmap.service';
import { RatingService } from './shared/rating.service';
import { FavoriteService } from './favorite/favorite.service';

export default [
  UtilsService,
  JwtService,
  UploadService,
  StripeService,
  UserService,
  CourseService,
  FavoriteService,
  RatingService,
  RoadmapService,
  CertificateService
];
