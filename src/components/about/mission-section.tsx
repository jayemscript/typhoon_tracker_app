import { CloudRain } from "lucide-react";

export function MissionSection() {
  return (
    <section className="border-b bg-linear-to-b from-sky-50 to-background px-4 py-16 dark:from-sky-950/20 sm:py-20">
      <div className="container mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <CloudRain className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About Typhoon Tracker
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Typhoon Tracker is an open storm monitoring platform built to make
          tropical cyclone data clear, accessible, and easy to follow — from
          first formation to landfall.
        </p>
      </div>
    </section>
  );
}
