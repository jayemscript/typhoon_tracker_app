"use client";

import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import type { Storm, StormCategory } from "@/types/storm";

interface TyphoonMapProps {
  storms: Storm[];
}

const CATEGORY_COLORS: Record<StormCategory, string> = {
  "tropical-depression": "#60a5fa",
  "tropical-storm": "#facc15",
  "severe-tropical-storm": "#fb923c",
  typhoon: "#f87171",
  "super-typhoon": "#c026d3",
};

const CATEGORY_LABELS: Record<StormCategory, string> = {
  "tropical-depression": "Tropical Depression",
  "tropical-storm": "Tropical Storm",
  "severe-tropical-storm": "Severe Tropical Storm",
  typhoon: "Typhoon",
  "super-typhoon": "Super Typhoon",
};

function createStormIcon(color: string) {
  return L.divIcon({
    className: "storm-marker",
    html: `<span style="
      display:block;width:16px;height:16px;border-radius:9999px;
      background:${color};border:2px solid white;
      box-shadow:0 0 0 2px ${color}66, 0 2px 6px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export function TyphoonMap({ storms }: TyphoonMapProps) {
  const center: [number, number] = useMemo(() => {
    const active = storms.find((s) => s.isActive);
    return active
      ? [active.currentPosition.lat, active.currentPosition.lng]
      : [15, 125];
  }, [storms]);

  const activeCategories = useMemo(
    () => Array.from(new Set(storms.map((s) => s.category))),
    [storms],
  );

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <ZoomControl position="bottomright" />

        {storms.map((storm) => {
          const color = CATEGORY_COLORS[storm.category];
          const trackPositions: [number, number][] = storm.track.map((p) => [
            p.position.lat,
            p.position.lng,
          ]);
          const forecastStart = storm.track.findIndex((p) => p.isForecast);

          return (
            <div key={storm.id}>
              <Polyline
                positions={
                  forecastStart === -1
                    ? trackPositions
                    : trackPositions.slice(0, forecastStart + 1)
                }
                pathOptions={{ color, weight: 3 }}
              />

              {forecastStart !== -1 && (
                <Polyline
                  positions={trackPositions.slice(forecastStart)}
                  pathOptions={{ color, weight: 3, dashArray: "6 8" }}
                />
              )}

              {storm.radiusOfUncertaintyKm && (
                <Circle
                  center={[
                    storm.currentPosition.lat,
                    storm.currentPosition.lng,
                  ]}
                  radius={storm.radiusOfUncertaintyKm * 1000}
                  pathOptions={{ color, fillOpacity: 0.08, weight: 1 }}
                />
              )}

              <Marker
                position={[
                  storm.currentPosition.lat,
                  storm.currentPosition.lng,
                ]}
                icon={createStormIcon(color)}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{storm.name}</p>
                    <p className="capitalize text-muted-foreground">
                      {storm.category.replace(/-/g, " ")}
                    </p>
                    <p>{storm.windSpeedKph} km/h winds</p>
                    <p>{storm.pressureHpa} hPa</p>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>

      <div className="pointer-events-none absolute bottom-4 left-4 z-1000">
        <div className="pointer-events-auto rounded-lg border bg-background/90 p-3 shadow-sm backdrop-blur">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Storm Category
          </p>
          <ul className="flex flex-col gap-1.5">
            {activeCategories.map((category) => (
              <li key={category} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                {CATEGORY_LABELS[category]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
