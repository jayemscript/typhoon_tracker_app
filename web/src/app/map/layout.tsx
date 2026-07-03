export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-[calc(100dvh-3.5rem)] w-full">{children}</div>;
}
