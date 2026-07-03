import { formatDistanceToNow } from "date-fns";
import { STORM_CATEGORY_LABELS } from "@/lib/constants/storm";
import type { StormCategory } from "@/types/storm";

export function formatCategoryLabel(category: StormCategory): string {
  return STORM_CATEGORY_LABELS[category];
}

export function formatWindSpeed(kph: number): string {
  return `${Math.round(kph)} km/h`;
}

export function formatPressure(hpa: number): string {
  return `${Math.round(hpa)} hPa`;
}

export function formatRelativeTime(isoDate: string): string {
  return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
}
