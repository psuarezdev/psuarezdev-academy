import { Users, BookOpen, Star, Waypoints } from 'lucide-react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const auth = await getAuth();

  if(auth?.role !== 'admin') return redirect('/admin/courses');

  const [totalUsers, totalCourses, totalRoadmaps, ratings] = await Promise.all([
    prisma.user.count({
      where: { role: 'user' }
    }),
    prisma.course.count({
      where: { isActive: true }
    }),
    prisma.roadmap.count({
      where: { isActive: true }
    }),
    prisma.rating.findMany({ select: { rating: true } }),
  ]);

  const averageRating = ratings.length > 0
    ? (ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length).toFixed(1)
    : 'N/A';

  const items = [
    {
      label: 'Usuarios totales',
      content: totalUsers,
      icon: Users
    },
    {
      label: 'Cursos totales',
      content: totalCourses,
      icon: BookOpen
    },
    {
      label: 'Rutas totales',
      content: totalRoadmaps,
      icon: Waypoints
    },
    {
      label: 'Valoración media',
      content: averageRating,
      icon: Star
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-3">
      {items.map((item, index) => (
        <Card key={`dashboard-item-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-[300px]">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.content}</div>
          </CardContent>
        </Card>
      ))}      
    </div>
  );
}