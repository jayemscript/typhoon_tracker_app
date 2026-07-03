/**
 * Weather data access layer.
 * Today: local mock data. Later: swap for a real source (e.g. Open-Meteo) —
 * signature and Zod validation stay identical so nothing upstream changes.
 */
import "server-only";
import { cache } from "react";
import { mockWeatherUpdates } from "@/lib/mock-data/weather";
import { WeatherUpdateListSchema, type WeatherUpdate } from "@/types/weather";

export const getLatestWeatherUpdates = cache(
  async (): Promise<WeatherUpdate[]> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return WeatherUpdateListSchema.parse(mockWeatherUpdates);
  },
);
