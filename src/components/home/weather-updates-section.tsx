import { getLatestWeatherUpdates } from "@/services/weather-service";
import { SectionHeader } from "@/components/shared/section-header";
import { WeatherCard } from "@/components/weather/weather-card";

export async function WeatherUpdatesSection() {
  const updates = await getLatestWeatherUpdates();

  return (
    <section className="container mx-auto flex flex-col gap-4 px-4 py-10">
      <SectionHeader
        title="Latest Weather Updates"
        description="Conditions across monitored regions"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {updates.map((update) => (
          <WeatherCard key={update.id} update={update} />
        ))}
      </div>
    </section>
  );
}
