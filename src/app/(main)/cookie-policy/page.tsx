import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiePolicy() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Política de Cookies de PSuarezdev Academy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert space-y-5">
          <h2 className="text-xl font-semibold">1. ¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a proporcionar una mejor experiencia de usuario y a entender cómo se utiliza nuestro sitio.
          </p>
          <h2 className="text-xl font-semibold">2. Tipos de Cookies que Utilizamos</h2>
          <ul className="list-disc ml-8">
            <li>Cookies esenciales: Necesarias para el funcionamiento básico del sitio.</li>
            <li>Cookies de rendimiento: Nos ayudan a entender cómo interactúan los usuarios con nuestro sitio.</li>
            <li>Cookies de funcionalidad: Permiten recordar sus preferencias y proporcionar funciones mejoradas.</li>
            <li>Cookies de publicidad: Utilizadas para mostrar anuncios relevantes basados en sus intereses.</li>
          </ul>
          <h2 className="text-xl font-semibold">3. Control de Cookies</h2>
          <p>
            Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen.
          </p>
          <h2 className="text-xl font-semibold">4. Cambios en nuestra Política de Cookies</h2>
          <p>
            Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta página y, cuando sea apropiado, se le notificará por correo electrónico.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}