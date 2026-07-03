import { z } from "zod";

export const StormCategorySchema = z.enum([
  "tropical-depression",
  "tropical-storm",
  "severe-tropical-storm",
  "typhoon",
  "super-typhoon",
]);
export type StormCategory = z.infer<typeof StormCategorySchema>;

export const CoordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
export type Coordinates = z.infer<typeof CoordinatesSchema>;

// A single recorded/forecast position along a storm's path
export const StormTrackPointSchema = z.object({
  timestamp: z.string().datetime(),
  position: CoordinatesSchema,
  windSpeedKph: z.number().nonnegative(),
  pressureHpa: z.number().nonnegative(),
  category: StormCategorySchema,
  isForecast: z.boolean().default(false),
});
export type StormTrackPoint = z.infer<typeof StormTrackPointSchema>;

export const StormSchema = z.object({
  id: z.string(),
  name: z.string(),
  internationalName: z.string().optional(),
  category: StormCategorySchema,
  isActive: z.boolean(),
  currentPosition: CoordinatesSchema,
  windSpeedKph: z.number().nonnegative(),
  pressureHpa: z.number().nonnegative(),
  movementDirection: z.string(), // e.g. "WNW"
  movementSpeedKph: z.number().nonnegative(),
  track: z.array(StormTrackPointSchema),
  radiusOfUncertaintyKm: z.number().nonnegative().optional(),
  lastUpdated: z.string().datetime(),
});
export type Storm = z.infer<typeof StormSchema>;

export const StormListSchema = z.array(StormSchema);
