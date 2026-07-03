import { z } from "zod";

export const WeatherConditionSchema = z.enum([
  "clear",
  "partly-cloudy",
  "cloudy",
  "rain",
  "thunderstorm",
  "stormy",
]);
export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;

export const WeatherUpdateSchema = z.object({
  id: z.string(),
  location: z.string(),
  region: z.string(),
  temperatureC: z.number(),
  condition: WeatherConditionSchema,
  humidityPercent: z.number().min(0).max(100),
  windSpeedKph: z.number().nonnegative(),
  rainfallMm: z.number().nonnegative().optional(),
  updatedAt: z.string().datetime(),
});
export type WeatherUpdate = z.infer<typeof WeatherUpdateSchema>;

export const WeatherUpdateListSchema = z.array(WeatherUpdateSchema);
