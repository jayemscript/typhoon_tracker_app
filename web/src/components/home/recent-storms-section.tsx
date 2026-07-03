import { getAllStorms } from "@/services/storm-service";
import { SectionHeader } from "@/components/shared/section-header";
import { StormList } from "@/components/storms/storm-list";

export async function RecentStormsSection() {
  const storms = await getAllStorms();
  const recent = storms.filter((s) => !s.isActive).slice(0, 6);

  return (
    <section className="container mx-auto flex flex-col gap-4 px-4 py-10">
      <SectionHeader
        title="Recent Storms"
        description="Past storms tracked this season"
        href="/storms"
        hrefLabel="View all storms"
      />
      <StormList storms={recent} emptyMessage="No recent storm history yet." />
    </section>
  );
}
