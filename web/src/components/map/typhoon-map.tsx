"use client";

import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import type { Storm } from "@/types/storm";

interface TyphoonMapProps {
  storms: Storm[];
}

const CATEGORY_COLORS: Record<string, string> = {
  "tropical-depression": "#60a5fa",
  "tropical-storm": "#facc15",
  "severe-tropical-storm": "#fb923c",
  typhoon: "#f87171",
  "super-typhoon": "#c026d3",
};

function createStormIcon(color: string) {
  return L.divIcon({
    className: "storm-marker",
    html: `<span style="
      display:block;width:16px;height:16px;border-radius:9999px;
      background:${color};border:2px solid white;
      box-shadow:0 0 0 2px ${color}66;
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

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {storms.map((storm) => {
        const color = CATEGORY_COLORS[storm.category];
        const trackPositions: [number, number][] = storm.track.map((p) => [
          p.position.lat,
          p.position.lng,
        ]);
        const forecastStart = storm.track.findIndex((p) => p.isForecast);

        return (
          <div key={storm.id}>
            {/* Historical track (solid) */}
            <Polyline
              positions={
                forecastStart === -1
                  ? trackPositions
                  : trackPositions.slice(0, forecastStart + 1)
              }
              pathOptions={{ color, weight: 3 }}
            />

            {/* Forecast track (dashed) */}
            {forecastStart !== -1 && (
              <Polyline
                positions={trackPositions.slice(forecastStart)}
                pathOptions={{ color, weight: 3, dashArray: "6 8" }}
              />
            )}

            {/* Cone of uncertainty around current position */}
            {storm.radiusOfUncertaintyKm && (
              <Circle
                center={[storm.currentPosition.lat, storm.currentPosition.lng]}
                radius={storm.radiusOfUncertaintyKm * 1000}
                pathOptions={{ color, fillOpacity: 0.08, weight: 1 }}
              />
            )}

            <Marker
              position={[storm.currentPosition.lat, storm.currentPosition.lng]}
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
  );
}
