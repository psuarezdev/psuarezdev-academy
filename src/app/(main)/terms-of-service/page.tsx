import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Términos de Servicio de PSuarezdev Academy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert space-y-5">
          <h2 className="text-xl font-semibold">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar PSuarezdev Academy, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.
          </p>
          <h2 className="text-xl font-semibold">2. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento. Es su responsabilidad revisar estos Términos periódicamente para ver si hay cambios.
          </p>
          <h2 className="text-xl font-semibold">3. Acceso al Servicio</h2>
          <p>
            Nos reservamos el derecho de retirar o modificar nuestro servicio, y cualquier servicio o material que proporcionemos en PSuarezdev Academy, a nuestra sola discreción sin previo aviso.
          </p>
          <h2 className="text-xl font-semibold">4. Propiedad Intelectual</h2>
          <p>
            El contenido, características y funcionalidad de PSuarezdev Academy son y seguirán siendo propiedad exclusiva de PSuarezdev Academy y sus licenciantes.
          </p>
          <h2 className="text-xl font-semibold">5. Limitación de Responsabilidad</h2>
          <p>
            En ningún caso PSuarezdev Academy, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}