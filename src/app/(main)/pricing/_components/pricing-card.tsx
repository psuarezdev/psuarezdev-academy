import { Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SubscribeButton from './subscribe-button'

interface PricingCardProps {
  accessToken?: string;
  data: {
    id: string;
    name: string;
    amount: number;
    description: string;
    features: string[];
  };
}

export default function PricingCard({ accessToken, data }: PricingCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-center text-3xl capitalize mb-3.5">{data.name}</CardTitle>
        <CardDescription>
          <span className="flex flex-col items-center gap-2 mb-8">
            <span className="text-xl">{data.amount}€/</span>
            <span className="text-base">{data.description}</span>
          </span>
          <SubscribeButton accessToken={accessToken} priceId={data.id}>
            <span className="capitalize">Seleccionar plan {data.name}</span>
          </SubscribeButton>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mt-5">
        <ul className="space-y-2">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter />
    </Card>
  );
}