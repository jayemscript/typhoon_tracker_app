"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, CloudRain, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/storms", label: "Storms" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CloudRain className="h-5 w-5 text-primary" />
          <span>Typhoon Tracker</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          size="sm"
          variant="outline"
          className="hidden gap-1.5 md:inline-flex"
        >
          <Bell className="h-3.5 w-3.5" />
          Get Alerts
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-72 flex-col gap-0 p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle className="flex items-center gap-2 text-left text-base">
                <CloudRain className="h-5 w-5 text-primary" />
                Typhoon Tracker
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-1 flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            <div className="border-t p-4">
              <Button className="w-full gap-1.5">
                <Bell className="h-3.5 w-3.5" />
                Get Alerts
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
