/**
 * Storm data access layer.
 *
 * Today: reads from local mock data.
 * Later: replace the function bodies below with fetch() calls to a real
 * tropical-cyclone source (NOAA/JTWC, JMA, PAGASA), keeping the same
 * signatures and Zod validation so nothing upstream needs to change.
 */
import "server-only";
import { cache } from "react";
import { mockStorms } from "@/lib/mock-data/storms";
import { StormListSchema, StormSchema, type Storm } from "@/types/storm";

export const getAllStorms = cache(async (): Promise<Storm[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return StormListSchema.parse(mockStorms);
});

export const getActiveStorms = cache(async (): Promise<Storm[]> => {
  const storms = await getAllStorms();
  return storms.filter((storm) => storm.isActive);
});

export const getStormById = cache(async (id: string): Promise<Storm | null> => {
  const storms = await getAllStorms();
  const storm = storms.find((s) => s.id === id) ?? null;
  return storm ? StormSchema.parse(storm) : null;
});
