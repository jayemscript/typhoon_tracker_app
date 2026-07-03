import { Suspense } from "react";
import type { Metadata } from "next";
import { CardsSkeleton } from "@/components/shared/cards-skeleton";
import { ActiveStormsSection } from "@/components/storms/active-storms-section";
import { PastStormsSection } from "@/components/storms/past-storms-section";
import { Footer } from "@/components/layout/footer";
import { getAllStorms } from "@/services/storm-service";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Storms",
  description: "Browse all currently tracked and past tropical storms.",
};

export default async function StormsPage() {
  const storms = await getAllStorms();

  return (
    <>
      <div className="border-b bg-muted/30 px-4 py-10">
        <div className="container mx-auto flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            All Storms
          </h1>
          <p className="text-sm text-muted-foreground">
            {storms.length} storm{storms.length === 1 ? "" : "s"} tracked this
            season
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-10 px-4 py-10">
        <Suspense fallback={<CardsSkeleton count={3} />}>
          <ActiveStormsSection />
        </Suspense>

        <Suspense fallback={<CardsSkeleton count={6} />}>
          <PastStormsSection />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}
