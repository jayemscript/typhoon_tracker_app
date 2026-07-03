import { Layers } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { TECH_STACK } from "@/lib/constants/about";

export function TechStackSection() {
  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-12">
      <SectionHeader
        title="Built With"
        description="The technology powering this app"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_STACK.map((tech) => (
          <Card key={tech.name}>
            <CardContent className="flex items-start gap-3 p-4">
              <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{tech.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tech.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
