import { getActiveStorms } from "@/services/storm-service";
import { SectionHeader } from "@/components/shared/section-header";
import { StormCard } from "@/components/storm/storm-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getStormSeverityRank } from "@/lib/constants/storm";

export async function FeaturedStormSection() {
  const activeStorms = await getActiveStorms();
  const featured = [...activeStorms].sort(
    (a, b) =>
      getStormSeverityRank(b.category) - getStormSeverityRank(a.category),
  )[0];

  return (
    <section className="container mx-auto flex flex-col gap-4 px-4 py-10">
      <SectionHeader
        title="Active Typhoon"
        description="The most severe storm currently being tracked"
      />
      {featured ? (
        <StormCard storm={featured} variant="featured" />
      ) : (
        <EmptyState message="No active storms right now — check back later." />
      )}
    </section>
  );
}
