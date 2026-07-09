"use client";

import { useState } from "react";
import { Panel } from "@/components/ui";

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

const inputClass =
  "w-full rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-white/[.1] dark:bg-zinc-950";

export default function SettingsPage() {
  const [name, setName] = useState("Victor Anderson");
  const [email, setEmail] = useState("victor@verdant.io");
  const [prefs, setPrefs] = useState({
    priceAlerts: true,
    aiSignals: true,
    weeklyDigest: false,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Panel title="Profile" subtitle="Your account details">
        <div className="mb-5 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-lg font-semibold text-white">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <div className="leading-tight">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Pro Investor</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Full name</span>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="mt-1 self-start rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Save changes
          </button>
        </div>
      </Panel>

      <Panel title="Notifications" subtitle="Choose what you hear about">
        <ul className="flex flex-col gap-1">
          {[
            { key: "priceAlerts" as const, label: "Price alerts", desc: "Get notified when a target is hit" },
            { key: "aiSignals" as const, label: "AI signals", desc: "New bullish/bearish insights" },
            { key: "weeklyDigest" as const, label: "Weekly digest", desc: "A summary email every Monday" },
          ].map((row) => (
            <li key={row.key} className="flex items-center justify-between py-3">
              <div className="leading-tight">
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{row.desc}</p>
              </div>
              <Toggle on={prefs[row.key]} onToggle={() => toggle(row.key)} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
