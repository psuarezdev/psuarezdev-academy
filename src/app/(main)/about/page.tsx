import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Sobre Nosotros | PSuarezDev Academy',
  description: 'Conoce más sobre PSuarezDev Academy, nuestra misión y nuestro equipo.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre PSuarezDev Academy</h1>
      <section className="mb-12 prose-2xl dark:prose-invert">
        <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
        <p className="text-lg mb-4">
          En PSuarezDev Academy, nuestra misión es proporcionar educación de alta calidad en desarrollo web y tecnologías modernas,
          permitiendo a nuestros estudiantes alcanzar sus metas profesionales y contribuir al mundo tecnológico en constante evolución.
        </p>
        <p className="text-lg mb-4">
          Nos esforzamos por crear un ambiente de aprendizaje inclusivo, innovador y práctico, donde los estudiantes pueden
          desarrollar habilidades relevantes para la industria y construir una base sólida para sus carreras en tecnología.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Excelencia', description: 'Nos comprometemos a ofrecer contenido educativo de la más alta calidad.' },
            { title: 'Innovación', description: 'Constantemente actualizamos nuestros cursos para reflejar las últimas tendencias tecnológicas.' },
            { title: 'Comunidad', description: 'Fomentamos un ambiente de aprendizaje colaborativo y de apoyo mutuo.' },
          ].map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Pablo Suárez', role: 'Fundador', image: '/founder.jpeg' },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-center text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <p className="text-lg mb-4">
          ¿Tienes alguna pregunta o comentario? No dudes en ponerte en contacto con nosotros:
        </p>
        <ul className="list-disc list-inside [&>li]:ml-4">
          <li>Email: info@psuarezdevacademy.com</li>
          {/* <li>Teléfono: +34 123 456 789</li> */}
          {/* <li>Dirección: Calle Tecnología 123, 28001 Madrid, España</li> */}
        </ul>
      </section>
    </div>
  );
}
