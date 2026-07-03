import { Skeleton } from "@/components/ui/skeleton";

interface CardsSkeletonProps {
  count?: number;
}

export function CardsSkeleton({ count = 3 }: CardsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-lg" />
      ))}
    </div>
  );
}
