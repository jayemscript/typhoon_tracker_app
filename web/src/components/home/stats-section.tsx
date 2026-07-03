import { Activity, Wind, MapPin, Radar } from "lucide-react";
import { getAllStorms } from "@/services/storm-service";
import { getLatestWeatherUpdates } from "@/services/weather-service";
import { StatCard } from "@/components/shared/stat-card";

export async function StatsSection() {
  const [storms, weatherUpdates] = await Promise.all([
    getAllStorms(),
    getLatestWeatherUpdates(),
  ]);
  const activeStorms = storms.filter((s) => s.isActive);
  const avgWindSpeed = activeStorms.length
    ? Math.round(
        activeStorms.reduce((sum, s) => sum + s.windSpeedKph, 0) /
          activeStorms.length,
      )
    : 0;

  return (
    <section className="container mx-auto grid grid-cols-2 gap-4 px-4 py-8 lg:grid-cols-4">
      <StatCard
        icon={Activity}
        label="Active Storms"
        value={String(activeStorms.length)}
      />
      <StatCard
        icon={Radar}
        label="Storms Tracked"
        value={String(storms.length)}
      />
      <StatCard
        icon={Wind}
        label="Avg. Wind Speed"
        value={activeStorms.length ? `${avgWindSpeed} km/h` : "—"}
      />
      <StatCard
        icon={MapPin}
        label="Regions Monitored"
        value={String(weatherUpdates.length)}
      />
    </section>
  );
}
