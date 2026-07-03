import Link from "next/link";
import { CloudRain } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/storms", label: "Storms" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-primary" />
          <span className="font-semibold">Typhoon Tracker</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-muted-foreground">
            Data shown is for demonstration purposes only and should not be used
            for emergency decision-making. Always refer to your local
            meteorological agency for official advisories.
          </p>
        </div>
      </div>
    </footer>
  );
}
