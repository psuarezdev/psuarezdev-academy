import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Level } from '@prisma/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UploadPaths } from '@/lib/config';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUploadPath = (path: string) => {
  return Object.values(UploadPaths).includes(path as UploadPaths);
};

export const isValidLevel = (level: string) => {
  return Object.values(Level).includes(level as Level);
};

export const formatDuration = (totalDuration: number) => {
  if (totalDuration < 1) return `${totalDuration * 100} segundos`;
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  return hours > 0 ? `${hours} horas ${minutes} minutos` : `${minutes.toFixed(2)} minutos`
};

export const getUploadPath = (dir: UploadPaths, fileName: string) => {
  return `/api/uploads/${dir}/${fileName}`;
};

export const formatDate = (value: Date | string) => {
  return format(value, "d 'de' MMMM 'de' yyyy", { locale: es });
};

export const roundToHalf = (num: number) => Math.round(num * 2) / 2;
export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
