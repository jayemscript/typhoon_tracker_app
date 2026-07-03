"use client";

import dynamic from "next/dynamic";
import type { Storm } from "@/types/storm";
import { MapSkeleton } from "@/components/map/map-skeleton";

// This file is itself a Client Component, so `ssr: false` is allowed here.
const TyphoonMap = dynamic(
  () => import("@/components/map/typhoon-map.js").then((mod) => mod.TyphoonMap),
  { ssr: false, loading: () => <MapSkeleton /> },
);

interface TyphoonMapLoaderProps {
  storms: Storm[];
}

export function TyphoonMapLoader({ storms }: TyphoonMapLoaderProps) {
  return <TyphoonMap storms={storms} />;
}
