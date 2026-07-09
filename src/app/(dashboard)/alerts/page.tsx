"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { ALERTS, type Alert } from "@/lib/data";
import { Panel, AssetAvatar } from "@/components/ui";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);

  const toggle = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));

  const activeCount = alerts.filter((a) => a.enabled).length;

  return (
    <Panel
      title="Alerts"
      subtitle={`${activeCount} of ${alerts.length} enabled`}
      action={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          <Bell className="h-4 w-4" /> New Alert
        </button>
      }
    >
      <ul className="divide-y divide-black/[.05] dark:divide-white/[.05]">
        {alerts.map((a) => (
          <li key={a.id} className="flex items-center gap-4 py-4">
            <AssetAvatar symbol={a.symbol} />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="font-medium">
                {a.condition} <span className="text-emerald-600 dark:text-emerald-400">{a.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{a.symbol}</p>
            </div>
            <span
              className={`hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline ${
                a.status === "Triggered"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-black/[.04] text-zinc-500 dark:bg-white/[.06] dark:text-zinc-400"
              }`}
            >
              {a.status}
            </span>
            <Toggle on={a.enabled} onToggle={() => toggle(a.id)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
