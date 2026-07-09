"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Search, Bell, Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is only known on the client — avoid a hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] text-zinc-600 transition-colors hover:bg-black/[.04] dark:border-white/[.1] dark:text-zinc-300 dark:hover:bg-white/[.06]"
    >
      {mounted ? (
        isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}

export function Topbar({
  title,
  subtitle,
  onMenu,
}: {
  title: string;
  subtitle?: string;
  onMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-black/[.06] bg-white/80 px-4 py-4 backdrop-blur-md dark:border-white/[.06] dark:bg-zinc-950/80 sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="rounded-md p-1.5 text-zinc-600 hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.06] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">{title}</h1>
        {subtitle && (
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          placeholder="Search assets…"
          className="w-56 rounded-full border border-black/[.08] bg-zinc-50 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 dark:border-white/[.1] dark:bg-zinc-900 lg:w-72"
        />
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] text-zinc-600 transition-colors hover:bg-black/[.04] dark:border-white/[.1] dark:text-zinc-300 dark:hover:bg-white/[.06]"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
      </button>

      <ThemeToggle />

      <div className="flex items-center gap-3 pl-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-semibold text-white">
          VA
        </span>
        <div className="hidden leading-tight sm:block">
          <span className="block text-sm font-semibold">Victor Anderson</span>
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">Pro Investor</span>
        </div>
      </div>
    </header>
  );
}
