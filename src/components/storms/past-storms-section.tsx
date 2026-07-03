import { getAllStorms } from "@/services/storm-service";
import { SectionHeader } from "@/components/shared/section-header";
import { StormList } from "@/components/storms/storm-list";

export async function PastStormsSection() {
  const storms = await getAllStorms();
  const pastStorms = storms.filter((s) => !s.isActive);

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Recent & Past Storms"
        description="Storms tracked earlier this season"
      />
      <StormList
        storms={pastStorms}
        emptyMessage="No past storm history yet."
      />
    </section>
  );
}
