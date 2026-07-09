"use client";

import { useEffect, useState } from "react";
import { Bitcoin, Radio, Beef, Sprout, TrendingUp } from "lucide-react";
import { INSTRUMENTS, type Instrument } from "@/lib/data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  btc: Bitcoin,
  eth: Radio,
  lct: Beef,
  lhg: Sprout,
};

function MarketCard({ instrument }: { instrument: Instrument }) {
  const Icon = ICONS[instrument.key] ?? Radio;
  const up = instrument.changePct >= 0;
  return (
    <div className="rounded-2xl border border-black/[.06] bg-white p-5 dark:border-white/[.06] dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Icon className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-semibold">{instrument.symbol}</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              {instrument.name}
            </span>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-sm font-medium ${
            up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          }`}
        >
          <TrendingUp className={`h-3.5 w-3.5 ${up ? "" : "rotate-180"}`} />
          {up ? "+" : ""}
          {instrument.changePct.toFixed(2)}%
        </span>
      </div>
      <p className="mt-4 font-mono text-2xl font-semibold tabular-nums">
        {instrument.category === "Livestock"
          ? instrument.price.toFixed(2)
          : instrument.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        {instrument.unit && (
          <span className="ml-1 text-sm font-normal text-zinc-400">{instrument.unit}</span>
        )}
      </p>
    </div>
  );
}

export function LiveMarkets() {
  const [instruments, setInstruments] = useState<Instrument[]>(INSTRUMENTS);

  // Simulate real-time market ticks every 3s.
  useEffect(() => {
    const interval = setInterval(() => {
      setInstruments((prev) =>
        prev.map((i) => {
          const delta = (Math.random() * 2 - 1) * i.volatility;
          const price = Math.max(0, i.price + delta);
          // Nudge the reported 24h change in the drift's direction.
          const changePct = i.changePct + (delta / Math.max(i.price, 1)) * 100;
          return { ...i, price, changePct };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Live Markets</h2>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {instruments.map((i) => (
          <MarketCard key={i.key} instrument={i} />
        ))}
      </div>
    </section>
  );
}
