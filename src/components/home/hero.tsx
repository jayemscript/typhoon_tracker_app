import Link from "next/link";
import { ArrowRight, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="border-b bg-linear-to-b from-sky-50 to-background px-4 py-16 dark:from-sky-950/20 sm:py-24">
      <div className="container mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <CloudRain className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Track Typhoons in Real Time
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          Live storm tracks, forecast paths, and intensity data for the Western
          Pacific.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/map">
              View Live Map
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/storms">Browse All Storms</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
