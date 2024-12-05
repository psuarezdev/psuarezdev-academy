import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const favoriteFound = await prisma.favorite.findFirst({
      where: {
        userId: auth.id,
        courseId: params.courseId
      }
    });

    if (favoriteFound) {
      await prisma.favorite.delete({
        where: { id: favoriteFound.id }
      });
    } else {
      await prisma.favorite.create({
        data: {
          userId: auth.id,
          courseId: params.courseId
        }
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    NextResponse.json(
      { message: 'Error al actualizar el favorito' },
      { status: 500 }
    );
  }
}