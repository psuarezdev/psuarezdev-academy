import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import CategoriesManager from './_components/categories-manager';

export default async function Categories() {
  const auth = await getAuth();

  if (!auth || auth.role !== 'admin') return redirect('/');

  const categories = await prisma.category.findMany({
    include: {
      courses: true
    }
  });

  const createCategory = async(name: string) => {
    'use server';
    await prisma.category.create({ data: { name } });
  };

  const updateCategory = async(id: string, name: string) => {
    'use server';
    await prisma.category.update({
      where: { id },
      data: { name }
    });
  };

  const deleteCategory = async(id: string) => {
    'use server';
    await prisma.category.delete({ where: { id } });
  };


  return (
    <div className="container mx-auto py-10">
      <CategoriesManager
        categories={categories}
        createCategory={createCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
      />
    </div>
  );
}