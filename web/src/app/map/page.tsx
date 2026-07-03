import { Suspense } from "react";
import { getAllStorms } from "@/services/storm-service";
import { MapSkeleton } from "@/components/map/map-skeleton";
import { TyphoonMapLoader } from "@/components/map/typhoon-map-loader";

export const revalidate = 300;

export default async function MapPage() {
  const storms = await getAllStorms();

  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] p-4">
        <div className="pointer-events-auto inline-block rounded-lg border bg-background/90 px-4 py-2.5 shadow-sm backdrop-blur">
          <h1 className="text-sm font-semibold tracking-tight">
            Interactive Storm Map
          </h1>
          <p className="text-xs text-muted-foreground">
            Live and forecast tracks for active and recent storms
          </p>
        </div>
      </div>

      <Suspense fallback={<MapSkeleton />}>
        <TyphoonMapLoader storms={storms} />
      </Suspense>
    </div>
  );
}
