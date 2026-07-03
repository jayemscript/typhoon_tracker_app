import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA_SOURCES } from "@/lib/constants/about";

export function DataSourcesSection() {
  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-12">
      <SectionHeader
        title="Planned Data Sources"
        description="Real-time integrations on the roadmap — mock data is used today"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DATA_SOURCES.map((source) => (
          <Card key={source.name}>
            <CardContent className="flex items-start justify-between gap-3 p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{source.name}</span>
                <span className="text-xs text-muted-foreground">
                  {source.description}
                </span>
              </div>
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
