"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import { PERFORMANCE, formatUsdCompact } from "@/lib/data";

const RANGES = { "7D": 7, "30D": 30, "90D": 30 } as const;
type Range = keyof typeof RANGES;

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const portfolio = Number(payload.find((p) => p.dataKey === "portfolio")?.value ?? 0);
  const benchmark = Number(payload.find((p) => p.dataKey === "benchmark")?.value ?? 0);
  return (
    <div className="rounded-xl border border-black/[.08] bg-white/95 px-4 py-3 text-sm shadow-lg backdrop-blur dark:border-white/[.1] dark:bg-zinc-800/95">
      <p className="mb-2 font-medium">{label}</p>
      <div className="flex items-center justify-between gap-6">
        <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Benchmark
        </span>
        <span className="font-mono font-medium tabular-nums">{formatUsdCompact(benchmark)}</span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-6">
        <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Portfolio
        </span>
        <span className="font-mono font-medium tabular-nums">{formatUsdCompact(portfolio)}</span>
      </div>
    </div>
  );
}

export function PerformanceChart() {
  const [range, setRange] = useState<Range>("30D");
  const data = PERFORMANCE.slice(-RANGES[range]);
  const latest = data[data.length - 1];
  const first = data[0];
  const changePct =
    first && latest ? ((latest.portfolio - first.portfolio) / first.portfolio) * 100 : 0;

  return (
    <div className="rounded-2xl border border-black/[.06] bg-white p-5 dark:border-white/[.06] dark:bg-zinc-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Portfolio Performance</h2>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums">
              {formatUsdCompact(latest?.portfolio ?? 0)}
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              +{changePct.toFixed(2)}%
            </span>
          </p>
        </div>
        <div className="flex rounded-lg border border-black/[.08] p-0.5 dark:border-white/[.1]">
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                range === r
                  ? "bg-emerald-500 text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-black/[.06] dark:text-white/[.08]" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              minTickGap={40}
              tick={{ fontSize: 12, fill: "currentColor" }}
              className="text-zinc-400"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v: number) => `$${Math.round(v / 1000)}k`}
              tick={{ fontSize: 12, fill: "currentColor" }}
              className="text-zinc-400"
            />
            <Tooltip content={CustomTooltip} cursor={{ stroke: "#34d399", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#portfolioFill)"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-5 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded bg-emerald-500" /> Portfolio
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded bg-amber-400" /> Benchmark
        </span>
      </div>
    </div>
  );
}
