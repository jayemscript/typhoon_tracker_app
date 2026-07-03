import type { StormCategory } from "@/types/storm";

export const STORM_CATEGORY_COLORS: Record<StormCategory, string> = {
  "tropical-depression": "#60a5fa",
  "tropical-storm": "#facc15",
  "severe-tropical-storm": "#fb923c",
  typhoon: "#f87171",
  "super-typhoon": "#c026d3",
};

export const STORM_CATEGORY_LABELS: Record<StormCategory, string> = {
  "tropical-depression": "Tropical Depression",
  "tropical-storm": "Tropical Storm",
  "severe-tropical-storm": "Severe Tropical Storm",
  typhoon: "Typhoon",
  "super-typhoon": "Super Typhoon",
};

// Ordered by increasing severity — used to pick the most severe active
// storm as the homepage's "featured" storm.
const STORM_CATEGORY_SEVERITY: StormCategory[] = [
  "tropical-depression",
  "tropical-storm",
  "severe-tropical-storm",
  "typhoon",
  "super-typhoon",
];

export function getStormSeverityRank(category: StormCategory): number {
  return STORM_CATEGORY_SEVERITY.indexOf(category);
}
