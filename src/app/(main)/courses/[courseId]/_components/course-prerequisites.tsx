import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoursePrerequisites({ prerequisites }: { prerequisites: string[]; }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requisitos Previos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {prerequisites.map((label, innerIndex) => (
            <li key={`module-item-${innerIndex}`}>{label}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}