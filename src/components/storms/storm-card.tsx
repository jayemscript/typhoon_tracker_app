import Link from "next/link";
import { ArrowUpRight, Wind, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Storm } from "@/types/storm";
import { STORM_CATEGORY_COLORS } from "@/lib/constants/storm";
import {
  formatCategoryLabel,
  formatWindSpeed,
  formatPressure,
  formatRelativeTime,
} from "@/lib/utils/format";

interface StormCardProps {
  storm: Storm;
  variant?: "default" | "featured";
}

export function StormCard({ storm, variant = "default" }: StormCardProps) {
  const color = STORM_CATEGORY_COLORS[storm.category];
  const isFeatured = variant === "featured";

  return (
    <Link href={`/storms/${storm.id}`} className="group block h-full">
      <Card
        className={`h-full transition-shadow hover:shadow-md ${isFeatured ? "border-l-4" : ""}`}
        style={isFeatured ? { borderLeftColor: color } : undefined}
      >
        <CardHeader className="flex flex-row items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h3
                className={`font-semibold ${isFeatured ? "text-xl" : "text-base"}`}
              >
                {storm.name}
              </h3>
              {storm.isActive && (
                <Badge variant="destructive" className="text-[10px]">
                  Active
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCategoryLabel(storm.category)}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Wind className="h-3.5 w-3.5" />
              {formatWindSpeed(storm.windSpeedKph)}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" />
              {formatPressure(storm.pressureHpa)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Updated {formatRelativeTime(storm.lastUpdated)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
