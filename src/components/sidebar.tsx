"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Sparkles, X } from "lucide-react";
import { MENU, GENERAL, type NavItem } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = isActive(pathname, item.href);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
          : "text-zinc-600 hover:bg-black/[.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[.04] dark:hover:text-zinc-100"
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {item.label}
    </Link>
  );
}

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-black/[.06] bg-white transition-transform duration-200 dark:border-white/[.06] dark:bg-zinc-950 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
              <Leaf className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold leading-tight">Verdant</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                Asset Analytics
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1 text-zinc-500 hover:bg-black/[.04] dark:hover:bg-white/[.06] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Menu
          </p>
          <div className="flex flex-col gap-1">
            {MENU.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onClose} />
            ))}
          </div>

          <p className="px-3 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            General
          </p>
          <div className="flex flex-col gap-1">
            {GENERAL.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onClose} />
            ))}
          </div>
        </nav>

        <div className="m-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[.06] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Pro Insights
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Unlock real-time livestock futures and advanced AI signals.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Upgrade
          </button>
        </div>
      </aside>
    </>
  );
}
