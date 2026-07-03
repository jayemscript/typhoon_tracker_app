import type { Position } from "geojson";

/**
 * Generates an approximate circular polygon (in GeoJSON coordinates)
 * around a center point, given a radius in kilometers.
 * Used for storm "cone of uncertainty" rendering.
 */
export function createGeoCircle(
  center: { lat: number; lng: number },
  radiusKm: number,
  points = 64,
): Position[] {
  const coords: Position[] = [];
  const distanceX =
    radiusKm / (111.32 * Math.cos((center.lat * Math.PI) / 180));
  const distanceY = radiusKm / 110.574;

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    coords.push([
      center.lng + distanceX * Math.cos(angle),
      center.lat + distanceY * Math.sin(angle),
    ]);
  }
  return coords;
}
