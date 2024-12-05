import { v2 as cloudinary, type UploadApiOptions } from 'cloudinary';
import { UploadPaths } from './config';

cloudinary.config({
  'cloud_name': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  'api_key': process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  'api_secret': process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export function getVideo(url: string) {
  return cloudinary.url(`psuarezdev-academy/${UploadPaths.CoursesVideos}/${url}`, {
    resource_type: 'video',
    type: 'authenticated',
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1h
  });
}

export async function upload(filePath: string, options?: UploadApiOptions) {
  try {
    return await cloudinary.uploader.upload(filePath, options);
  } catch (error) {
    console.error('Error uploading to cloudinary', error);
    return null;
  }
}

export async function remove(dir: UploadPaths, publicId: string, options?: UploadApiOptions) {
  try {
    await cloudinary.uploader.destroy(`psuarezdev-academy/${dir}/${publicId}`, options);
    return true;
  } catch (error) {
    console.error('Error removing from cloudinary', error);
    return false;
  }
}