import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Política de Privacidad de PSuarezdev Academy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert space-y-5">
          <h2 className="text-xl font-semibold">1. Información que Recopilamos</h2>
          <p>
            Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico y datos de pago cuando se registra en nuestra plataforma.
          </p>
          <h2 className="text-xl font-semibold">2. Cómo Utilizamos su Información</h2>
          <p>
            Utilizamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios, así como para comunicarnos con usted sobre su cuenta y actualizaciones de la plataforma.
          </p>
          <h2 className="text-xl font-semibold">3. Compartir Información</h2>
          <p>
            No vendemos ni compartimos su información personal con terceros, excepto según lo descrito en esta política o con su consentimiento.
          </p>
          <h2 className="text-xl font-semibold">4. Seguridad de los Datos</h2>
          <p>
            Tomamos medidas razonables para proteger su información personal contra pérdida, robo, uso indebido y acceso no autorizado.
          </p>
          <h2 className="text-xl font-semibold">5. Sus Derechos</h2>
          <p>
            Usted tiene derecho a acceder, corregir o eliminar su información personal. Para ejercer estos derechos, póngase en contacto con nosotros a través de la información proporcionada al final de esta política.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}