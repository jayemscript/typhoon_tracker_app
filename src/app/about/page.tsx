import type { Metadata } from "next";
import { MissionSection } from "@/components/about/mission-section";
import { HowItWorksSection } from "@/components/about/how-it-works-section";
import { TechStackSection } from "@/components/about/tech-stack-section";
import { DataSourcesSection } from "@/components/about/data-sources-section";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Typhoon Tracker works, the technology behind it, and planned data source integrations.",
};

export default function AboutPage() {
  return (
    <>
      <MissionSection />
      <HowItWorksSection />
      <TechStackSection />
      <DataSourcesSection />
      <Footer />
    </>
  );
}
