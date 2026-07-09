"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

// Per-route header text. Keeps the topbar in sync without threading props
// through every page.
const TITLES: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Portfolio Overview", subtitle: "Crypto & Livestock · Updated just now" },
  "/portfolio": { title: "Portfolio", subtitle: "Your holdings and performance" },
  "/markets": { title: "Markets", subtitle: "Live crypto & commodity prices" },
  "/livestock": { title: "Livestock", subtitle: "Cattle & hog futures" },
  "/ai-insights": { title: "AI Insights", subtitle: "Signals generated from market data" },
  "/alerts": { title: "Alerts", subtitle: "Price and signal notifications" },
  "/settings": { title: "Settings", subtitle: "Manage your account and preferences" },
  "/support": { title: "Support", subtitle: "Help and resources" },
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const header = TITLES[pathname] ?? { title: "Verdant", subtitle: "" };

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <Topbar title={header.title} subtitle={header.subtitle} onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
