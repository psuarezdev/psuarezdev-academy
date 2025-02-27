import { redirect } from 'next/navigation';
import { Rating } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import RatingsManager from './_components/ratings-manager';

export default async function Ratings() {
  const auth = await getAuth();

  if(!auth || auth.role !== 'admin') return redirect('/');

  const users = await prisma.user.findMany({
    where: { role: 'user' },
    omit: {
      password: true
    }
  });

  const courses = await prisma.course.findMany();

  const ratings = await prisma.rating.findMany({
    include: { 
      course: true,
      user: {
        omit: {
          password: true
        }
      }
    }
  });

  const createRating = async(data: Omit<Omit<Rating, 'createdAt'>, 'updatedAt'>) => {
    'use server';
    const ratingFound = await prisma.rating.findFirst({
      where: {
        userId: data.userId,
        courseId: data.courseId
      }
    });

    if(ratingFound) {
      throw new Error('Ya existe una valoración del usuario para el curso');
    } 

    await prisma.rating.create({ 
      data: {
        ...data,
        id: undefined
      }
    });
  };

  const updateRating = async(data: Omit<Omit<Rating, 'createdAt'>, 'updatedAt'>) => {
    'use server';
    const ratingFound = await prisma.rating.findFirst({
      where: { id: data.id }
    });

    if(!ratingFound) {
      throw new Error('No existe una valoración del usuario para el curso');
    } 

    await prisma.rating.update({
      where: {
        id: data.id
      },
      data: {
        rating: data.rating ?? ratingFound.rating,
        comment: data.comment ?? ratingFound.comment,
        userId: data.userId ?? ratingFound.userId,
        courseId: data.courseId ?? ratingFound.courseId
      }
    });
  };

  const deleteRating = async(id: string) => {
    'use server';
    await prisma.rating.delete({ where: { id } });
  };

  return (
    <div className="container mx-auto py-10">
      <RatingsManager 
        ratings={ratings} 
        users={users}
        courses={courses}
        createRating={createRating}
        updateRating={updateRating}
        deleteRating={deleteRating}
      />
    </div>
  );
}
