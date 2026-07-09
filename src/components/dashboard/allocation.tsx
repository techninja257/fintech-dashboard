import { ALLOCATION, formatUsdCompact } from "@/lib/data";

export function Allocation() {
  return (
    <div className="rounded-2xl border border-black/[.06] bg-white p-5 dark:border-white/[.06] dark:bg-zinc-900">
      <h2 className="text-base font-semibold">Asset Allocation</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Distribution across holdings</p>

      <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full">
        {ALLOCATION.map((a) => (
          <div
            key={a.key}
            style={{ width: `${a.pct}%`, backgroundColor: a.color }}
            title={`${a.name} · ${a.pct}%`}
          />
        ))}
      </div>

      <ul className="mt-5 divide-y divide-black/[.05] dark:divide-white/[.05]">
        {ALLOCATION.map((a) => (
          <li key={a.key} className="flex items-center justify-between py-3">
            <span className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: a.color }} />
              <span className="text-sm font-medium">{a.symbol}</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{a.name}</span>
            </span>
            <span className="flex items-center gap-4">
              <span className="font-mono text-sm tabular-nums">{formatUsdCompact(a.value)}</span>
              <span className="w-9 text-right text-sm text-zinc-500 tabular-nums dark:text-zinc-400">
                {a.pct}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
