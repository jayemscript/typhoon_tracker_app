import Link from "next/link";
import { ArrowRight, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <CloudRain className="h-7 w-7 text-primary" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Welcome to Typhoon Tracker
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Real-time tropical storm monitoring with interactive maps, forecast
            paths, and live intensity data.
          </p>
        </div>

        <Button asChild size="lg" className="mt-2 gap-2">
          <Link href="/map">
            View Storm Map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
