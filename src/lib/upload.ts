import { join } from 'node:path';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { lookup } from 'mime-types';
import { UploadPaths } from './config';

export async function getFile(dir: UploadPaths, fileName: string) {
  try {
    const path = join(process.cwd(), '..', 'uploads', dir, fileName);

    const type = lookup(fileName) || 'application/octet-stream';
    const buffer = await readFile(path);
    const blob = new Blob([buffer], { type });
    
    return new File([blob], fileName, { type });
  } catch {
    return null;
  }
}

export async function uploadFile(dir: UploadPaths, file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const lastDotIndex = file.name.lastIndexOf('.');
    const fileOriginalName = file.name.slice(0, lastDotIndex);
    const fileExtension = file.name.slice(lastDotIndex + 1);
    const fileName = `${fileOriginalName.toLowerCase().replace(/\s/g, '-')}-${Date.now()}.${fileExtension}`;

    const path = join(process.cwd(), '..', 'uploads', dir, fileName);

    await writeFile(path, buffer);

    return fileName;
  } catch {
    return null;
  }
}

export async function removeFile(dir: UploadPaths, fileName: string) {
  try {
    const path = join(process.cwd(), '..', 'uploads', dir, fileName);
    await unlink(path);
    return true;
  } catch {
    return false;
  }
}