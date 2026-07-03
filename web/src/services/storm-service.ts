import "server-only";
import { mockStorms } from "@/lib/mock-data/storms";
import { StormListSchema, StormSchema, type Storm } from "@/types/storm";

/**
 * Storm data access layer.
 *
 * Today: reads from local mock data.
 * Later: replace the function bodies below with fetch() calls to a real
 * tropical-cyclone source (NOAA/JTWC, JMA, PAGASA), keeping the same
 * signatures and Zod validation so nothing upstream needs to change.
 */

export async function getAllStorms(): Promise<Storm[]> {
  // Simulates network latency of a real API
  await new Promise((resolve) => setTimeout(resolve, 50));
  return StormListSchema.parse(mockStorms);
}

export async function getActiveStorms(): Promise<Storm[]> {
  const storms = await getAllStorms();
  return storms.filter((storm) => storm.isActive);
}

export async function getStormById(id: string): Promise<Storm | null> {
  const storms = await getAllStorms();
  const storm = storms.find((s) => s.id === id) ?? null;
  return storm ? StormSchema.parse(storm) : null;
}
