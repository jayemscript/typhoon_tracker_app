import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { WeatherUpdate, WeatherCondition } from "@/types/weather";
import { formatRelativeTime } from "@/lib/utils/format";

const CONDITION_ICONS: Record<WeatherCondition, typeof Sun> = {
  clear: Sun,
  "partly-cloudy": CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  thunderstorm: CloudLightning,
  stormy: Wind,
};

const CONDITION_LABELS: Record<WeatherCondition, string> = {
  clear: "Clear",
  "partly-cloudy": "Partly Cloudy",
  cloudy: "Cloudy",
  rain: "Rain",
  thunderstorm: "Thunderstorm",
  stormy: "Stormy",
};

export function WeatherCard({ update }: { update: WeatherUpdate }) {
  const Icon = CONDITION_ICONS[update.condition];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <div>
          <h3 className="font-medium">{update.location}</h3>
          <p className="text-xs text-muted-foreground">{update.region}</p>
        </div>
        <Icon className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold">
            {Math.round(update.temperatureC)}°C
          </span>
          <span className="text-xs text-muted-foreground">
            {CONDITION_LABELS[update.condition]}
          </span>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>Humidity {update.humidityPercent}%</span>
          <span>Wind {Math.round(update.windSpeedKph)} km/h</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Updated {formatRelativeTime(update.updatedAt)}
        </p>
      </CardContent>
    </Card>
  );
}
