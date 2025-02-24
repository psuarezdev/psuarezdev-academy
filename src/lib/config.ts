export const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50 MB
export const MAX_VIDEO_SIZE = 2.5 * 1024 * 1024 * 1024; // 2.5 GB
export const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
export enum UploadPaths {
  Avatars = 'avatars',
  CoursesImages = 'courses-images',
  CoursesVideos = 'courses-videos',
  Certificates = 'certificates'
}
