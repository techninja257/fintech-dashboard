"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { INSTRUMENTS } from "@/lib/data";
import { Panel, Change, AssetAvatar } from "@/components/ui";

const FILTERS = ["All", "Crypto", "Livestock"] as const;
type Filter = (typeof FILTERS)[number];

export default function MarketsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INSTRUMENTS.filter((i) => {
      const matchesFilter = filter === "All" || i.category === filter;
      const matchesQuery =
        !q || i.name.toLowerCase().includes(q) || i.symbol.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <Panel title="Markets" subtitle="Live crypto & commodity prices">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets…"
            className="w-full rounded-full border border-black/[.08] bg-zinc-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 dark:border-white/[.1] dark:bg-zinc-900 sm:w-64"
          />
        </div>
        <div className="flex rounded-lg border border-black/[.08] p-0.5 dark:border-white/[.1]">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-emerald-500 text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wider text-zinc-400 dark:border-white/[.06]">
              <th className="pb-3 font-medium">Market</th>
              <th className="pb-3 text-right font-medium">Price</th>
              <th className="pb-3 text-right font-medium">24h</th>
              <th className="pb-3 text-right font-medium">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[.05] dark:divide-white/[.05]">
            {rows.map((i) => (
              <tr key={i.key}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <AssetAvatar symbol={i.symbol} />
                    <div className="leading-tight">
                      <span className="block font-medium">{i.symbol}</span>
                      <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                        {i.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right font-mono tabular-nums">
                  {i.category === "Livestock"
                    ? `${i.price.toFixed(2)}${i.unit ?? ""}`
                    : i.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </td>
                <td className="py-4 text-right">
                  <div className="flex justify-end">
                    <Change value={i.changePct} />
                  </div>
                </td>
                <td className="py-4 text-right">
                  <span className="rounded-full bg-black/[.04] px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[.06] dark:text-zinc-300">
                    {i.category}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No markets match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
