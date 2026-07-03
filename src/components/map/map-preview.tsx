import Link from "next/link";
import { Map as MapIcon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MapPreview() {
  return (
    <Card className="overflow-hidden">
      <div className="flex h-64 w-full items-center justify-center bg-linear-to-br from-sky-100 to-sky-50 dark:from-sky-950 dark:to-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MapIcon className="h-7 w-7 text-primary" />
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Explore live storm tracks, forecast paths, and the cone of
            uncertainty on the full map.
          </p>
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/map">
              Open Interactive Map
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
