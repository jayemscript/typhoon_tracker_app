import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedStormSection } from "@/components/home/featured-storm-section";
import { WeatherUpdatesSection } from "@/components/home/weather-updates-section";
import { RecentStormsSection } from "@/components/home/recent-storms-section";
import { MapPreview } from "@/components/map/map-preview";
import { SectionHeader } from "@/components/shared/section-header";
import { Footer } from "@/components/layout/footer";

export const revalidate = 300;

function StatsSkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 px-4 py-8 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ))}
    </div>
  );
}

function CardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<CardsSkeleton count={1} />}>
        <FeaturedStormSection />
      </Suspense>

      <Suspense fallback={<CardsSkeleton count={4} />}>
        <WeatherUpdatesSection />
      </Suspense>

      <section className="container mx-auto flex flex-col gap-4 px-4 py-10">
        <SectionHeader
          title="Storm Map"
          description="See where every tracked storm is right now"
          href="/map"
          hrefLabel="Open full map"
        />
        <MapPreview />
      </section>

      <Suspense fallback={<CardsSkeleton count={6} />}>
        <RecentStormsSection />
      </Suspense>

      <Footer />
    </>
  );
}
