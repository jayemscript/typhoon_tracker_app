"use client";

import { useMemo, useState } from "react";
import Map, {
  Source,
  Layer,
  Marker,
  Popup,
  NavigationControl,
  type LayerProps,
} from "react-map-gl/maplibre";
import type { FeatureCollection, LineString, Polygon } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { createGeoCircle } from "@/lib/geo";
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

// Free, keyless, open-source vector tile style — no Mapbox account needed.
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const trackLayerStyle: LayerProps = {
  id: "storm-track",
  type: "line",
  layout: { "line-join": "round", "line-cap": "round" },
  paint: {
    "line-color": ["get", "color"],
    "line-width": 3,
    "line-dasharray": [
      "case",
      ["get", "isForecast"],
      ["literal", [2, 2]],
      ["literal", [1, 0]],
    ],
  },
};

const uncertaintyLayerStyle: LayerProps = {
  id: "storm-uncertainty",
  type: "fill",
  paint: {
    "fill-color": ["get", "color"],
    "fill-opacity": 0.08,
  },
};

export function TyphoonMap({ storms }: TyphoonMapProps) {
  const [activeStormId, setActiveStormId] = useState<string | null>(null);

  const initialView = useMemo(() => {
    const active = storms.find((s) => s.isActive);
    const center = active?.currentPosition ?? { lat: 15, lng: 125 };
    return { longitude: center.lng, latitude: center.lat, zoom: 5 };
  }, [storms]);

  const activeCategories = useMemo(
    () => Array.from(new Set(storms.map((s) => s.category))),
    [storms],
  );

  const trackGeoJson: FeatureCollection<LineString> = useMemo(
    () => ({
      type: "FeatureCollection",
      features: storms.flatMap((storm) => {
        const color = CATEGORY_COLORS[storm.category];
        const forecastStart = storm.track.findIndex((p) => p.isForecast);
        const coords = storm.track.map((p) => [p.position.lng, p.position.lat]);

        const historical = {
          type: "Feature" as const,
          properties: { color, isForecast: false },
          geometry: {
            type: "LineString" as const,
            coordinates:
              forecastStart === -1
                ? coords
                : coords.slice(0, forecastStart + 1),
          },
        };

        if (forecastStart === -1) return [historical];

        const forecast = {
          type: "Feature" as const,
          properties: { color, isForecast: true },
          geometry: {
            type: "LineString" as const,
            coordinates: coords.slice(forecastStart),
          },
        };

        return [historical, forecast];
      }),
    }),
    [storms],
  );

  const uncertaintyGeoJson: FeatureCollection<Polygon> = useMemo(
    () => ({
      type: "FeatureCollection",
      features: storms
        .filter((s) => s.radiusOfUncertaintyKm)
        .map((storm) => ({
          type: "Feature" as const,
          properties: { color: CATEGORY_COLORS[storm.category] },
          geometry: {
            type: "Polygon" as const,
            coordinates: [
              createGeoCircle(
                storm.currentPosition,
                storm.radiusOfUncertaintyKm!,
              ),
            ],
          },
        })),
    }),
    [storms],
  );

  const activeStorm = storms.find((s) => s.id === activeStormId) ?? null;

  return (
    <div className="relative h-full w-full">
      <Map
        initialViewState={initialView}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="bottom-right" />

        <Source
          id="storm-uncertainty-src"
          type="geojson"
          data={uncertaintyGeoJson}
        >
          <Layer {...uncertaintyLayerStyle} />
        </Source>

        <Source id="storm-track-src" type="geojson" data={trackGeoJson}>
          <Layer {...trackLayerStyle} />
        </Source>

        {storms.map((storm) => {
          const color = CATEGORY_COLORS[storm.category];
          return (
            <Marker
              key={storm.id}
              longitude={storm.currentPosition.lng}
              latitude={storm.currentPosition.lat}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setActiveStormId(storm.id);
              }}
            >
              <span
                className="block h-4 w-4 cursor-pointer rounded-full border-2 border-white"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 0 2px ${color}66, 0 2px 6px rgba(0,0,0,0.35)`,
                }}
              />
            </Marker>
          );
        })}

        {activeStorm && (
          <Popup
            longitude={activeStorm.currentPosition.lng}
            latitude={activeStorm.currentPosition.lat}
            onClose={() => setActiveStormId(null)}
            closeOnClick={false}
            offset={12}
          >
            <div className="text-sm">
              <p className="font-semibold">{activeStorm.name}</p>
              <p className="capitalize text-muted-foreground">
                {activeStorm.category.replace(/-/g, " ")}
              </p>
              <p>{activeStorm.windSpeedKph} km/h winds</p>
              <p>{activeStorm.pressureHpa} hPa</p>
            </div>
          </Popup>
        )}
      </Map>

      <div className="pointer-events-none absolute bottom-4 left-4 z-10">
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
