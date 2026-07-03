import { Suspense } from "react";
import { getAllStorms } from "@/services/storm-service";
import { MapSkeleton } from "@/components/map/map-skeleton";
import { TyphoonMapLoader } from "@/components/map/typhoon-map-loader";

export const revalidate = 300;

export default async function MapPage() {
  const storms = await getAllStorms();

  return (
    <main className="container mx-auto flex flex-col gap-4 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Interactive Storm Map
        </h1>
        <p className="text-muted-foreground">
          Live and forecast tracks for active and recent storms.
        </p>
      </div>

      <Suspense fallback={<MapSkeleton />}>
        <div className="h-150 w-full">
          <TyphoonMapLoader storms={storms} />
        </div>
      </Suspense>
    </main>
  );
}
