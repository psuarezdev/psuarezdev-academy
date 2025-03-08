import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { message: 'Servicio no disponible' },
        { status: 503 }
      );
    }

    await prisma.user.createMany({
      data: [
        {
          id: 'cm3p0fbti000092pnuaseg0oe',
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@admin.com',
          password: '$2b$10$6GEraF5zTcx8WO7O9m3z7eDOnekJaeU148qi/WTLxY6enyDi2sJCm',
          role: 'admin',
          createdAt: new Date('2024-11-19T22:12:06.678Z'),
          updatedAt: new Date('2024-11-19T22:12:06.678Z')
        },
        {
          id: 'cm3p0gf1f000192pnrvpzzqud',
          firstName: 'Juan',
          lastName: 'Díaz',
          email: 'juan@juan.com',
          password: '$2b$10$6JzQcPqCc.LzElT.fzdJl.Ekug4UjZsUlya.053tyOuVUTPpLau7G',
          role: 'instructor',
          title: 'Creador del canal pildorasinformaticas y portal de formación con el mismo nombre',
          website: 'https://www.pildorasinformaticas.es/',
          linkedin: 'https://www.linkedin.com/in/juan-d-11328824',
          createdAt: new Date('2024-11-19T22:12:57.507Z'),
          updatedAt: new Date('2024-12-04T19:48:42.394Z'),
          avatar: '1517068446530-1733092272741-1733341721160.jpg'
        },
        {
          id: 'cm3p0gqr7000292pn6sirtw06',
          firstName: 'Pablo',
          lastName: 'Suárez',
          email: 'pablo@pablo.com',
          password: '$2b$10$yLYOybzCuJ3vx8zskKQXjeVAgPNlcvof4j/9g6HcfAktkvebb8cBW',
          role: 'user',
          title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
          github: 'https://github.com/psuarezdev',
          website: 'https://psuarez.pages.dev/',
          linkedin: 'https://www.linkedin.com/in/pablosuarezbm/',
          createdAt: new Date('2024-11-19T22:13:12.692Z'),
          updatedAt: new Date('2024-12-05T17:09:46.038Z'),
          avatar: 'canarias_skills2-1733594607007.jpg'
        }
      ]
    });

    await prisma.category.createMany({
      data: [
        {
          id: 'cm3p0hkhv000392pnsxqgqy1i',
          name: 'Desarrollo Web',
          createdAt: new Date('2024-11-19T22:13:51.234Z')
        },
        {
          id: 'cm44bbd8k0000evqgsvzclb19',
          name: 'Lenguajes de programación',
          createdAt: new Date('2024-11-30T15:13:30.308Z')
        }
      ]
    });

    await prisma.course.createMany({
      data: [
        {
          id: 'cm44dpurx0001evug6imnm4e5',
          title: 'Curso Angular',
          level: 'intermedio',
          description: '<h2>Descripción del curso: Curso Angular</h2>',
          prerequisites: 'JavaScript, TypeScript',
          duration: 751,
          averageRating: 0,
          lessons: 46,
          isActive: true,
          userId: 'cm3p0gf1f000192pnrvpzzqud',
          categoryId: 'cm3p0hkhv000392pnsxqgqy1i',
          createdAt: new Date('2024-11-30T16:20:45.453Z'),
          updatedAt: new Date('2024-12-04T19:45:47.033Z'),
          image: 'curso-angular-1733341545947.jpg'
        },
        {
          id: 'cm44dtbus0001evcsj57fhlmv',
          title: 'Curso Django',
          level: 'intermedio',
          description: '<h2>Descripción del curso: Curso Django</h2>',
          prerequisites: 'Python',
          duration: 1156,
          averageRating: 0,
          lessons: 70,
          isActive: true,
          userId: 'cm3p0gf1f000192pnrvpzzqud',
          categoryId: 'cm3p0hkhv000392pnsxqgqy1i',
          createdAt: new Date('2024-11-30T16:23:27.557Z'),
          updatedAt: new Date('2024-12-04T19:46:18.506Z'),
          image: 'curso-django-1733341577144.jpg'
        },
        {
          id: 'cm44dgkig0001evo01ztw5oqb',
          title: 'Curso de C++',
          level: 'principiante',
          description: '<h2>Descripción del curso: Curso de C++</h2>',
          prerequisites: null,
          duration: 1259,
          averageRating: 3.5,
          lessons: 62,
          isActive: true,
          userId: 'cm3p0gf1f000192pnrvpzzqud',
          categoryId: 'cm44bbd8k0000evqgsvzclb19',
          createdAt: new Date('2024-11-30T16:13:32.248Z'),
          updatedAt: new Date('2025-02-08T19:15:36.537Z'),
          image: 'curso-de-cpp-1733341525377.jpg'
        }
      ]
    });

    await prisma.certificate.createMany({
      data: [
        {
          id: 'cm4g14zzm003vpciw93d96sbk',
          duration: 1259,
          issuedAt: new Date('2024-12-08T19:57:59.352Z'),
          userId: 'cm3p0gqr7000292pn6sirtw06',
          courseId: 'cm44dgkig0001evo01ztw5oqb'
        },
        {
          id: 'cm4g199tm006hpciwj0x181br',
          duration: 751,
          issuedAt: new Date('2024-12-08T20:05:03.858Z'),
          userId: 'cm3p0gqr7000292pn6sirtw06',
          courseId: 'cm44dpurx0001evug6imnm4e5'
        }
      ]
    });

    await prisma.favorite.createMany({
      data: [
        {
          id: 'cm4g0t88f0003pciw31dykavg',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          courseId: 'cm44dgkig0001evo01ztw5oqb',
          createdAt: new Date('2024-12-08T19:52:41.968Z')
        }
      ]
    });

    await prisma.unit.createMany({
      data: [
        {
          id: 'cm44dgkip0003evo0vf5ht9qd',
          title: 'Unidad 1',
          courseId: 'cm44dgkig0001evo01ztw5oqb',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-11-30 16:13:32.258')
        },
        {
          id: 'cm44dgkjc000pevo0raen3zme',
          title: 'Unidad 2',
          courseId: 'cm44dgkig0001evo01ztw5oqb',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-11-30 16:13:32.28')
        },
        {
          id: 'cm44dgkjm001bevo0riwu6jzy',
          title: 'Unidad 3',
          courseId: 'cm44dgkig0001evo01ztw5oqb',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-11-30 16:13:32.29')
        },
        {
          id: 'cm44dgkjr001xevo0xskvi990',
          title: 'Unidad 4',
          courseId: 'cm44dgkig0001evo01ztw5oqb',
          createdAt: new Date('2024-11-30 16:13:32.295'),
          updatedAt: new Date('2024-11-30 16:13:32.295')
        },
        {
          id: 'cm44dpus30003evugcwn3zx9l',
          title: 'Unidad 1',
          courseId: 'cm44dpurx0001evug6imnm4e5',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-11-30 16:20:45.459')
        },
        {
          id: 'cm44dpus8000pevugm2pzm3jx',
          title: 'Unidad 2',
          courseId: 'cm44dpurx0001evug6imnm4e5',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-11-30 16:20:45.465')
        },
        {
          id: 'cm44dpusc001bevugni7fizhr',
          title: 'Unidad 3',
          courseId: 'cm44dpurx0001evug6imnm4e5',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-11-30 16:20:45.468')
        },
        {
          id: 'cm44dtbux0003evcsfhwhdfbp',
          title: 'Unidad 1',
          courseId: 'cm44dtbus0001evcsj57fhlmv',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-11-30 16:23:27.561')
        },
        {
          id: 'cm44dtbv3000pevcscjrehwdu',
          title: 'Unidad 2',
          courseId: 'cm44dtbus0001evcsj57fhlmv',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-11-30 16:23:27.568')
        },
        {
          id: 'cm44dtbv8001bevcsrzplq638',
          title: 'Unidad 3',
          courseId: 'cm44dtbus0001evcsj57fhlmv',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-11-30 16:23:27.572')
        },
        {
          id: 'cm44dtbvb001xevcsx80zh22s',
          title: 'Unidad 4',
          courseId: 'cm44dtbus0001evcsj57fhlmv',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-11-30 16:23:27.576')
        }
      ]
    });

    await prisma.lesson.createMany({
      data: [
        {
          id: 'cm44dgkip0006evo0qlhsee1v',
          title: 'Curso C++. Compilador y primer programa. Vídeo 3 de pildorasinformaticas 55.327 visualizaciones hace 2 años 20 minutos',
          duration: 20.34,
          video: 'cpp-03_e9ypog.mp4',
          description: '<h3>Curso C++. Compilador y primer programa. Vídeo 3 de pildorasinformaticas 55.327 visualizaciones hace 2 años 20 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dgkip0005evo0gvdh7ccw',
          title: 'Curso C++. Temario e instalación de editor. Vídeo 2 de pildorasinformaticas 42.427 visualizaciones hace 2 años 13 minutos y 2 segundos',
          duration: 13.02,
          video: 'cpp-02_acnixr.mp4',
          description: '<h3>Curso C++. Temario e instalación de editor. Vídeo 2 de pildorasinformaticas 42.427 visualizaciones hace 2 años 13 minutos y 2 segundos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.172')
        },
        {
          id: 'cm44dpus90016evugt365ucr6',
          title: 'Curso Angular. Firebase VI. Eliminando registros. Vídeo 37 de pildorasinformaticas 7052 visualizaciones hace 2 años 10 minutos y 16 segundos',
          duration: 10.16,
          video: 'angular-37_alcqre.mp4',
          description: '<h3>Curso Angular. Firebase VI. Eliminando registros. Vídeo 37 de pildorasinformaticas 7052 visualizaciones hace 2 años 10 minutos y 16 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dtbv30010evcstff1511l',
          title: 'Curso Django. Proyecto web completo VI. Vídeo 31 de pildorasinformaticas 39.517 visualizaciones hace 4 años 11 minutos y 36 segundos',
          duration: 11.36,
          video: 'django-31_yykpjp.mp4',
          description: '<h3>Curso Django. Proyecto web completo VI. Vídeo 31 de pildorasinformaticas 39.517 visualizaciones hace 4 años 11 minutos y 36 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv8001tevcs32igj50r',
          title: 'Curso Django. Proyecto web completo XXIII. Vídeo 58 de pildorasinformaticas 26.838 visualizaciones hace 3 años 14 minutos y 18 segundos',
          duration: 14.18,
          video: 'django-58_vyrx4h.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXIII. Vídeo 58 de pildorasinformaticas 26.838 visualizaciones hace 3 años 14 minutos y 18 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv3000xevcs5j9t0eml',
          title: 'Curso Django. Proyecto web completo III. Vídeo 28 de pildorasinformaticas 55.647 visualizaciones hace 4 años 17 minutos',
          duration: 17.14,
          video: 'django-28_z6srzt.mp4',
          description: '<h3>Curso Django. Proyecto web completo III. Vídeo 28 de pildorasinformaticas 55.647 visualizaciones hace 4 años 17 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux0005evcskto6gjp1',
          title: 'Curso Django. Creación primer proyecto. Vídeo 2 de pildorasinformaticas 321.565 visualizaciones hace 5 años 17 minutos',
          duration: 17.5,
          video: 'django-02_r0qdrq.mp4',
          description: '<h3>Curso Django. Creación primer proyecto. Vídeo 2 de pildorasinformaticas 321.565 visualizaciones hace 5 años 17 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjm001ievo01el2qntn',
          title: 'Curso C++. Punteros VI. Paso de punteros por parámetros. Vídeo 47 de pildorasinformaticas 3638 visualizaciones hace 8 meses 13 minutos y 26 segundos',
          duration: 13.26,
          video: 'cpp-47_wuyjiz.mp4',
          description: '<h3>Curso C++. Punteros VI. Paso de punteros por parámetros. Vídeo 47 de pildorasinformaticas 3638 visualizaciones hace 8 meses 13 minutos y 26 segundos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dgkiq000bevo0di6v1yvc',
          title: 'Curso C++. Ejemplo sencillo con variables. Vídeo 8 de pildorasinformaticas 14.871 visualizaciones hace 2 años 19 minutos',
          duration: 19.52,
          video: 'cpp-08_ttcw5r.mp4',
          description: '<h3>Curso C++. Ejemplo sencillo con variables. Vídeo 8 de pildorasinformaticas 14.871 visualizaciones hace 2 años 19 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus90010evugdcw22xj4',
          title: 'Curso Angular. Routing VIII. Páginas de error. Vídeo 31 de pildorasinformaticas 11.313 visualizaciones hace 2 años 8 minutos y 51 segundos',
          duration: 8.51,
          video: 'angular-31_vhx8iz.mp4',
          description: '<h3>Curso Angular. Routing VIII. Páginas de error. Vídeo 31 de pildorasinformaticas 11.313 visualizaciones hace 2 años 8 minutos y 51 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dgkjc0011evo0xkooso5h',
          title: 'Curso C++. Bucles anidados I. Vídeo 32 de pildorasinformaticas 2974 visualizaciones hace 1 año 22 minutos',
          duration: 22.53,
          video: 'cpp-32_syg3wz.mp4',
          description: '<h3>Curso C++. Bucles anidados I. Vídeo 32 de pildorasinformaticas 2974 visualizaciones hace 1 año 22 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.173')
        },
        {
          id: 'cm44dtbv30017evcsky3omaac',
          title: 'Curso Django. Proyecto web completo XIII. Vídeo 38 de pildorasinformaticas 29.000 visualizaciones hace 4 años 24 minutos',
          duration: 24.28,
          video: 'django-38_rhdp0i.mp4',
          description: '<h3>Curso Django. Proyecto web completo XIII. Vídeo 38 de pildorasinformaticas 29.000 visualizaciones hace 4 años 24 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbux000hevcsvxl6v8k0',
          title: 'Curso Django. BBDD IV. PostgreSql. Vídeo 14 de pildorasinformaticas 90.175 visualizaciones hace 5 años 15 minutos',
          duration: 15.36,
          video: 'django-14_d5dez4.mp4',
          description: '<h3>Curso Django. BBDD IV. PostgreSql. Vídeo 14 de pildorasinformaticas 90.175 visualizaciones hace 5 años 15 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dgkiq000kevo0oeyzrgm3',
          title: 'Curso C++. Operadores I. Vídeo 17 de pildorasinformaticas 7371 visualizaciones hace 1 año 23 minutos',
          duration: 23.36,
          video: 'cpp-17_du4f7g.mp4',
          description: '<h3>Curso C++. Operadores I. Vídeo 17 de pildorasinformaticas 7371 visualizaciones hace 1 año 23 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dpus3000aevughkjs9pb7',
          title: 'Curso Angular. Interpolación. Vídeo 7 de pildorasinformaticas 47.990 visualizaciones hace 3 años 26 minutos',
          duration: 26.59,
          video: 'angular-07_pfwgpi.mp4',
          description: '<h3>Curso Angular. Interpolación. Vídeo 7 de pildorasinformaticas 47.990 visualizaciones hace 3 años 26 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dpusc001cevuga4d0s14k',
          title: 'Curso Angular. Login IV. Vídeo 41 de pildorasinformaticas 8519 visualizaciones hace 2 años 11 minutos y 50 segundos',
          duration: 11.5,
          video: 'angular-41_gxc7hj.mp4',
          description: '<h3>Curso Angular. Login IV. Vídeo 41 de pildorasinformaticas 8519 visualizaciones hace 2 años 11 minutos y 50 segundos</h3>',
          unitId: 'cm44dpusc001bevugni7fizhr',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dtbv30013evcsoiumlwb2',
          title: 'Curso Django. Proyecto web completo IX. Vídeo 34 de pildorasinformaticas 35.085 visualizaciones hace 4 años 16 minutos',
          duration: 16.07,
          video: 'django-34_orbu5i.mp4',
          description: '<h3>Curso Django. Proyecto web completo IX. Vídeo 34 de pildorasinformaticas 35.085 visualizaciones hace 4 años 16 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dgkip0004evo0lg0ix9je',
          title: 'Curso C++. ¿Por qué aprender C++? Vídeo 1 de pildorasinformaticas 94.857 visualizaciones hace 2 años 10 minutos y 5 segundos',
          duration: 10.05,
          video: 'cpp-01_n1nzvu.mp4',
          description: '<h3>Curso C++. ¿Por qué aprender C++? Vídeo 1 de pildorasinformaticas 94.857 visualizaciones hace 2 años 10 minutos y 5 segundos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dpus8000wevugocurog48',
          title: 'Curso Angular. Routing IV. Vídeo 27 de pildorasinformaticas 14.653 visualizaciones hace 3 años 16 minutos',
          duration: 16.04,
          video: 'angular-27_invxlc.mp4',
          description: '<h3>Curso Angular. Routing IV. Vídeo 27 de pildorasinformaticas 14.653 visualizaciones hace 3 años 16 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dgkiq000hevo00j7yp0r1',
          title: 'Curso C++. Arrays multidimensionales. Vídeo 14 de pildorasinformaticas 10.612 visualizaciones hace 1 año 21 minutos',
          duration: 21.23,
          video: 'cpp-14_p4kufk.mp4',
          description: '<h3>Curso C++. Arrays multidimensionales. Vídeo 14 de pildorasinformaticas 10.612 visualizaciones hace 1 año 21 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dtbux000aevcsc43n2ne5',
          title: 'Curso Django. Plantillas III. Bucles y condicionales en plantillas. Vídeo 7 de pildorasinformaticas 102.293 visualizaciones hace 5 años 20 minutos',
          duration: 20.14,
          video: 'django-07_umtcdo.mp4',
          description: '<h3>Curso Django. Plantillas III. Bucles y condicionales en plantillas. Vídeo 7 de pildorasinformaticas 102.293 visualizaciones hace 5 años 20 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dgkjc0014evo018d65879',
          title: 'Curso C++. Funciones II. Prototipos. Vídeo 35 de pildorasinformaticas 6736 visualizaciones hace 1 año 20 minutos',
          duration: 20.27,
          video: 'cpp-35_sa0vzg.mp4',
          description: '<h3>Curso C++. Funciones II. Prototipos. Vídeo 35 de pildorasinformaticas 6736 visualizaciones hace 1 año 20 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.185')
        },
        {
          id: 'cm44dpus9000zevuggg73s9bd',
          title: 'Curso Angular. Routing VII. Vídeo 30 de pildorasinformaticas 13.131 visualizaciones hace 2 años 16 minutos',
          duration: 16.53,
          video: 'angular-30_qsfy6q.mp4',
          description: '<h3>Curso Angular. Routing VII. Vídeo 30 de pildorasinformaticas 13.131 visualizaciones hace 2 años 16 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.182')
        },
        {
          id: 'cm44dtbv8001kevcs3mxailw8',
          title: 'Curso Django. Proyecto web completo XXIV. Vídeo 49 de pildorasinformaticas 17.868 visualizaciones hace 3 años 20 minutos',
          duration: 20.17,
          video: 'django-49_oxgiic.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXIV. Vídeo 49 de pildorasinformaticas 17.868 visualizaciones hace 3 años 20 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.183')
        },
        {
          id: 'cm44dgkiq000aevo0si9ncjgt',
          title: 'Curso C++. Declaración e inicialización de variables. Vídeo 7 de pildorasinformaticas 17.704 visualizaciones hace 2 años 20 minutos',
          duration: 20.46,
          video: 'cpp-07_in2p8n.mp4',
          description: '<h3>Curso C++. Declaración e inicialización de variables. Vídeo 7 de pildorasinformaticas 17.704 visualizaciones hace 2 años 20 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.183')
        },
        {
          id: 'cm44dtbvb0024evcs2zmxpxqu',
          title: 'Curso Django. Proyecto completo XXXII. Creando app Pedidos. Vídeo 67 de pildorasinformaticas 12.320 visualizaciones hace 2 años 18 minutos',
          duration: 18.04,
          video: 'django-67_ozlvca.mp4',
          description: '<h3>Curso Django. Proyecto completo XXXII. Creando app Pedidos. Vídeo 67 de pildorasinformaticas 12.320 visualizaciones hace 2 años 18 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dtbv8001ievcs3j4g6r14',
          title: 'Curso Django. Proyecto web completo XXII. Vídeo 47 de pildorasinformaticas 17.070 visualizaciones hace 3 años 13 minutos y 4 segundos',
          duration: 13.04,
          video: 'django-47_hr90yr.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXII. Vídeo 47 de pildorasinformaticas 17.070 visualizaciones hace 3 años 13 minutos y 4 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dtbux0009evcsaexp8g51',
          title: 'Curso Django. Plantillas II  Variables y propiedades en plantillas. Vídeo 6 de pildorasinformaticas 120.921 visualizaciones hace 5 años 15 minutos',
          duration: 15.24,
          video: 'django-06_bw9wdg.mp4',
          description: '<h3>Curso Django. Plantillas II  Variables y propiedades en plantillas. Vídeo 6 de pildorasinformaticas 120.921 visualizaciones hace 5 años 15 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dgkip0008evo0asynlfoi',
          title: 'Curso C++. Disección del primer programa. Vídeo 5 de pildorasinformaticas 26.470 visualizaciones hace 2 años 23 minutos',
          duration: 23.13,
          video: 'cpp-05_c4dnue.mp4',
          description: '<h3>Curso C++. Disección del primer programa. Vídeo 5 de pildorasinformaticas 26.470 visualizaciones hace 2 años 23 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.175')
        },
        {
          id: 'cm44dgkip0007evo0rnabpcsi',
          title: 'Curso C++. Compilación. Vídeo 4 de pildorasinformaticas 26.466 visualizaciones hace 2 años 13 minutos y 27 segundos',
          duration: 13.27,
          video: 'cpp-04_byvwug.mp4',
          description: '<h3>Curso C++. Compilación. Vídeo 4 de pildorasinformaticas 26.466 visualizaciones hace 2 años 13 minutos y 27 segundos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.175')
        },
        {
          id: 'cm44dpus90014evugpvxw1s3z',
          title: 'Curso Angular. Firebase IV. Mostrando registros. Vídeo 35 de pildorasinformaticas 9105 visualizaciones hace 2 años 11 minutos y 40 segundos',
          duration: 11.4,
          video: 'angular-35_uj2nwy.mp4',
          description: '<h3>Curso Angular. Firebase IV. Mostrando registros. Vídeo 35 de pildorasinformaticas 9105 visualizaciones hace 2 años 11 minutos y 40 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.175')
        },
        {
          id: 'cm44dgkiq000devo022gpvh5s',
          title: 'Curso C++. Ejercicio práctico sencillo. Vídeo 10 de pildorasinformaticas 13.370 visualizaciones hace 2 años 25 minutos',
          duration: 25.12,
          video: 'cpp-10_k9cav3.mp4',
          description: '<h3>Curso C++. Ejercicio práctico sencillo. Vídeo 10 de pildorasinformaticas 13.370 visualizaciones hace 2 años 25 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dpus90015evugg39wihmz',
          title: 'Curso Angular. Firebase V. Actualizando registros. Vídeo 36 de pildorasinformaticas 7885 visualizaciones hace 2 años 10 minutos y 37 segundos',
          duration: 10.37,
          video: 'angular-36_azburo.mp4',
          description: '<h3>Curso Angular. Firebase V. Actualizando registros. Vídeo 36 de pildorasinformaticas 7885 visualizaciones hace 2 años 10 minutos y 37 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dpus8000qevugql8028t5',
          title: 'Curso Angular. Servicios. Vídeo 21 de pildorasinformaticas 32.196 visualizaciones hace 3 años 24 minutos',
          duration: 24.19,
          video: 'angular-21_vtuiyy.mp4',
          description: '<h3>Curso Angular. Servicios. Vídeo 21 de pildorasinformaticas 32.196 visualizaciones hace 3 años 24 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus3000kevugdrp18k7m',
          title: 'Curso Angular. Directivas IV. Vídeo 17 de pildorasinformaticas 24.267 visualizaciones hace 3 años 15 minutos',
          duration: 15.33,
          video: 'angular-17_yufumj.mp4',
          description: '<h3>Curso Angular. Directivas IV. Vídeo 17 de pildorasinformaticas 24.267 visualizaciones hace 3 años 15 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dpus8000xevugo5k7f1z6',
          title: 'Curso Angular. Routing V. Vídeo 28 de pildorasinformaticas 13.812 visualizaciones hace 3 años 17 minutos',
          duration: 17.38,
          video: 'angular-28_rtscon.mp4',
          description: '<h3>Curso Angular. Routing V. Vídeo 28 de pildorasinformaticas 13.812 visualizaciones hace 3 años 17 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.174')
        },
        {
          id: 'cm44dgkiq000mevo0bysffse7',
          title: 'Curso C++. Operadores y condicional IF I. Vídeo 19 de pildorasinformaticas 5455 visualizaciones hace 1 año 18 minutos',
          duration: 18.33,
          video: 'cpp-19_kmq5ps.mp4',
          description: '<h3>Curso C++. Operadores y condicional IF I. Vídeo 19 de pildorasinformaticas 5455 visualizaciones hace 1 año 18 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjm001gevo0otliv9fw',
          title: 'Curso C++. Punteros IV. Arrays y punteros. Aritmética de punteros. Vídeo 45 de pildorasinformaticas 3357 visualizaciones hace 9 meses 16 minutos',
          duration: 16.53,
          video: 'cpp-45_wlkk6c.mp4',
          description: '<h3>Curso C++. Punteros IV. Arrays y punteros. Aritmética de punteros. Vídeo 45 de pildorasinformaticas 3357 visualizaciones hace 9 meses 16 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001fevo0vici5854',
          title: 'Curso C++. Punteros III. Gestión de la memoria. Vídeo 44 de pildorasinformaticas 4239 visualizaciones hace 9 meses 25 minutos',
          duration: 25.23,
          video: 'cpp-44_lsjmjl.mp4',
          description: '<h3>Curso C++. Punteros III. Gestión de la memoria. Vídeo 44 de pildorasinformaticas 4239 visualizaciones hace 9 meses 25 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc000revo0a7a46w53',
          title: 'Curso C++. Switch-Case I. Vídeo 22 de pildorasinformaticas 6167 visualizaciones hace 1 año 18 minutos',
          duration: 18.23,
          video: 'cpp-22_a48jac.mp4',
          description: '<h3>Curso C++. Switch-Case I. Vídeo 22 de pildorasinformaticas 6167 visualizaciones hace 1 año 18 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus9000yevug8vmj6fbk',
          title: 'Curso Angular. Routing VI. Vídeo 29 de pildorasinformaticas 11.678 visualizaciones hace 2 años 10 minutos y 20 segundos',
          duration: 10.2,
          video: 'angular-29_dbszvy.mp4',
          description: '<h3>Curso Angular. Routing VI. Vídeo 29 de pildorasinformaticas 11.678 visualizaciones hace 2 años 10 minutos y 20 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dpus8000sevugxhndc4cq',
          title: 'Curso Angular. Servicios III. Vídeo 23 de pildorasinformaticas 16.748 visualizaciones hace 3 años 10 minutos y 39 segundos',
          duration: 10.39,
          video: 'angular-23_hzti43.mp4',
          description: '<h3>Curso Angular. Servicios III. Vídeo 23 de pildorasinformaticas 16.748 visualizaciones hace 3 años 10 minutos y 39 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dpus8000uevugrdn1b4lg',
          title: 'Curso Angular. Routing II. Vídeo 25 de pildorasinformaticas 25.224 visualizaciones hace 3 años 8 minutos y 53 segundos',
          duration: 8.53,
          video: 'angular-25_obomla.mp4',
          description: '<h3>Curso Angular. Routing II. Vídeo 25 de pildorasinformaticas 25.224 visualizaciones hace 3 años 8 minutos y 53 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpusc001gevugyk2l3osu',
          title: 'Curso Angular. Protegiendo páginas. Vídeo 45 de pildorasinformaticas 9122 visualizaciones hace 2 años 13 minutos y 16 segundos',
          duration: 13.16,
          video: 'angular-45_kbcigg.mp4',
          description: '<h3>Curso Angular. Protegiendo páginas. Vídeo 45 de pildorasinformaticas 9122 visualizaciones hace 2 años 13 minutos y 16 segundos</h3>',
          unitId: 'cm44dpusc001bevugni7fizhr',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjc0019evo08cdx2gx4',
          title: 'Curso C++. Funciones VII. Auto return. Vídeo 40 de pildorasinformaticas 3085 visualizaciones hace 1 año 18 minutos',
          duration: 18.09,
          video: 'cpp-40_achslp.mp4',
          description: '<h3>Curso C++. Funciones VII. Auto return. Vídeo 40 de pildorasinformaticas 3085 visualizaciones hace 1 año 18 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjc000sevo0u5lg5usb',
          title: 'Curso C++. Switch-Case II. Vídeo 23 de pildorasinformaticas 4327 visualizaciones hace 1 año 14 minutos y 36 segundos',
          duration: 14.36,
          video: 'cpp-23_zm6jee.mp4',
          description: '<h3>Curso C++. Switch-Case II. Vídeo 23 de pildorasinformaticas 4327 visualizaciones hace 1 año 14 minutos y 36 segundos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbux000fevcs3iyjgz42',
          title: 'Curso Django. BBDD II. Vídeo 12 de pildorasinformaticas 94.327 visualizaciones hace 5 años 21 minutos',
          duration: 21.1,
          video: 'django-12_yqbjk4.mp4',
          description: '<h3>Curso Django. BBDD II. Vídeo 12 de pildorasinformaticas 94.327 visualizaciones hace 5 años 21 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus3000jevugynlmli1m',
          title: 'Curso Angular. Directivas III. Vídeo 16 de pildorasinformaticas 27.577 visualizaciones hace 3 años 18 minutos',
          duration: 18.26,
          video: 'angular-16_pnhang.mp4',
          description: '<h3>Curso Angular. Directivas III. Vídeo 16 de pildorasinformaticas 27.577 visualizaciones hace 3 años 18 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbv8001uevcshjvuixkd',
          title: 'Curso Django. Proyecto web completo XXIV. Vídeo 59 de pildorasinformaticas 12.746 visualizaciones hace 2 años 16 minutos',
          duration: 16,
          video: 'django -59_lzedhf.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXIV. Vídeo 59 de pildorasinformaticas 12.746 visualizaciones hace 2 años 16 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001sevo0sy8t77if',
          title: 'Curso C++. POO. Modificadores de acceso. Protected. Vídeo 57 de pildorasinformaticas 1591 visualizaciones hace 3 meses 17 minutos',
          duration: 17.46,
          video: 'cpp-57_fmpwab.mp4',
          description: '<h3>Curso C++. POO. Modificadores de acceso. Protected. Vídeo 57 de pildorasinformaticas 1591 visualizaciones hace 3 meses 17 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001jevo01f7wikb2',
          title: 'Curso C++. Punteros VII. Devolución de punteros. Vídeo 48 de pildorasinformaticas 5815 visualizaciones hace 7 meses 25 minutos',
          duration: 25.33,
          video: 'cpp-48_cakcin.mp4',
          description: '<h3>Curso C++. Punteros VII. Devolución de punteros. Vídeo 48 de pildorasinformaticas 5815 visualizaciones hace 7 meses 25 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001hevo0a3p0onu1',
          title: 'Curso C++. Punteros V. Constantes y punteros. Vídeo 46 de pildorasinformaticas 3183 visualizaciones hace 8 meses 20 minutos',
          duration: 20.1,
          video: 'cpp-46_rjufi1.mp4',
          description: '<h3>Curso C++. Punteros V. Constantes y punteros. Vídeo 46 de pildorasinformaticas 3183 visualizaciones hace 8 meses 20 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dpus3000nevug7ea4jdv5',
          title: 'Curso Angular. Comunicación entre componentes II. Vídeo 20 de pildorasinformaticas 26.670 visualizaciones hace 3 años 25 minutos',
          duration: 25.18,
          video: 'angular-20_nunria.mp4',
          description: '<h3>Curso Angular. Comunicación entre componentes II. Vídeo 20 de pildorasinformaticas 26.670 visualizaciones hace 3 años 25 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv30012evcsahhyztq2',
          title: 'Curso Django. Proyecto web completo VIII. Vídeo 33 de pildorasinformaticas 38.363 visualizaciones hace 4 años 11 minutos y 38 segundos',
          duration: 11.38,
          video: 'django-33_kqpzjl.mp4',
          description: '<h3>Curso Django. Proyecto web completo VIII. Vídeo 33 de pildorasinformaticas 38.363 visualizaciones hace 4 años 11 minutos y 38 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.175')
        },
        {
          id: 'cm44dgkjm001uevo0nfsdv1tb',
          title: 'Curso C++. Destructores. Vídeo 59 de pildorasinformaticas 1425 visualizaciones hace 2 meses 21 minutos',
          duration: 21.09,
          video: 'cpp-59_z6f16m.mp4',
          description: '<h3>Curso C++. Destructores. Vídeo 59 de pildorasinformaticas 1425 visualizaciones hace 2 meses 21 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.175')
        },
        {
          id: 'cm44dgkjc0017evo0l46b5neg',
          title: 'Curso C++. Funciones V. Sobrecarga de funciones. Vídeo 38 de pildorasinformaticas 3493 visualizaciones hace 1 año 20 minutos',
          duration: 20.59,
          video: 'cpp-38_tkhwzz.mp4',
          description: '<h3>Curso C++. Funciones V. Sobrecarga de funciones. Vídeo 38 de pildorasinformaticas 3493 visualizaciones hace 1 año 20 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.175')
        },
        {
          id: 'cm44dpus90013evug10xcvha8',
          title: 'Curso Angular. Firebase III. Obteniendo registros. Vídeo 34 de pildorasinformaticas 11.972 visualizaciones hace 2 años 16 minutos',
          duration: 16.16,
          video: 'angular-34_pb9d8i.mp4',
          description: '<h3>Curso Angular. Firebase III. Obteniendo registros. Vídeo 34 de pildorasinformaticas 11.972 visualizaciones hace 2 años 16 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjm001revo04gpzz177',
          title: 'Curso C++. POO. Acceso a propiedades y métodos usando punteros. Vídeo 56 de pildorasinformaticas 2357 visualizaciones hace 3 meses 12 minutos y 48 segundos',
          duration: 12.48,
          video: 'cpp-56_xqdlhs.mp4',
          description: '<h3>Curso C++. POO. Acceso a propiedades y métodos usando punteros. Vídeo 56 de pildorasinformaticas 2357 visualizaciones hace 3 meses 12 minutos y 48 segundos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus3000ievugsnf5fo9e',
          title: 'Curso Angular. Directivas II. Vídeo 15 de pildorasinformaticas 29.208 visualizaciones hace 3 años 19 minutos',
          duration: 19.15,
          video: 'angular-15_rzbodx.mp4',
          description: '<h3>Curso Angular. Directivas II. Vídeo 15 de pildorasinformaticas 29.208 visualizaciones hace 3 años 19 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjm001eevo0pwgqrfw8',
          title: 'Curso C++. Punteros II. Sintaxis y uso. Vídeo 43 de pildorasinformaticas 7470 visualizaciones hace 11 meses 24 minutos',
          duration: 24.1,
          video: 'cpp-43_gxmvaq.mp4',
          description: '<h3>Curso C++. Punteros II. Sintaxis y uso. Vídeo 43 de pildorasinformaticas 7470 visualizaciones hace 11 meses 24 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbv30014evcsum0qomyq',
          title: 'Curso Django. Proyecto web completo X. Vídeo 35 de pildorasinformaticas 34.533 visualizaciones hace 4 años 17 minutos',
          duration: 17.53,
          video: 'django-35_grmew2.mp4',
          description: '<h3>Curso Django. Proyecto web completo X. Vídeo 35 de pildorasinformaticas 34.533 visualizaciones hace 4 años 17 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbux000gevcsfvkma5d6',
          title: 'Curso Django. BBDD III. Vídeo 13 de pildorasinformaticas 73.171 visualizaciones hace 5 años 14 minutos y 52 segundos',
          duration: 14.52,
          video: 'django-13_vzxylg.mp4',
          description: '<h3>Curso Django. BBDD III. Vídeo 13 de pildorasinformaticas 73.171 visualizaciones hace 5 años 14 minutos y 52 segundos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001levo03pb77won',
          title: 'Curso C++. Referencias I. Qué son. Vídeo 50 de pildorasinformaticas 2233 visualizaciones hace 7 meses 17 minutos',
          duration: 17.18,
          video: 'cpp-50_oowtwb.mp4',
          description: '<h3>Curso C++. Referencias I. Qué son. Vídeo 50 de pildorasinformaticas 2233 visualizaciones hace 7 meses 17 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dpus8000tevugt2w43rqo',
          title: 'Curso Angular. Routing I. Vídeo 24 de pildorasinformaticas 34.997 visualizaciones hace 3 años 15 minutos',
          duration: 15.57,
          video: 'angular-24_m6lujp.mp4',
          description: '<h3>Curso Angular. Routing I. Vídeo 24 de pildorasinformaticas 34.997 visualizaciones hace 3 años 15 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux0007evcsqct34ras',
          title: 'Curso Django. Parámetros en URL. Vídeo 4 de pildorasinformaticas 179.000 visualizaciones hace 5 años 18 minutos',
          duration: 18.43,
          video: 'django-04_pxzrls.mp4',
          description: '<h3>Curso Django. Parámetros en URL. Vídeo 4 de pildorasinformaticas 179.000 visualizaciones hace 5 años 18 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux0006evcs9z3oqqk9',
          title: 'Curso Django. Creación de primera página. Vídeo 3 de pildorasinformaticas 243.591 visualizaciones hace 5 años 12 minutos y 15 segundos',
          duration: 12.15,
          video: 'django-03_cyh26d.mp4',
          description: '<h3>Curso Django. Creación de primera página. Vídeo 3 de pildorasinformaticas 243.591 visualizaciones hace 5 años 12 minutos y 15 segundos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dpus90012evugenl68wba',
          title: 'Curso Angular. Firebase II. Insertando registros. Vídeo 33 de pildorasinformaticas 15.919 visualizaciones hace 2 años 21 minutos',
          duration: 21.49,
          video: 'angular-33_fi6rdd.mp4',
          description: '<h3>Curso Angular. Firebase II. Insertando registros. Vídeo 33 de pildorasinformaticas 15.919 visualizaciones hace 2 años 21 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjr001yevo0b2tvgk3t',
          title: 'Curso C++. Delegación de constructores. Vídeo 61 de pildorasinformaticas 1480 visualizaciones hace 1 mes 26 minutos',
          duration: 26.36,
          video: 'cpp-61_qzlhyr.mp4',
          description: '<h3>Curso C++. Delegación de constructores. Vídeo 61 de pildorasinformaticas 1480 visualizaciones hace 1 mes 26 minutos</h3>',
          unitId: 'cm44dgkjr001xevo0xskvi990',
          createdAt: new Date('2024-11-30 16:13:32.295'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dgkjc0016evo0y7f5qfny',
          title: 'Curso C++. Funciones IV. Parámetros por defecto. Vídeo 37 de pildorasinformaticas 4089 visualizaciones hace 1 año 25 minutos',
          duration: 25.1,
          video: 'cpp-37_ncchhy.mp4',
          description: '<h3>Curso C++. Funciones IV. Parámetros por defecto. Vídeo 37 de pildorasinformaticas 4089 visualizaciones hace 1 año 25 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dgkjr001zevo0m91vvved',
          title: 'Curso C++. Constructor-copia. Vídeo 62 de pildorasinformaticas 1128 visualizaciones hace 9 días 23 minutos',
          duration: 23.18,
          video: 'cpp-62_suieeg.mp4',
          description: '<h3>Curso C++. Constructor-copia. Vídeo 62 de pildorasinformaticas 1128 visualizaciones hace 9 días 23 minutos</h3>',
          unitId: 'cm44dgkjr001xevo0xskvi990',
          createdAt: new Date('2024-11-30 16:13:32.295'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjc000zevo055qonlng',
          title: 'Curso C++. Instrucciones break y continue. Vídeo 30 de pildorasinformaticas 4288 visualizaciones hace 1 año 24 minutos',
          duration: 24.53,
          video: 'cpp-30_i244zp.mp4',
          description: '<h3>Curso C++. Instrucciones break y continue. Vídeo 30 de pildorasinformaticas 4288 visualizaciones hace 1 año 24 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus90011evug4l3pcz8p',
          title: 'Curso Angular. Firebase. Vídeo 32 de pildorasinformaticas 16.849 visualizaciones hace 2 años 12 minutos y 17 segundos',
          duration: 12.17,
          video: 'angular-32_e7tmhf.mp4',
          description: '<h3>Curso Angular. Firebase. Vídeo 32 de pildorasinformaticas 16.849 visualizaciones hace 2 años 12 minutos y 17 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbvb0023evcssc46e3hn',
          title: 'Curso Django. Proyecto completo XXXI. Corrigiendo para pedidos. Vídeo 66 de pildorasinformaticas 13.235 visualizaciones hace 2 años 17 minutos',
          duration: 17.08,
          video: 'django-66_clvgns.mp4',
          description: '<h3>Curso Django. Proyecto completo XXXI. Corrigiendo para pedidos. Vídeo 66 de pildorasinformaticas 13.235 visualizaciones hace 2 años 17 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dtbv8001jevcsln9168sb',
          title: 'Curso Django. Proyecto web completo XXIII. Vídeo 48 de pildorasinformaticas 16.974 visualizaciones hace 3 años 12 minutos y 6 segundos',
          duration: 12.06,
          video: 'django-48_td9fqb.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXIII. Vídeo 48 de pildorasinformaticas 16.974 visualizaciones hace 3 años 12 minutos y 6 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux000bevcsltq58p1r',
          title: 'Curso Django. Plantillas IV. Condicionales, filtros y cargadores de plantillas. Vídeo 8 de pildorasinformaticas 97.516 visualizaciones hace 5 años 25 minutos',
          duration: 25.37,
          video: 'django-08_adi1rn.mp4',
          description: '<h3>Curso Django. Plantillas IV. Condicionales, filtros y cargadores de plantillas. Vídeo 8 de pildorasinformaticas 97.516 visualizaciones hace 5 años 25 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001tevo0uveuuges',
          title: 'Curso C++. POO. Constructores. Sobrecarga. Vídeo 58 de pildorasinformaticas 1776 visualizaciones hace 2 meses 26 minutos',
          duration: 26.51,
          video: 'cpp-58_pwwsyj.mp4',
          description: '<h3>Curso C++. POO. Constructores. Sobrecarga. Vídeo 58 de pildorasinformaticas 1776 visualizaciones hace 2 meses 26 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjc0013evo0alwmr6ve',
          title: 'Curso C++. Funciones I. Vídeo 34 de pildorasinformaticas 7252 visualizaciones hace 1 año 24 minutos',
          duration: 24.3,
          video: 'cpp-34_zrfzi8.mp4',
          description: '<h3>Curso C++. Funciones I. Vídeo 34 de pildorasinformaticas 7252 visualizaciones hace 1 año 24 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dpus30006evugmxcytc34',
          title: 'Curso Angular. Estructura y modificación de la App. Vídeo 3 de pildorasinformaticas 90.783 visualizaciones hace 3 años 21 minutos',
          duration: 21.02,
          video: 'angular-03_po2apm.mp4',
          description: '<h3>Curso Angular. Estructura y modificación de la App. Vídeo 3 de pildorasinformaticas 90.783 visualizaciones hace 3 años 21 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjc0015evo0wcd3i2hm',
          title: 'Curso C++. Funciones III. Paso por valor y por referencia. Vídeo 36 de pildorasinformaticas 8178 visualizaciones hace 1 año 23 minutos',
          duration: 23.21,
          video: 'cpp-36_hxl1yq.mp4',
          description: '<h3>Curso C++. Funciones III. Paso por valor y por referencia. Vídeo 36 de pildorasinformaticas 8178 visualizaciones hace 1 año 23 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux000eevcsyb25o1pl',
          title: 'Curso Django. BBDD I. Vídeo 11 de pildorasinformaticas 83.318 visualizaciones hace 5 años 14 minutos y 11 segundos',
          duration: 14.11,
          video: 'django-11_gzewgn.mp4',
          description: '<h3>Curso Django. BBDD I. Vídeo 11 de pildorasinformaticas 83.318 visualizaciones hace 5 años 14 minutos y 11 segundos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbv30015evcstfjbtxov',
          title: 'Curso Django. Proyecto web completo XI. Vídeo 36 de pildorasinformaticas 27.708 visualizaciones hace 4 años 9 minutos y 35 segundos',
          duration: 9.35,
          video: 'django-36_jyokmi.mp4',
          description: '<h3>Curso Django. Proyecto web completo XI. Vídeo 36 de pildorasinformaticas 27.708 visualizaciones hace 4 años 9 minutos y 35 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus8000vevug1qn3hauy',
          title: 'Curso Angular. Routing III. Vídeo 26 de pildorasinformaticas 19.306 visualizaciones hace 3 años 14 minutos y 22 segundos',
          duration: 14.22,
          video: 'angular-26_nsfxal.mp4',
          description: '<h3>Curso Angular. Routing III. Vídeo 26 de pildorasinformaticas 19.306 visualizaciones hace 3 años 14 minutos y 22 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001devo0v8yuzue7',
          title: 'Curso C++. Punteros I. Vídeo 42 de pildorasinformaticas 9971 visualizaciones hace 11 meses 11 minutos y 45 segundos',
          duration: 11.45,
          video: 'cpp-42_xwcyaz.mp4',
          description: '<h3>Curso C++. Punteros I. Vídeo 42 de pildorasinformaticas 9971 visualizaciones hace 11 meses 11 minutos y 45 segundos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dpus8000revuggm32au2n',
          title: 'Curso Angular. Servicios II. Vídeo 22 de pildorasinformaticas 22.664 visualizaciones hace 3 años 15 minutos',
          duration: 15.56,
          video: 'angular-22_atj523.mp4',
          description: '<h3>Curso Angular. Servicios II. Vídeo 22 de pildorasinformaticas 22.664 visualizaciones hace 3 años 15 minutos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dtbv8001levcssn4aunoy',
          title: 'Curso Django. Proyecto web completo XXV. Vídeo 50 de pildorasinformaticas 16.744 visualizaciones hace 3 años 14 minutos y 12 segundos',
          duration: 14.12,
          video: 'django-50_mgn7wr.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXV. Vídeo 50 de pildorasinformaticas 16.744 visualizaciones hace 3 años 14 minutos y 12 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.182')
        },
        {
          id: 'cm44dtbux000ievcs9ozmfowc',
          title: 'Curso Django. BBDD V. PostgreSql con Where. Vídeo 15 de pildorasinformaticas 59.825 visualizaciones hace 5 años 19 minutos',
          duration: 19.43,
          video: 'django-15_qwnknv.mp4',
          description: '<h3>Curso Django. BBDD V. PostgreSql con Where. Vídeo 15 de pildorasinformaticas 59.825 visualizaciones hace 5 años 19 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.183')
        },
        {
          id: 'cm44dtbv30018evcsn4fhggp9',
          title: 'Curso Django. Proyecto web completo XIV. Vídeo 39 de pildorasinformaticas 25.865 visualizaciones hace 4 años 14 minutos y 52 segundos',
          duration: 14.52,
          video: 'django-39_f20sby.mp4',
          description: '<h3>Curso Django. Proyecto web completo XIV. Vídeo 39 de pildorasinformaticas 25.865 visualizaciones hace 4 años 14 minutos y 52 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux000mevcsggafz580',
          title: 'Curso Django. Panel de Administración IV. Vídeo 19 de pildorasinformaticas 41.940 visualizaciones hace 4 años 15 minutos',
          duration: 15.4,
          video: 'django-19_to8iea.mp4',
          description: '<h3>Curso Django. Panel de Administración IV. Vídeo 19 de pildorasinformaticas 41.940 visualizaciones hace 4 años 15 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv30019evcstpfz6g2l',
          title: 'Curso Django. Proyecto web completo XV. Vídeo 40 de pildorasinformaticas 28.141 visualizaciones hace 4 años 19 minutos',
          duration: 19.22,
          video: 'django-40_pwppxf.mp4',
          description: '<h3>Curso Django. Proyecto web completo XV. Vídeo 40 de pildorasinformaticas 28.141 visualizaciones hace 4 años 19 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv3000qevcsaz48458h',
          title: 'Curso Django. Formularios I. Vídeo 21 de pildorasinformaticas 90.790 visualizaciones hace 4 años 14 minutos y 43 segundos',
          duration: 14.43,
          video: 'django-21_joqcbu.mp4',
          description: '<h3>Curso Django. Formularios I. Vídeo 21 de pildorasinformaticas 90.790 visualizaciones hace 4 años 14 minutos y 43 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv3000vevcsx87ilz63',
          title: 'Curso Django. Proyecto web completo I. Vídeo 26 de pildorasinformaticas 59.194 visualizaciones hace 4 años 6 minutos y 59 segundos',
          duration: 6.59,
          video: 'django-26_bjysmp.mp4',
          description: '<h3>Curso Django. Proyecto web completo I. Vídeo 26 de pildorasinformaticas 59.194 visualizaciones hace 4 años 6 minutos y 59 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjm001cevo0s4m2edxm',
          title: 'Curso C++. Funciones VIII. Funciones recursivas. Vídeo 41 de pildorasinformaticas 3477 visualizaciones hace 11 meses 24 minutos',
          duration: 24.04,
          video: 'cpp-41_g29ywr.mp4',
          description: '<h3>Curso C++. Funciones VIII. Funciones recursivas. Vídeo 41 de pildorasinformaticas 3477 visualizaciones hace 11 meses 24 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dpus30004evugqq11femj',
          title: 'Curso Angular. Introducción. Vídeo 1 de pildorasinformaticas 233.295 visualizaciones hace 3 años 11 minutos',
          duration: 11,
          video: 'angular-01_sqwuyd.mp4',
          description: '<h3>Curso Angular. Introducción. Vídeo 1 de pildorasinformaticas 233.295 visualizaciones hace 3 años 11 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkip0009evo09k6rtu3n',
          title: 'Curso C++. Tipos y variables. Vídeo 6 de pildorasinformaticas 20.587 visualizaciones hace 2 años 24 minutos',
          duration: 24.31,
          video: 'cpp-06_kspqke.mp4',
          description: '<h3>Curso C++. Tipos y variables. Vídeo 6 de pildorasinformaticas 20.587 visualizaciones hace 2 años 24 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus30005evugcvqs03gi',
          title: 'Curso Angular. Instalación software & Primera App. Vídeo 2 de pildorasinformaticas 107.378 visualizaciones hace 3 años 17 minutos',
          duration: 17.44,
          video: 'angular-02_latj9q.mp4',
          description: '<h3>Curso Angular. Instalación software & Primera App. Vídeo 2 de pildorasinformaticas 107.378 visualizaciones hace 3 años 17 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv8001qevcsxdiqazke',
          title: 'Curso Django. Proyecto web completo XX. Vídeo 55 de pildorasinformaticas 22.150 visualizaciones hace 3 años 11 minutos y 16 segundos',
          duration: 11.16,
          video: 'django-55_ndlvhm.mp4',
          description: '<h3>Curso Django. Proyecto web completo XX. Vídeo 55 de pildorasinformaticas 22.150 visualizaciones hace 3 años 11 minutos y 16 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv8001mevcs4v0uc0ff',
          title: 'Curso Django. Proyecto web completo XXVI. Vídeo 51 de pildorasinformaticas 17.079 visualizaciones hace 3 años 13 minutos y 50 segundos',
          duration: 13.5,
          video: 'django-51_lxqoyf.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXVI. Vídeo 51 de pildorasinformaticas 17.079 visualizaciones hace 3 años 13 minutos y 50 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dpus30007evugxqi7q16n',
          title: 'Curso Angular. Estructura y flujo. Vídeo 4 de pildorasinformaticas 69.707 visualizaciones hace 3 años 17 minutos',
          duration: 17.25,
          video: 'angular-04_k1dnbv.mp4',
          description: '<h3>Curso Angular. Estructura y flujo. Vídeo 4 de pildorasinformaticas 69.707 visualizaciones hace 3 años 17 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dpus30008evuglvn6nin9',
          title: 'Curso Angular. Componentes. Vídeo 5 de pildorasinformaticas 66.768 visualizaciones hace 3 años 23 minutos',
          duration: 23.1,
          video: 'angular-05_zbqyiu.mp4',
          description: '<h3>Curso Angular. Componentes. Vídeo 5 de pildorasinformaticas 66.768 visualizaciones hace 3 años 23 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv8001pevcswdnmbplu',
          title: 'Curso Django. Proyecto web completo XIX. Vídeo 54 de pildorasinformaticas 23.895 visualizaciones hace 3 años 17 minutos',
          duration: 17.34,
          video: 'django-54_siumkm.mp4',
          description: '<h3>Curso Django. Proyecto web completo XIX. Vídeo 54 de pildorasinformaticas 23.895 visualizaciones hace 3 años 17 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbv8001hevcsygq3kdg7',
          title: 'Curso Django. Proyecto web completo XXI. Vídeo 46 de pildorasinformaticas 19.072 visualizaciones hace 3 años 16 minutos',
          duration: 16.36,
          video: 'django-46_zylje4.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXI. Vídeo 46 de pildorasinformaticas 19.072 visualizaciones hace 3 años 16 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkjc000xevo0ol6k92r2',
          title: 'Curso C++. Bucle While. Vídeo 28 de pildorasinformaticas 4527 visualizaciones hace 1 año 25 minutos',
          duration: 25.04,
          video: 'cpp-28_s3nuv8.mp4',
          description: '<h3>Curso C++. Bucle While. Vídeo 28 de pildorasinformaticas 4527 visualizaciones hace 1 año 25 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux000cevcs3rk8vbys',
          title: 'Curso Django. Plantillas V. Plantillas incrustadas. Vídeo 9 de pildorasinformaticas 80.115 visualizaciones hace 5 años 15 minutos',
          duration: 15.47,
          video: 'django-09_k0imty.mp4',
          description: '<h3>Curso Django. Plantillas V. Plantillas incrustadas. Vídeo 9 de pildorasinformaticas 80.115 visualizaciones hace 5 años 15 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dpus3000eevugvt6pcwu9',
          title: 'Curso Angular. Two way binding (binding bidireccional). Vídeo 11 de pildorasinformaticas 34.031 visualizaciones hace 3 años 22 minutos',
          duration: 22.11,
          video: 'angular-11_rui46y.mp4',
          description: '<h3>Curso Angular. Two way binding (binding bidireccional). Vídeo 11 de pildorasinformaticas 34.031 visualizaciones hace 3 años 22 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dgkiq000eevo0bnv19225',
          title: 'Curso C++. Arrays I. Qué son y sintaxis básica. Vídeo 11 de pildorasinformaticas 14.307 visualizaciones hace 2 años 15 minutos',
          duration: 15.51,
          video: 'cpp-11_u248ft.mp4',
          description: '<h3>Curso C++. Arrays I. Qué son y sintaxis básica. Vídeo 11 de pildorasinformaticas 14.307 visualizaciones hace 2 años 15 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbvb0021evcst1fzdzq3',
          title: 'Curso Django: Proyecto completo XXIX. Creando login. Vídeo 64 de pildorasinformaticas 14.867 visualizaciones hace 2 años 15 minutos',
          duration: 15.37,
          video: 'django-64_sgqwfj.mp4',
          description: '<h3>Curso Django: Proyecto completo XXIX. Creando login. Vídeo 64 de pildorasinformaticas 14.867 visualizaciones hace 2 años 15 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbv30011evcsigpajm2v',
          title: 'Curso Django. Proyecto web completo VII. Vídeo 32 de pildorasinformaticas 46.972 visualizaciones hace 4 años 18 minutos',
          duration: 18.37,
          video: 'django-32_j3zuaj.mp4',
          description: '<h3>Curso Django. Proyecto web completo VII. Vídeo 32 de pildorasinformaticas 46.972 visualizaciones hace 4 años 18 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjm001pevo0kiiozpch',
          title: 'Curso C++. POO. Clases y Objetos. Vídeo 54 de pildorasinformaticas 3141 visualizaciones hace 4 meses 25 minutos',
          duration: 25.03,
          video: 'cpp-54_hj8ccq.mp4',
          description: '<h3>Curso C++. POO. Clases y Objetos. Vídeo 54 de pildorasinformaticas 3141 visualizaciones hace 4 meses 25 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dpusc001hevug8603oc5x',
          title: 'Curso Angular. Despliegue. Fin de curso. Vídeo 46 de pildorasinformaticas 12.835 visualizaciones hace 1 año 13 minutos y 47 segundos',
          duration: 13.47,
          video: 'angular-46_yxup6f.mp4',
          description: '<h3>Curso Angular. Despliegue. Fin de curso. Vídeo 46 de pildorasinformaticas 12.835 visualizaciones hace 1 año 13 minutos y 47 segundos</h3>',
          unitId: 'cm44dpusc001bevugni7fizhr',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dpus30009evugjeblp3tn',
          title: 'Curso Angular. Componentes II. Vídeo 6 de pildorasinformaticas 48.649 visualizaciones hace 3 años 20 minutos',
          duration: 20.11,
          video: 'angular-06_oj5350.mp4',
          description: '<h3>Curso Angular. Componentes II. Vídeo 6 de pildorasinformaticas 48.649 visualizaciones hace 3 años 20 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbux000nevcspei1vmcz',
          title: 'Curso Django. Panel de Administración V. Vídeo 20 de pildorasinformaticas 38.809 visualizaciones hace 4 años 15 minutos',
          duration: 15.49,
          video: 'django-20_w4qife.mp4',
          description: '<h3>Curso Django. Panel de Administración V. Vídeo 20 de pildorasinformaticas 38.809 visualizaciones hace 4 años 15 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbux0004evcsvlvqcmew',
          title: 'Curso Django. Introducción e Instalación.Vídeo 1 de pildorasinformaticas 637.105 visualizaciones hace 5 años 11 minutos y 55 segundos',
          duration: 11.55,
          video: 'django-01_sxcphq.mp4',
          description: '<h3>Curso Django. Introducción e Instalación.Vídeo 1 de pildorasinformaticas 637.105 visualizaciones hace 5 años 11 minutos y 55 segundos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dtbvb0022evcswfeu1ti4',
          title: 'Curso Django: Proyecto completo XXX. Mensajes de error. Vídeo 65 de pildorasinformaticas 26.127 visualizaciones hace 2 años 15 minutos',
          duration: 15.11,
          video: 'django-65_ahppzj.mp4',
          description: '<h3>Curso Django: Proyecto completo XXX. Mensajes de error. Vídeo 65 de pildorasinformaticas 26.127 visualizaciones hace 2 años 15 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbv3000yevcsinjgto4n',
          title: 'Curso Django. Proyecto web completo IV. Vídeo 29 de pildorasinformaticas 53.834 visualizaciones hace 4 años 15 minutos',
          duration: 15.26,
          video: 'django-29_mwmayq.mp4',
          description: '<h3>Curso Django. Proyecto web completo IV. Vídeo 29 de pildorasinformaticas 53.834 visualizaciones hace 4 años 15 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbv3000revcsj1olrs3w',
          title: 'Curso Django. Formularios II. Vídeo 22 de pildorasinformaticas 63.716 visualizaciones hace 4 años 23 minutos',
          duration: 23.1,
          video: 'django-22_r6lexj.mp4',
          description: '<h3>Curso Django. Formularios II. Vídeo 22 de pildorasinformaticas 63.716 visualizaciones hace 4 años 23 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc0012evo0xl3ecab0',
          title: 'Curso C++. Bucles anidados II. Juego de azar. Vídeo 33 de pildorasinformaticas 3079 visualizaciones hace 1 año 22 minutos',
          duration: 22.14,
          video: 'cpp-33_nl1kod.mp4',
          description: '<h3>Curso C++. Bucles anidados II. Juego de azar. Vídeo 33 de pildorasinformaticas 3079 visualizaciones hace 1 año 22 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.18')
        },
        {
          id: 'cm44dtbv8001cevcs66juofn5',
          title: 'Curso Django. Proyecto web completo XVI. Vídeo 41 de pildorasinformaticas 25.903 visualizaciones hace 4 años 17 minutos',
          duration: 17.37,
          video: 'django-41_eqpacn.mp4',
          description: '<h3>Curso Django. Proyecto web completo XVI. Vídeo 41 de pildorasinformaticas 25.903 visualizaciones hace 4 años 17 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.182')
        },
        {
          id: 'cm44dgkjc0010evo0rg6l9289',
          title: 'Curso C++. Bucles infinitos. Vídeo 31 de pildorasinformaticas 3915 visualizaciones hace 1 año 24 minutos',
          duration: 24.19,
          video: 'cpp-31_ewxyfu.mp4',
          description: '<h3>Curso C++. Bucles infinitos. Vídeo 31 de pildorasinformaticas 3915 visualizaciones hace 1 año 24 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.183')
        },
        {
          id: 'cm44dtbv8001vevcs0geil8mw',
          title: 'Curso Django. Proyecto web completo XXV. Vídeo 60 de pildorasinformaticas 16.179 visualizaciones hace 2 años 11 minutos y 24 segundos',
          duration: 11.24,
          video: 'django-60_s2zl5s.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXV. Vídeo 60 de pildorasinformaticas 16.179 visualizaciones hace 2 años 11 minutos y 24 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.183')
        },
        {
          id: 'cm44dgkiq000cevo0mvdyn8ma',
          title: 'Curso C++. Declaración de constantes. Vídeo 9 de pildorasinformaticas 13.264 visualizaciones hace 2 años 12 minutos y 30 segundos',
          duration: 12.3,
          video: 'cpp-09_wr4da1.mp4',
          description: '<h3>Curso C++. Declaración de constantes. Vídeo 9 de pildorasinformaticas 13.264 visualizaciones hace 2 años 12 minutos y 30 segundos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbv8001eevcsrru08gj5',
          title: 'Curso Django. Proyecto web completo XVIII. Vídeo 43 de pildorasinformaticas 25.526 visualizaciones hace 4 años 18 minutos',
          duration: 18.31,
          video: 'django-43_mzgakn.mp4',
          description: '<h3>Curso Django. Proyecto web completo XVIII. Vídeo 43 de pildorasinformaticas 25.526 visualizaciones hace 4 años 18 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.183')
        },
        {
          id: 'cm44dgkiq000fevo055888dav',
          title: 'Curso C++. Declaración e inicialización de arrays en código. Vídeo 12 de pildorasinformaticas 11.958 visualizaciones hace 2 años 17 minutos',
          duration: 17.4,
          video: 'cpp-12_zmjtq9.mp4',
          description: '<h3>Curso C++. Declaración e inicialización de arrays en código. Vídeo 12 de pildorasinformaticas 11.958 visualizaciones hace 2 años 17 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc000wevo0tbh9qreu',
          title: 'Curso C++. Bucle For-Each. Vídeo 27 de pildorasinformaticas 5204 visualizaciones hace 1 año 22 minutos',
          duration: 22.14,
          video: 'cpp-27_hytupo.mp4',
          description: '<h3>Curso C++. Bucle For-Each. Vídeo 27 de pildorasinformaticas 5204 visualizaciones hace 1 año 22 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbvb0020evcsgxexjkri',
          title: 'Curso Django. Proyecto web completo XXVIII. Sesión de usuarios. Vídeo 63 de pildorasinformaticas 11.824 visualizaciones hace 2 años 19 minutos',
          duration: 19.45,
          video: 'django-63_kwohq9.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXVIII. Sesión de usuarios. Vídeo 63 de pildorasinformaticas 11.824 visualizaciones hace 2 años 19 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dtbvb001yevcsj8wf1czc',
          title: 'Curso Django. Proyecto web completo XXVI. Vídeo 61 de pildorasinformaticas 14.678 visualizaciones hace 2 años 16 minutos',
          duration: 16.3,
          video: 'django-61_qfhaqh.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXVI. Vídeo 61 de pildorasinformaticas 14.678 visualizaciones hace 2 años 16 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.181')
        },
        {
          id: 'cm44dtbvb001zevcs9p6s6ttk',
          title: 'Curso Django. Proyecto web completo XXVII. Registro de usuarios. Vídeo 62 de pildorasinformaticas 15.368 visualizaciones hace 2 años 23 minutos',
          duration: 23.45,
          video: 'django-62_vhvgmw.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXVII. Registro de usuarios. Vídeo 62 de pildorasinformaticas 15.368 visualizaciones hace 2 años 23 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.184')
        },
        {
          id: 'cm44dgkjc000uevo0k4ncdus4',
          title: 'Curso C++. Bucles. Vídeo 25 de pildorasinformaticas 3071 visualizaciones hace 1 año 12 minutos y 32 segundos',
          duration: 12.32,
          video: 'cpp-25_cjj1qj.mp4',
          description: '<h3>Curso C++. Bucles. Vídeo 25 de pildorasinformaticas 3071 visualizaciones hace 1 año 12 minutos y 32 segundos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbux0008evcssz6bgcuj',
          title: 'Curso Django. Plantillas I. Vídeo 5 de pildorasinformaticas 161.762 visualizaciones hace 5 años 17 minutos',
          duration: 17.26,
          video: 'django-05_xjnaaj.mp4',
          description: '<h3>Curso Django. Plantillas I. Vídeo 5 de pildorasinformaticas 161.762 visualizaciones hace 5 años 17 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dgkjc000tevo0fjenkxlt',
          title: 'Curso C++. Operador ternario. Vídeo 24 de pildorasinformaticas 5132 visualizaciones hace 1 año 12 minutos y 49 segundos',
          duration: 12.49,
          video: 'cpp-24_jrpsep.mp4',
          description: '<h3>Curso C++. Operador ternario. Vídeo 24 de pildorasinformaticas 5132 visualizaciones hace 1 año 12 minutos y 49 segundos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.177')
        },
        {
          id: 'cm44dgkiq000gevo04hmehrs2',
          title: 'Curso C++. Arrays bidimensionales. Vídeo 13 de pildorasinformaticas 13.521 visualizaciones hace 1 año 21 minutos',
          duration: 21.39,
          video: 'cpp-13_xmbuux.mp4',
          description: '<h3>Curso C++. Arrays bidimensionales. Vídeo 13 de pildorasinformaticas 13.521 visualizaciones hace 1 año 21 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkiq000ievo0rh3p8pm5',
          title: 'Curso C++. Vectores I. Vídeo 15 de pildorasinformaticas 14.552 visualizaciones hace 1 año 19 minutos',
          duration: 19.2,
          video: 'cpp-15_jak76a.mp4',
          description: '<h3>Curso C++. Vectores I. Vídeo 15 de pildorasinformaticas 14.552 visualizaciones hace 1 año 19 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkiq000jevo0q15i9xa1',
          title: 'Curso C++. Vectores II. Vídeo 16 de pildorasinformaticas 9358 visualizaciones hace 1 año 31 minutos',
          duration: 31.47,
          video: 'cpp-16_mxme9t.mp4',
          description: '<h3>Curso C++. Vectores II. Vídeo 16 de pildorasinformaticas 9358 visualizaciones hace 1 año 31 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkiq000levo0a7g48afa',
          title: 'Curso C++. Operadores II. Vídeo 18 de pildorasinformaticas 5966 visualizaciones hace 1 año 16 minutos',
          duration: 16.33,
          video: 'cpp-18_amgqdw.mp4',
          description: '<h3>Curso C++. Operadores II. Vídeo 18 de pildorasinformaticas 5966 visualizaciones hace 1 año 16 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc000vevo0tkpzkswi',
          title: 'Curso C++. Bucle For. Vídeo 26 de pildorasinformaticas 4142 visualizaciones hace 1 año 24 minutos',
          duration: 24.13,
          video: 'cpp-26_o2qchm.mp4',
          description: '<h3>Curso C++. Bucle For. Vídeo 26 de pildorasinformaticas 4142 visualizaciones hace 1 año 24 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkiq000nevo0ruqb2zjo',
          title: 'Curso C++. Operadores y condicional IF II. Vídeo 20 de pildorasinformaticas 4137 visualizaciones hace 1 año 22 minutos',
          duration: 22.27,
          video: 'cpp-20_gqo7p6.mp4',
          description: '<h3>Curso C++. Operadores y condicional IF II. Vídeo 20 de pildorasinformaticas 4137 visualizaciones hace 1 año 22 minutos</h3>',
          unitId: 'cm44dgkip0003evo0vf5ht9qd',
          createdAt: new Date('2024-11-30 16:13:32.258'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc000qevo0kx3vqpie',
          title: 'Curso C++. Operadores y condicional IF III. Vídeo 21 de pildorasinformaticas 4517 visualizaciones hace 1 año 13 minutos y 28 segundos',
          duration: 13.28,
          video: 'cpp-21_hqszik.mp4',
          description: '<h3>Curso C++. Operadores y condicional IF III. Vídeo 21 de pildorasinformaticas 4517 visualizaciones hace 1 año 13 minutos y 28 segundos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjm001nevo09e8v9377',
          title: 'Curso C++. L-Values y R-Values. . Vídeo 52 de pildorasinformaticas 2527 visualizaciones hace 6 meses 23 minutos',
          duration: 23.15,
          video: 'cpp-52_spf9za.mp4',
          description: '<h3>Curso C++. L-Values y R-Values. . Vídeo 52 de pildorasinformaticas 2527 visualizaciones hace 6 meses 23 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjm001qevo0md0yrph4',
          title: 'Curso C++. POO. Acceso a propiedades y métodos. Vídeo 55 de pildorasinformaticas 2271 visualizaciones hace 3 meses 33 minutos',
          duration: 33.19,
          video: 'cpp-55_tjgyya.mp4',
          description: '<h3>Curso C++. POO. Acceso a propiedades y métodos. Vídeo 55 de pildorasinformaticas 2271 visualizaciones hace 3 meses 33 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjm001mevo0vcuqherv',
          title: 'Curso C++. Referencias II. Ejemplos sencillos. Vídeo 51 de pildorasinformaticas 2259 visualizaciones hace 6 meses 16 minutos',
          duration: 16.44,
          video: 'cpp-51_ftitsk.mp4',
          description: '<h3>Curso C++. Referencias II. Ejemplos sencillos. Vídeo 51 de pildorasinformaticas 2259 visualizaciones hace 6 meses 16 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjm001kevo05xw46hi3',
          title: 'Curso C++. Punteros VII. Problemas con punteros. Vídeo 49 de pildorasinformaticas 2668 visualizaciones hace 7 meses 19 minutos',
          duration: 19.47,
          video: 'cpp-49_cxwazy.mp4',
          description: '<h3>Curso C++. Punteros VII. Problemas con punteros. Vídeo 49 de pildorasinformaticas 2668 visualizaciones hace 7 meses 19 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc0018evo0alhr5i70',
          title: 'Curso C++. Funciones VI. Funciones inline. Vídeo 39 de pildorasinformaticas 3776 visualizaciones hace 1 año 17 minutos',
          duration: 17.34,
          video: 'cpp-39_b3fkme.mp4',
          description: '<h3>Curso C++. Funciones VI. Funciones inline. Vídeo 39 de pildorasinformaticas 3776 visualizaciones hace 1 año 17 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbv8001devcsi86vas01',
          title: 'Curso Django. Proyecto web completo XVII. Vídeo 42 de pildorasinformaticas 23.233 visualizaciones hace 4 años 16 minutos',
          duration: 16.57,
          video: 'django-42_ppis1b.mp4',
          description: '<h3>Curso Django. Proyecto web completo XVII. Vídeo 42 de pildorasinformaticas 23.233 visualizaciones hace 4 años 16 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.176')
        },
        {
          id: 'cm44dtbv30016evcsotc8d6e4',
          title: 'Curso Django. Proyecto web completo XII. Vídeo 37 de pildorasinformaticas 26.497 visualizaciones hace 4 años 11 minutos y 45 segundos',
          duration: 11.45,
          video: 'django-37_vo8rcd.mp4',
          description: '<h3>Curso Django. Proyecto web completo XII. Vídeo 37 de pildorasinformaticas 26.497 visualizaciones hace 4 años 11 minutos y 45 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbux000devcsrh76gplp',
          title: 'Curso Django. Plantillas VI. Herencia de plantillas. Vídeo 10 de pildorasinformaticas 83.256 visualizaciones hace 5 años 23 minutos',
          duration: 23.15,
          video: 'django-10_r2okyv.mp4',
          description: '<h3>Curso Django. Plantillas VI. Herencia de plantillas. Vídeo 10 de pildorasinformaticas 83.256 visualizaciones hace 5 años 23 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dgkjc000yevo0q4nb0p36',
          title: 'Curso C++. Bucle do-while. Vídeo 29 de pildorasinformaticas 3975 visualizaciones hace 1 año 17 minutos',
          duration: 17.18,
          video: 'cpp-29_lv4kpy.mp4',
          description: '<h3>Curso C++. Bucle do-while. Vídeo 29 de pildorasinformaticas 3975 visualizaciones hace 1 año 17 minutos</h3>',
          unitId: 'cm44dgkjc000pevo0raen3zme',
          createdAt: new Date('2024-11-30 16:13:32.28'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000bevug9xv3ltiy',
          title: 'Curso Angular. Interpolación II. Vídeo 8 de pildorasinformaticas 38.349 visualizaciones hace 3 años 16 minutos',
          duration: 16.54,
          video: 'angular-08_izqxwi.mp4',
          description: '<h3>Curso Angular. Interpolación II. Vídeo 8 de pildorasinformaticas 38.349 visualizaciones hace 3 años 16 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbvb0026evcsjmwiymu3',
          title: 'Curso Django. Proyecto completo XXXIV. Creando app Pedidos III. Vídeo 69 de pildorasinformaticas 13.492 visualizaciones hace 2 años 18 minutos',
          duration: 18.05,
          video: 'django-69_cnrsec.mp4',
          description: '<h3>Curso Django. Proyecto completo XXXIV. Creando app Pedidos III. Vídeo 69 de pildorasinformaticas 13.492 visualizaciones hace 2 años 18 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dgkjm001vevo0eww0ihgl',
          title: 'Curso C++. Constructor Initialization List. Vídeo 60 de pildorasinformaticas 1471 visualizaciones hace 1 mes 19 minutos',
          duration: 19.43,
          video: 'cpp-60_naucbn.mp4',
          description: '<h3>Curso C++. Constructor Initialization List. Vídeo 60 de pildorasinformaticas 1471 visualizaciones hace 1 mes 19 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dgkjm001oevo0vwwmcfg5',
          title: 'Curso C++. POO (Programación Orientada a Objetos) Vídeo 53 de pildorasinformaticas 3417 visualizaciones hace 5 meses 29 minutos',
          duration: 29.48,
          video: 'cpp-53_og8fwn.mp4',
          description: '<h3>Curso C++. POO (Programación Orientada a Objetos) Vídeo 53 de pildorasinformaticas 3417 visualizaciones hace 5 meses 29 minutos</h3>',
          unitId: 'cm44dgkjm001bevo0riwu6jzy',
          createdAt: new Date('2024-11-30 16:13:32.29'),
          updatedAt: new Date('2024-12-04 15:23:45.178')
        },
        {
          id: 'cm44dtbvb0027evcso6q9tqw5',
          title: 'Curso Django. Proyecto completo. FIN. Vídeo 70 de pildorasinformaticas 28.411 visualizaciones hace 2 años 25 minutos',
          duration: 25.18,
          video: 'django-70_fogmkb.mp4',
          description: '<h3>Curso Django. Proyecto completo. FIN. Vídeo 70 de pildorasinformaticas 28.411 visualizaciones hace 2 años 25 minutos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbvb0025evcskvoz8iln',
          title: 'Curso Django. Proyecto completo XXXIII. Creando app Pedidos II. Vídeo 68 de pildorasinformaticas 12.219 visualizaciones hace 2 años 14 minutos y 56 segundos',
          duration: 14.56,
          video: 'django-68_rkpwxq.mp4',
          description: '<h3>Curso Django. Proyecto completo XXXIII. Creando app Pedidos II. Vídeo 68 de pildorasinformaticas 12.219 visualizaciones hace 2 años 14 minutos y 56 segundos</h3>',
          unitId: 'cm44dtbvb001xevcsx80zh22s',
          createdAt: new Date('2024-11-30 16:23:27.576'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000cevugwcpnda1x',
          title: 'Curso Angular. Property Binding. Vídeo 9 de pildorasinformaticas 40.699 visualizaciones hace 3 años 19 minutos',
          duration: 19.24,
          video: 'angular-09_dqi1xw.mp4',
          description: '<h3>Curso Angular. Property Binding. Vídeo 9 de pildorasinformaticas 40.699 visualizaciones hace 3 años 19 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000hevugl7ewkzna',
          title: 'Curso Angular. Directivas I. Vídeo 14 de pildorasinformaticas 38.106 visualizaciones hace 3 años 23 minutos',
          duration: 23.04,
          video: 'angular-14_sbfwi3.mp4',
          description: '<h3>Curso Angular. Directivas I. Vídeo 14 de pildorasinformaticas 38.106 visualizaciones hace 3 años 23 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000gevug5ud23dy9',
          title: 'Curso Angular. Práctica guiada II. Vídeo 13 de pildorasinformaticas 25.853 visualizaciones hace 3 años 15 minutos',
          duration: 15.38,
          video: 'angular-13_xctesh.mp4',
          description: '<h3>Curso Angular. Práctica guiada II. Vídeo 13 de pildorasinformaticas 25.853 visualizaciones hace 3 años 15 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000fevugm155ddum',
          title: 'Curso Angular. Práctica guiada I. Vídeo 12 de pildorasinformaticas 32.846 visualizaciones hace 3 años 19 minutos',
          duration: 19.22,
          video: 'angular-12_juyct0.mp4',
          description: '<h3>Curso Angular. Práctica guiada I. Vídeo 12 de pildorasinformaticas 32.846 visualizaciones hace 3 años 19 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000devugevvvo9ud',
          title: 'Curso Angular. Event Binding. Vídeo 10 de pildorasinformaticas 41.075 visualizaciones hace 3 años 28 minutos',
          duration: 28.44,
          video: 'angular-10_jpsmh1.mp4',
          description: '<h3>Curso Angular. Event Binding. Vídeo 10 de pildorasinformaticas 41.075 visualizaciones hace 3 años 28 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000levuglpvyj2hc',
          title: 'Curso Angular. Directivas V. Vídeo 18 de pildorasinformaticas 24.429 visualizaciones hace 3 años 16 minutos',
          duration: 16.03,
          video: 'angular-18_x1zv6i.mp4',
          description: '<h3>Curso Angular. Directivas V. Vídeo 18 de pildorasinformaticas 24.429 visualizaciones hace 3 años 16 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus3000mevug6rlk68te',
          title: 'Curso Angular. Comunicación entre componentes I. Vídeo 19 de pildorasinformaticas 36.063 visualizaciones hace 3 años 25 minutos',
          duration: 25.11,
          video: 'angular-19_mbnzgg.mp4',
          description: '<h3>Curso Angular. Comunicación entre componentes I. Vídeo 19 de pildorasinformaticas 36.063 visualizaciones hace 3 años 25 minutos</h3>',
          unitId: 'cm44dpus30003evugcwn3zx9l',
          createdAt: new Date('2024-11-30 16:20:45.459'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus90019evug7awsce1y',
          title: 'Curso Angular. Login III. Vídeo 40 de pildorasinformaticas 9912 visualizaciones hace 2 años 9 minutos y 54 segundos',
          duration: 9.54,
          video: 'angular-40_pv3fnk.mp4',
          description: '<h3>Curso Angular. Login III. Vídeo 40 de pildorasinformaticas 9912 visualizaciones hace 2 años 9 minutos y 54 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpusc001fevugaqv8hqid',
          title: 'Curso Angular. Login VII. Creación de cookie para guardar login. Vídeo 44 de pildorasinformaticas 10.816 visualizaciones hace 2 años 12 minutos y 16 segundos',
          duration: 12.16,
          video: 'angular-44_r8hcai.mp4',
          description: '<h3>Curso Angular. Login VII. Creación de cookie para guardar login. Vídeo 44 de pildorasinformaticas 10.816 visualizaciones hace 2 años 12 minutos y 16 segundos</h3>',
          unitId: 'cm44dpusc001bevugni7fizhr',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus90018evug683ecfvf',
          title: 'Curso Angular. Login II. Vídeo 39 de pildorasinformaticas 15.559 visualizaciones hace 2 años 12 minutos y 16 segundos',
          duration: 12.16,
          video: 'angular-39_oyohsv.mp4',
          description: '<h3>Curso Angular. Login II. Vídeo 39 de pildorasinformaticas 15.559 visualizaciones hace 2 años 12 minutos y 16 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpusc001eevugi7uz0lks',
          title: 'Curso Angular. Login VI. Links login y logout. Vídeo 43 de pildorasinformaticas 8135 visualizaciones hace 2 años 23 minutos',
          duration: 23.38,
          video: 'angular-43_glnnlc.mp4',
          description: '<h3>Curso Angular. Login VI. Links login y logout. Vídeo 43 de pildorasinformaticas 8135 visualizaciones hace 2 años 23 minutos</h3>',
          unitId: 'cm44dpusc001bevugni7fizhr',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpus90017evug92f355io',
          title: 'Curso Angular. Login I. Vídeo 38 de pildorasinformaticas 27.342 visualizaciones hace 2 años 9 minutos y 16 segundos',
          duration: 9.16,
          video: 'angular-38_vlixgk.mp4',
          description: '<h3>Curso Angular. Login I. Vídeo 38 de pildorasinformaticas 27.342 visualizaciones hace 2 años 9 minutos y 16 segundos</h3>',
          unitId: 'cm44dpus8000pevugm2pzm3jx',
          createdAt: new Date('2024-11-30 16:20:45.465'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dpusc001devugfhdacmrg',
          title: 'Curso Angular. Login V. Vídeo 42 de pildorasinformaticas 8862 visualizaciones hace 2 años 8 minutos y 54 segundos',
          duration: 8.54,
          video: 'angular-42_ugomgp.mp4',
          description: '<h3>Curso Angular. Login V. Vídeo 42 de pildorasinformaticas 8862 visualizaciones hace 2 años 8 minutos y 54 segundos</h3>',
          unitId: 'cm44dpusc001bevugni7fizhr',
          createdAt: new Date('2024-11-30 16:20:45.468'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv3000tevcs80hyrqy7',
          title: 'Curso Django. Envío de mails. Vídeo 24 de pildorasinformaticas 51.727 visualizaciones hace 4 años 17 minutos',
          duration: 17.4,
          video: 'django-24_hicjmu.mp4',
          description: '<h3>Curso Django. Envío de mails. Vídeo 24 de pildorasinformaticas 51.727 visualizaciones hace 4 años 17 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv3000sevcsltfb7w05',
          title: 'Curso Django. Formularios III. Vídeo 23 de pildorasinformaticas 50.599 visualizaciones hace 4 años 15 minutos',
          duration: 15.22,
          video: 'django-23_qtgg4v.mp4',
          description: '<h3>Curso Django. Formularios III. Vídeo 23 de pildorasinformaticas 50.599 visualizaciones hace 4 años 15 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv3000uevcsg8ulrpf4',
          title: 'Curso Django. API Forms Vídeo 25 de pildorasinformaticas 55.975 visualizaciones hace 4 años 32 minutos',
          duration: 32.02,
          video: 'django-25_wp2sqg.mp4',
          description: '<h3>Curso Django. API Forms Vídeo 25 de pildorasinformaticas 55.975 visualizaciones hace 4 años 32 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbux000kevcsiwvbw40o',
          title: 'Curso Django. Panel de Administración II. Vídeo 17 de pildorasinformaticas 51.887 visualizaciones hace 4 años 11 minutos y 54 segundos',
          duration: 11.54,
          video: 'django-17_gopida.mp4',
          description: '<h3>Curso Django. Panel de Administración II. Vídeo 17 de pildorasinformaticas 51.887 visualizaciones hace 4 años 11 minutos y 54 segundos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbux000jevcsocjenxye',
          title: 'Curso Django. Panel de Administración I. Vídeo 16 de pildorasinformaticas 73.530 visualizaciones hace 5 años 15 minutos',
          duration: 15.46,
          video: 'django-16_hwbvrz.mp4',
          description: '<h3>Curso Django. Panel de Administración I. Vídeo 16 de pildorasinformaticas 73.530 visualizaciones hace 5 años 15 minutos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv3000wevcslls3rdei',
          title: 'Curso Django. Proyecto web completo II. Vídeo 27 de pildorasinformaticas 61.056 visualizaciones hace 4 años 12 minutos y 29 segundos',
          duration: 12.29,
          video: 'django-27_yrr2v0.mp4',
          description: '<h3>Curso Django. Proyecto web completo II. Vídeo 27 de pildorasinformaticas 61.056 visualizaciones hace 4 años 12 minutos y 29 segundos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv3000zevcsj6ue8c2g',
          title: 'Curso Django. Proyecto web completo V. Vídeo 30 de pildorasinformaticas 56.701 visualizaciones hace 4 años 19 minutos',
          duration: 19.37,
          video: 'django-30_vo2dgr.mp4',
          description: '<h3>Curso Django. Proyecto web completo V. Vídeo 30 de pildorasinformaticas 56.701 visualizaciones hace 4 años 19 minutos</h3>',
          unitId: 'cm44dtbv3000pevcscjrehwdu',
          createdAt: new Date('2024-11-30 16:23:27.568'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbux000levcsj4uuahea',
          title: 'Curso Django. Panel de Administración III. Vídeo 18 de pildorasinformaticas 44.853 visualizaciones hace 4 años 13 minutos y 16 segundos',
          duration: 13.16,
          video: 'django-18_ehjcrc.mp4',
          description: '<h3>Curso Django. Panel de Administración III. Vídeo 18 de pildorasinformaticas 44.853 visualizaciones hace 4 años 13 minutos y 16 segundos</h3>',
          unitId: 'cm44dtbux0003evcsfhwhdfbp',
          createdAt: new Date('2024-11-30 16:23:27.561'),
          updatedAt: new Date('2024-12-04 15:23:45.18')
        },
        {
          id: 'cm44dtbv8001nevcsc6v9mn4p',
          title: 'Curso Django. Proyecto web completo XXVII. Vídeo 52 de pildorasinformaticas 18.844 visualizaciones hace 3 años 16 minutos',
          duration: 16.33,
          video: 'django-52_krhtih.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXVII. Vídeo 52 de pildorasinformaticas 18.844 visualizaciones hace 3 años 16 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv8001fevcs99k819f4',
          title: 'Curso Django. Proyecto web completo XIX. Vídeo 44 de pildorasinformaticas 20.739 visualizaciones hace 3 años 22 minutos',
          duration: 22.19,
          video: 'django-44_cftxip.mp4',
          description: '<h3>Curso Django. Proyecto web completo XIX. Vídeo 44 de pildorasinformaticas 20.739 visualizaciones hace 3 años 22 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv8001sevcsuwv7iu6p',
          title: 'Curso Django. Proyecto web completo XXII. Vídeo 57 de pildorasinformaticas 19.339 visualizaciones hace 3 años 10 minutos y 54 segundos',
          duration: 10.54,
          video: 'django-57_wucvdo.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXII. Vídeo 57 de pildorasinformaticas 19.339 visualizaciones hace 3 años 10 minutos y 54 segundos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv8001gevcs35c0sqiv',
          title: 'Curso Django. Proyecto web completo XX. Vídeo 45 de pildorasinformaticas 21.782 visualizaciones hace 3 años 20 minutos',
          duration: 20.02,
          video: 'django-45_x4ps3u.mp4',
          description: '<h3>Curso Django. Proyecto web completo XX. Vídeo 45 de pildorasinformaticas 21.782 visualizaciones hace 3 años 20 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv8001revcs1oet9kjp',
          title: 'Curso Django. Proyecto web completo XXI. Vídeo 56 de pildorasinformaticas 19.003 visualizaciones hace 3 años 20 minutos',
          duration: 20.5,
          video: 'django-56_cch80h.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXI. Vídeo 56 de pildorasinformaticas 19.003 visualizaciones hace 3 años 20 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        },
        {
          id: 'cm44dtbv8001oevcszc28gknw',
          title: 'Curso Django. Proyecto web completo XXVIII. Vídeo 53 de pildorasinformaticas 19.631 visualizaciones hace 3 años 15 minutos',
          duration: 15.19,
          video: 'django-53_qe5vhz.mp4',
          description: '<h3>Curso Django. Proyecto web completo XXVIII. Vídeo 53 de pildorasinformaticas 19.631 visualizaciones hace 3 años 15 minutos</h3>',
          unitId: 'cm44dtbv8001bevcsrzplq638',
          createdAt: new Date('2024-11-30 16:23:27.572'),
          updatedAt: new Date('2024-12-04 15:23:45.179')
        }
      ]
    });

    await prisma.lessonCompletion.createMany({
      data: [
        {
          id: 'cm4g0rdoi0001pciwjer4x5b3',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkip0006evo0qlhsee1v',
          completedAt: new Date('2024-12-08 19:51:15.715')
        },
        {
          id: 'cm4g0wf2y0009pciwlrow44x7',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkip0005evo0gvdh7ccw',
          completedAt: new Date('2024-12-08 19:55:10.81')
        },
        {
          id: 'cm4g0wiix000bpciw63c328z7',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000bevo0di6v1yvc',
          completedAt: new Date('2024-12-08 19:55:15.273')
        },
        {
          id: 'cm4g0wkh0000dpciw30qyhlyh',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000kevo0oeyzrgm3',
          completedAt: new Date('2024-12-08 19:55:17.796')
        },
        {
          id: 'cm4g0wmf5000fpciwvptguiyk',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkip0004evo0lg0ix9je',
          completedAt: new Date('2024-12-08 19:55:20.322')
        },
        {
          id: 'cm4g0wohg000hpciwz5xdjrw1',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000hevo00j7yp0r1',
          completedAt: new Date('2024-12-08 19:55:22.996')
        },
        {
          id: 'cm4g0wqfu000jpciwxc1zpvrl',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000aevo0si9ncjgt',
          completedAt: new Date('2024-12-08 19:55:25.53')
        },
        {
          id: 'cm4g0wse1000lpciw807wmh2x',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkip0008evo0asynlfoi',
          completedAt: new Date('2024-12-08 19:55:28.057')
        },
        {
          id: 'cm4g0wulj000npciwnn71r3qc',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkip0007evo0rnabpcsi',
          completedAt: new Date('2024-12-08 19:55:30.919')
        },
        {
          id: 'cm4g0wwu0000ppciwprsex6hc',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000devo022gpvh5s',
          completedAt: new Date('2024-12-08 19:55:33.816')
        },
        {
          id: 'cm4g0wzra000rpciwkrhthuf1',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000mevo0bysffse7',
          completedAt: new Date('2024-12-08 19:55:37.607')
        },
        {
          id: 'cm4g0x1zh000tpciw1davod6b',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkip0009evo09k6rtu3n',
          completedAt: new Date('2024-12-08 19:55:40.493')
        },
        {
          id: 'cm4g0x45d000vpciww59qwk4h',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000eevo0bnv19225',
          completedAt: new Date('2024-12-08 19:55:43.298')
        },
        {
          id: 'cm4g0x61p000xpciwllzegbtz',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000cevo0mvdyn8ma',
          completedAt: new Date('2024-12-08 19:55:45.758')
        },
        {
          id: 'cm4g0x92r000zpciw8k2nlo6a',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000fevo055888dav',
          completedAt: new Date('2024-12-08 19:55:49.684')
        },
        {
          id: 'cm4g0xc3q0011pciwe517vcx3',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000gevo04hmehrs2',
          completedAt: new Date('2024-12-08 19:55:53.607')
        },
        {
          id: 'cm4g0xedx0013pciwmu2m2c2b',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000ievo0rh3p8pm5',
          completedAt: new Date('2024-12-08 19:55:56.565')
        },
        {
          id: 'cm4g0xh7k0015pciwrgj14a6g',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000jevo0q15i9xa1',
          completedAt: new Date('2024-12-08 19:56:00.225')
        },
        {
          id: 'cm4g0xjgt0017pciwbktzjhwg',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000levo0a7g48afa',
          completedAt: new Date('2024-12-08 19:56:03.15')
        },
        {
          id: 'cm4g0xm7v0019pciwrk4up6us',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkiq000nevo0ruqb2zjo',
          completedAt: new Date('2024-12-08 19:56:06.715')
        },
        {
          id: 'cm4g0xo95001bpciwi4efo3ck',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0011evo0xkooso5h',
          completedAt: new Date('2024-12-08 19:56:09.353')
        },
        {
          id: 'cm4g0xq42001dpciwwxuztzku',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0014evo018d65879',
          completedAt: new Date('2024-12-08 19:56:11.762')
        },
        {
          id: 'cm4g0xrvr001fpciwty7l1aq7',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000revo0a7a46w53',
          completedAt: new Date('2024-12-08 19:56:14.056')
        },
        {
          id: 'cm4g0xthh001hpciw5xereu08',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0019evo08cdx2gx4',
          completedAt: new Date('2024-12-08 19:56:16.133')
        },
        {
          id: 'cm4g0xv3e001jpciw0q3wdup7',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000sevo0u5lg5usb',
          completedAt: new Date('2024-12-08 19:56:18.218')
        },
        {
          id: 'cm4g0xwq9001lpciw8nue8gp8',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0017evo0l46b5neg',
          completedAt: new Date('2024-12-08 19:56:20.337')
        },
        {
          id: 'cm4g0xyad001npciwmprmf4zb',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0016evo0y7f5qfny',
          completedAt: new Date('2024-12-08 19:56:22.357')
        },
        {
          id: 'cm4g0y3qf001rpciwjbc307wc',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000zevo055qonlng',
          completedAt: new Date('2024-12-08 19:56:29.415')
        },
        {
          id: 'cm4g0y5n0001tpciwmewnn6fx',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0013evo0alwmr6ve',
          completedAt: new Date('2024-12-08 19:56:31.885')
        },
        {
          id: 'cm4g0y7h5001vpciwr5fz1cw8',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0015evo0wcd3i2hm',
          completedAt: new Date('2024-12-08 19:56:34.265')
        },
        {
          id: 'cm4g0y97t001xpciwdaotnslj',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000xevo0ol6k92r2',
          completedAt: new Date('2024-12-08 19:56:36.521')
        },
        {
          id: 'cm4g0yaw8001zpciwf743tjza',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0012evo0xl3ecab0',
          completedAt: new Date('2024-12-08 19:56:38.697')
        },
        {
          id: 'cm4g0yczq0021pciwymo87si7',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0010evo0rg6l9289',
          completedAt: new Date('2024-12-08 19:56:41.414')
        },
        {
          id: 'cm4g0yews0023pciwjp05ltbf',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000wevo0tbh9qreu',
          completedAt: new Date('2024-12-08 19:56:43.901')
        },
        {
          id: 'cm4g0yh340025pciwuok6a6qf',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000uevo0k4ncdus4',
          completedAt: new Date('2024-12-08 19:56:46.721')
        },
        {
          id: 'cm4g0yj2y0027pciwntj9fzgi',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000tevo0fjenkxlt',
          completedAt: new Date('2024-12-08 19:56:49.306')
        },
        {
          id: 'cm4g0yl2e0029pciw5jzpobou',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000vevo0tkpzkswi',
          completedAt: new Date('2024-12-08 19:56:51.878')
        },
        {
          id: 'cm4g0ynky002bpciwjll5ojll',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000qevo0kx3vqpie',
          completedAt: new Date('2024-12-08 19:56:55.139')
        },
        {
          id: 'cm4g0ypyg002dpciwq1v5tocs',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc0018evo0alhr5i70',
          completedAt: new Date('2024-12-08 19:56:58.216')
        },
        {
          id: 'cm4g0ysc5002fpciwpod6opfh',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjc000yevo0q4nb0p36',
          completedAt: new Date('2024-12-08 19:57:01.302')
        },
        {
          id: 'cm4g0yueu002hpciwazu2bfy2',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001ievo01el2qntn',
          completedAt: new Date('2024-12-08 19:57:03.99')
        },
        {
          id: 'cm4g0ywix002jpciwei4lgyhe',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001gevo0otliv9fw',
          completedAt: new Date('2024-12-08 19:57:06.729')
        },
        {
          id: 'cm4g0yzfl002lpciww022sfe8',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001fevo0vici5854',
          completedAt: new Date('2024-12-08 19:57:10.497')
        },
        {
          id: 'cm4g0z22l002npciw487knd26',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001sevo0sy8t77if',
          completedAt: new Date('2024-12-08 19:57:13.917')
        },
        {
          id: 'cm4g0z4jf002ppciw421fm2ho',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001jevo01f7wikb2',
          completedAt: new Date('2024-12-08 19:57:17.115')
        },
        {
          id: 'cm4g0z6z7002rpciwg3ezvuog',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001hevo0a3p0onu1',
          completedAt: new Date('2024-12-08 19:57:20.276')
        },
        {
          id: 'cm4g0z8km002tpciwpcf8707l',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001uevo0nfsdv1tb',
          completedAt: new Date('2024-12-08 19:57:22.342')
        },
        {
          id: 'cm4g0za55002vpciwcegwureg',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001revo04gpzz177',
          completedAt: new Date('2024-12-08 19:57:24.377')
        },
        {
          id: 'cm4g0zbwy002xpciwf28e4fws',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001eevo0pwgqrfw8',
          completedAt: new Date('2024-12-08 19:57:26.675')
        },
        {
          id: 'cm4g0zdo0002zpciwe4fek108',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001levo03pb77won',
          completedAt: new Date('2024-12-08 19:57:28.944')
        },
        {
          id: 'cm4g0zf9v0031pciwzf902df0',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001tevo0uveuuges',
          completedAt: new Date('2024-12-08 19:57:31.028')
        },
        {
          id: 'cm4g0zgvu0033pciwtzplpy8t',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001devo0v8yuzue7',
          completedAt: new Date('2024-12-08 19:57:33.115')
        },
        {
          id: 'cm4g0zifp0035pciwieh42vck',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001cevo0s4m2edxm',
          completedAt: new Date('2024-12-08 19:57:35.126')
        },
        {
          id: 'cm4g0zk180037pciwh8078r4v',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001pevo0kiiozpch',
          completedAt: new Date('2024-12-08 19:57:37.197')
        },
        {
          id: 'cm4g0zm4y0039pciwlasc4v6c',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001nevo09e8v9377',
          completedAt: new Date('2024-12-08 19:57:39.923')
        },
        {
          id: 'cm4g0zo8w003bpciw3b78wu3n',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001qevo0md0yrph4',
          completedAt: new Date('2024-12-08 19:57:42.656')
        },
        {
          id: 'cm4g0zpxm003dpciwjwugkjjm',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001mevo0vcuqherv',
          completedAt: new Date('2024-12-08 19:57:44.842')
        },
        {
          id: 'cm4g0zs6c003fpciwgxauwcj9',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001kevo05xw46hi3',
          completedAt: new Date('2024-12-08 19:57:47.748')
        },
        {
          id: 'cm4g0ztwx003hpciwmm5gohge',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001vevo0eww0ihgl',
          completedAt: new Date('2024-12-08 19:57:50.001')
        },
        {
          id: 'cm4g0zwqk003jpciw2t5wr57h',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjm001oevo0vwwmcfg5',
          completedAt: new Date('2024-12-08 19:57:53.66')
        },
        {
          id: 'cm4g0zyw8003lpciw65ljb8j3',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjr001yevo0b2tvgk3t',
          completedAt: new Date('2024-12-08 19:57:56.457')
        },
        {
          id: 'cm4g1014o003npciw9g9ypel1',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dgkjr001zevo0m91vvved',
          completedAt: new Date('2024-12-08 19:57:59.352')
        },
        {
          id: 'cm4g16lcx003xpciw0325et7s',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000aevughkjs9pb7',
          completedAt: new Date('2024-12-08 20:03:05.506')
        },
        {
          id: 'cm4g16no5003zpciwkj6m8zyu',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000kevugdrp18k7m',
          completedAt: new Date('2024-12-08 20:03:08.502')
        },
        {
          id: 'cm4g16per0041pciwg84bvfwm',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000jevugynlmli1m',
          completedAt: new Date('2024-12-08 20:03:10.756')
        },
        {
          id: 'cm4g16qza0043pciw3uimtbuj',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000nevug7ea4jdv5',
          completedAt: new Date('2024-12-08 20:03:12.79')
        },
        {
          id: 'cm4g16t0k0045pciw0g9fo8ej',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000ievugsnf5fo9e',
          completedAt: new Date('2024-12-08 20:03:15.428')
        },
        {
          id: 'cm4g16up20047pciw8z9noxlv',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus30006evugmxcytc34',
          completedAt: new Date('2024-12-08 20:03:17.607')
        },
        {
          id: 'cm4g16w910049pciwg0yl96ox',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus30004evugqq11femj',
          completedAt: new Date('2024-12-08 20:03:19.621')
        },
        {
          id: 'cm4g16xwk004bpciwp3uugxu2',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus30005evugcvqs03gi',
          completedAt: new Date('2024-12-08 20:03:21.764')
        },
        {
          id: 'cm4g16zgq004dpciwgu07sw4q',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus30007evugxqi7q16n',
          completedAt: new Date('2024-12-08 20:03:23.786')
        },
        {
          id: 'cm4g1711v004fpciw4lct14ov',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus30008evuglvn6nin9',
          completedAt: new Date('2024-12-08 20:03:25.844')
        },
        {
          id: 'cm4g1751y004hpciwvefvgnml',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000eevugvt6pcwu9',
          completedAt: new Date('2024-12-08 20:03:31.031')
        },
        {
          id: 'cm4g17705004jpciw1py8zp48',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus30009evugjeblp3tn',
          completedAt: new Date('2024-12-08 20:03:33.557')
        },
        {
          id: 'cm4g178q5004lpciwadk0idv3',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000bevug9xv3ltiy',
          completedAt: new Date('2024-12-08 20:03:35.789')
        },
        {
          id: 'cm4g17af5004npciwybjdhqyp',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000cevugwcpnda1x',
          completedAt: new Date('2024-12-08 20:03:37.985')
        },
        {
          id: 'cm4g17cfm004ppciwsgynnv5v',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000hevugl7ewkzna',
          completedAt: new Date('2024-12-08 20:03:40.594')
        },
        {
          id: 'cm4g17eeu004rpciwgs2r1ag7',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000gevug5ud23dy9',
          completedAt: new Date('2024-12-08 20:03:43.159')
        },
        {
          id: 'cm4g17g8l004tpciwvru9dywp',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000fevugm155ddum',
          completedAt: new Date('2024-12-08 20:03:45.525')
        },
        {
          id: 'cm4g17hzg004vpciwlp61f9ow',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000devugevvvo9ud',
          completedAt: new Date('2024-12-08 20:03:47.788')
        },
        {
          id: 'cm4g17jpv004xpciwnf992s7g',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000levuglpvyj2hc',
          completedAt: new Date('2024-12-08 20:03:50.036')
        },
        {
          id: 'cm4g17ldy004zpciwcrdldbxy',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus3000mevug6rlk68te',
          completedAt: new Date('2024-12-08 20:03:52.198')
        },
        {
          id: 'cm4g17n9i0051pciw53g8hfpb',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90016evugt365ucr6',
          completedAt: new Date('2024-12-08 20:03:54.631')
        },
        {
          id: 'cm4g17p4z0053pciw4vkomnbe',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90010evugdcw22xj4',
          completedAt: new Date('2024-12-08 20:03:57.059')
        },
        {
          id: 'cm4g17qyl0055pciwp1yxtqkr',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000wevugocurog48',
          completedAt: new Date('2024-12-08 20:03:59.422')
        },
        {
          id: 'cm4g17su30057pciwcroyr40m',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus9000zevuggg73s9bd',
          completedAt: new Date('2024-12-08 20:04:01.851')
        },
        {
          id: 'cm4g17utp0059pciw5bljqjn2',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90014evugpvxw1s3z',
          completedAt: new Date('2024-12-08 20:04:04.429')
        },
        {
          id: 'cm4g17x13005bpciw2780w87k',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90015evugg39wihmz',
          completedAt: new Date('2024-12-08 20:04:07.288')
        },
        {
          id: 'cm4g17yq3005dpciwavr9xiii',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000qevugql8028t5',
          completedAt: new Date('2024-12-08 20:04:09.484')
        },
        {
          id: 'cm4g180i5005fpciwlf0pzoqo',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000xevugo5k7f1z6',
          completedAt: new Date('2024-12-08 20:04:11.789')
        },
        {
          id: 'cm4g182io005hpciw4t0z7mf9',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus9000yevug8vmj6fbk',
          completedAt: new Date('2024-12-08 20:04:14.4')
        },
        {
          id: 'cm4g184hq005jpciwaujb3o4p',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000sevugxhndc4cq',
          completedAt: new Date('2024-12-08 20:04:16.958')
        },
        {
          id: 'cm4g186co005lpciw0v7zj28i',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000uevugrdn1b4lg',
          completedAt: new Date('2024-12-08 20:04:19.368')
        },
        {
          id: 'cm4g188en005npciwl9yay8es',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90013evug10xcvha8',
          completedAt: new Date('2024-12-08 20:04:22.031')
        },
        {
          id: 'cm4g18agj005ppciw4jjtjh9c',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000tevugt2w43rqo',
          completedAt: new Date('2024-12-08 20:04:24.691')
        },
        {
          id: 'cm4g18edc005rpciwf399nnf2',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90012evugenl68wba',
          completedAt: new Date('2024-12-08 20:04:29.761')
        },
        {
          id: 'cm4g18giw005tpciwrfc9xp0x',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90011evug4l3pcz8p',
          completedAt: new Date('2024-12-08 20:04:32.553')
        },
        {
          id: 'cm4g18iip005vpciw25gbmtk9',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000vevug1qn3hauy',
          completedAt: new Date('2024-12-08 20:04:35.137')
        },
        {
          id: 'cm4g18kdi005xpciwrgq6mbrd',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus8000revuggm32au2n',
          completedAt: new Date('2024-12-08 20:04:37.543')
        },
        {
          id: 'cm4g18mbz005zpciwjkdzjy6t',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90019evug7awsce1y',
          completedAt: new Date('2024-12-08 20:04:40.08')
        },
        {
          id: 'cm4g18q8p0061pciw5miecjvs',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90018evug683ecfvf',
          completedAt: new Date('2024-12-08 20:04:45.146')
        },
        {
          id: 'cm4g18sqd0063pciw3q53m5nn',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpus90017evug92f355io',
          completedAt: new Date('2024-12-08 20:04:48.374')
        },
        {
          id: 'cm4g18ulj0065pciwpdvz4bva',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpusc001cevuga4d0s14k',
          completedAt: new Date('2024-12-08 20:04:50.791')
        },
        {
          id: 'cm4g18wma0067pciwvsq87bhf',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpusc001gevugyk2l3osu',
          completedAt: new Date('2024-12-08 20:04:53.41')
        },
        {
          id: 'cm4g18yg80069pciwb2nxjnpw',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpusc001hevug8603oc5x',
          completedAt: new Date('2024-12-08 20:04:55.784')
        },
        {
          id: 'cm4g190el006bpciwryatgdu4',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpusc001fevugaqv8hqid',
          completedAt: new Date('2024-12-08 20:04:58.317')
        },
        {
          id: 'cm4g192wp006dpciw5oonuiik',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpusc001eevugi7uz0lks',
          completedAt: new Date('2024-12-08 20:05:01.561')
        },
        {
          id: 'cm4g194oi006fpciwj6mbe45r',
          userId: 'cm3p0gqr7000292pn6sirtw06',
          lessonId: 'cm44dpusc001devugfhdacmrg',
          completedAt: new Date('2024-12-08 20:05:03.858')
        }
      ]
    });

    await prisma.rating.createMany({
      data: {
        id: 'cm4g00h1e0001jqgdjhpsdnbl',
        rating: 3.5,
        comment: 'Curso muy completo tocando temas de bajo nivel como: el manejo de la memoria, referencias y punteros.',
        userId: 'cm3p0gqr7000292pn6sirtw06',
        courseId: 'cm44dgkig0001evo01ztw5oqb',
        createdAt: new Date('2024-12-08 19:30:20.355'),
        updatedAt: new Date('2025-02-08 19:15:36.524')
      }
    });

    return NextResponse.json({ message: 'Seed ejecutada exitosamente' });
  } catch (err) {
    return NextResponse.json(
      { message: `Error inesperado al ejecutar la seed: ${process.env.NODE_ENV !== 'production' ? err : ''}` },
      { status: 500 }
    );
  }
}