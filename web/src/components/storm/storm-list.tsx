import { StormCard } from "@/components/storm/storm-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Storm } from "@/types/storm";

interface StormListProps {
  storms: Storm[];
  emptyMessage?: string;
}

export function StormList({
  storms,
  emptyMessage = "No storms to display right now.",
}: StormListProps) {
  if (storms.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {storms.map((storm) => (
        <StormCard key={storm.id} storm={storm} />
      ))}
    </div>
  );
}
