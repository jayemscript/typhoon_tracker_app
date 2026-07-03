import { getActiveStorms } from "@/services/storm-service";
import { SectionHeader } from "@/components/shared/section-header";
import { StormList } from "@/components/storms/storm-list";

export async function ActiveStormsSection() {
  const storms = await getActiveStorms();

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Active Storms"
        description="Storms currently being tracked"
      />
      <StormList storms={storms} emptyMessage="No active storms right now." />
    </section>
  );
}
