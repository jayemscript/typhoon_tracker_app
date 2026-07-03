export const TECH_STACK = [
  {
    name: "Next.js 15",
    description: "App Router, Server Components, and streaming SSR",
  },
  {
    name: "TypeScript",
    description: "End-to-end type safety across the stack",
  },
  {
    name: "Tailwind CSS v4",
    description: "Utility-first styling with a consistent design system",
  },
  { name: "shadcn/ui", description: "Accessible, composable UI primitives" },
  {
    name: "MapLibre GL",
    description: "Open-source, GPU-accelerated interactive maps",
  },
  {
    name: "Zod",
    description: "Runtime schema validation for all storm and weather data",
  },
] as const;

export const DATA_SOURCES = [
  {
    name: "PAGASA",
    description:
      "Philippine Atmospheric, Geophysical and Astronomical Services Administration",
  },
  {
    name: "JMA",
    description:
      "Japan Meteorological Agency — regional tropical cyclone advisories",
  },
  {
    name: "NOAA / JTWC",
    description: "Joint Typhoon Warning Center track and intensity data",
  },
  { name: "Open-Meteo", description: "Free, open-source weather data API" },
  {
    name: "NASA Earthdata",
    description: "Satellite imagery for storm visualization",
  },
] as const;
