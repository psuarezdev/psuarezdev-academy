import prisma from '@/lib/prisma';
import UsersManager from './_components/users-manager';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { UploadPaths } from '@/lib/config';
import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { remove } from '@/lib/cloudinary';

export default async function Users() {
  const auth = await getAuth();

  if (!auth) return redirect('/');

  const users = await prisma.user.findMany({
    where: {
      id: { not: auth.id }
    },
    omit: { password: true }
  });

  const createUser = async (data: Partial<User>) => {
    'use server';

    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      throw new Error('El nombre, apellidos, email y contraseña son obligatorios para añadir un usuario');
    }

    await prisma.user.create({
      data: {
        ...data,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: await hash(data.password, 10),
        role: data.role ?? 'user'
      }
    });
  };

  const updateUser = async (data: Partial<User>) => {
    'use server';

    if (!data.id || !data.email) {
      throw new Error('El Id y el email son obligatorios para actualizar el usuario');
    }

    if (data.password) delete data.password;

    const userFound = await prisma.user.findUnique({
      where: { id: data.id },
      omit: { password: true },
      include: { courses: true }
    });

    if (!userFound) {
      throw new Error(`No se ha encontrado un usuario con el id ${data.id}`);
    }

    if (data.role !== 'instructor' && userFound.role === 'instructor' && userFound.courses.length > 0) {
      throw new Error('No se puede cambiar el rol a un instructor con cursos asociados');
    }

    if (data.imageUrl && userFound.imagePublicId) {
      await remove(UploadPaths.Avatars, userFound.imagePublicId, {
        resource_type: 'image',
        type: 'upload',
      });
    }

    await prisma.user.update({
      where: { id: data.id },
      data: {
        firstName: data.firstName ?? userFound.firstName,
        lastName: data.lastName ?? userFound.lastName,
        email: data.email ?? userFound.email,
        title: data.title ?? userFound.title,
        role: data.role ?? userFound.role,
        github: data.github ?? userFound.github,
        linkedin: data.linkedin ?? userFound.linkedin,
        website: data.website ?? userFound.website,
        imageUrl: data.imageUrl ?? userFound.imageUrl,
        imagePublicId: data.imagePublicId ?? userFound.imagePublicId
      }
    });
  };

  const deleteUser = async (id: string) => {
    'use server';

    const userFound = await prisma.user.findUnique({
      where: { id },
      select: { imagePublicId: true }
    });

    if (!userFound) {
      throw new Error(`No se ha encontrado un usuario con el id ${id}`);
    }

    if (userFound.imagePublicId) {
      await remove(UploadPaths.Avatars, userFound.imagePublicId, {
        resource_type: 'image',
        type: 'upload',
      }
      );
    }

    await prisma.user.delete({ where: { id } });
  };

  return (
    <div className="container mx-auto py-10">
      <UsersManager
        users={users}
        createUser={createUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}