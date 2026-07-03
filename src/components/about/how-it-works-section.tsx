import { Database, Cpu, Radar } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const STEPS = [
  {
    icon: Database,
    title: "Data Sources",
    description:
      "Storm positions, intensity, and forecast tracks are pulled from meteorological agencies.",
  },
  {
    icon: Cpu,
    title: "Processing",
    description:
      "Data is validated, normalized, and cached at the service layer before reaching the UI.",
  },
  {
    icon: Radar,
    title: "Live Tracking",
    description:
      "Storms are visualized on an interactive map with forecast paths and uncertainty cones.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-12">
      <SectionHeader
        title="How It Works"
        description="From raw data to the map you see"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="flex flex-col gap-3 rounded-lg border p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <step.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
