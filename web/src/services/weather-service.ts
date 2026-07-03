import "server-only";
import { mockWeatherUpdates } from "@/lib/mock-data/weather";
import { WeatherUpdateListSchema, type WeatherUpdate } from "@/types/weather";

/**
 * Weather data access layer.
 * Today: local mock data. Later: swap for a real source (e.g. Open-Meteo) —
 * signature and Zod validation stay identical so nothing upstream changes.
 */
export async function getLatestWeatherUpdates(): Promise<WeatherUpdate[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return WeatherUpdateListSchema.parse(mockWeatherUpdates);
}
