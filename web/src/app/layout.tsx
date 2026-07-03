import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Navbar } from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Typhoon Tracker — Live Storm Monitoring",
    template: "%s | Typhoon Tracker",
  },
  description:
    "Real-time typhoon and tropical storm tracking with interactive maps, forecast paths, and storm intensity data.",
  keywords: [
    "typhoon tracker",
    "tropical storm",
    "storm tracking",
    "PAGASA",
    "weather map",
  ],
  authors: [{ name: "Typhoon Tracker" }],
  openGraph: {
    title: "Typhoon Tracker — Live Storm Monitoring",
    description:
      "Real-time typhoon and tropical storm tracking with interactive maps and forecast paths.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typhoon Tracker",
    description: "Real-time typhoon and tropical storm tracking.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
