import { UploadPaths } from '@/lib/config';
import { Level } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export class UtilsService {
  async mapToDto<T>(data: any, dtoClass: new () => T) {
    const dto = plainToClass(dtoClass, data, { excludeExtraneousValues: true });
    const validationErrors = await validate(dto as object);

    const errors: { [key: string]: string[] } = {};

    validationErrors.forEach(error => {
      if (!error.constraints) return;
      errors[error.property] = Object.values(error.constraints);
    });

    return { dto, errors };
  }

  isValidUploadPath(path: string) {
    return Object.values(UploadPaths).includes(path as UploadPaths);
  }

  isValidLevel(level: string) {
    return Object.values(Level).includes(level as Level);
  }

  getUploadPath(dir: UploadPaths, fileName: string) {
    return `/api/uploads/${dir}/${fileName}`;
  }

  formatDuration(totalDuration: number) {
    if (totalDuration < 1) return `${totalDuration * 100} segundos`;
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    return hours > 0 ? `${hours} horas ${minutes} minutos` : `${minutes.toFixed(2)} minutos`
  }

  formatDate(value: Date | string) {
    return format(value, "d 'de' MMMM 'de' yyyy", { locale: es });
  }
}
