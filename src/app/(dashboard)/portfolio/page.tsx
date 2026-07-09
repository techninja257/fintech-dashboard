import { HOLDINGS, STATS, formatUsd, formatUsdCompact } from "@/lib/data";
import { Panel, Change, AssetAvatar } from "@/components/ui";

export default function PortfolioPage() {
  const invested = HOLDINGS.reduce((sum, h) => sum + h.value, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Panel>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Value</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">{formatUsdCompact(invested)}</p>
        </Panel>
        <Panel>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Holdings</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">{HOLDINGS.length}</p>
        </Panel>
        <Panel>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">24h Change</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
            +{STATS.profitLossPct}%
          </p>
        </Panel>
      </div>

      <Panel title="Your Holdings" subtitle="Assets across crypto and livestock">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wider text-zinc-400 dark:border-white/[.06]">
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 text-right font-medium">Price</th>
                <th className="pb-3 text-right font-medium">Holdings</th>
                <th className="pb-3 text-right font-medium">Value</th>
                <th className="pb-3 text-right font-medium">24h</th>
                <th className="pb-3 text-right font-medium">Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[.05] dark:divide-white/[.05]">
              {HOLDINGS.map((h) => (
                <tr key={h.key}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <AssetAvatar symbol={h.symbol} />
                      <div className="leading-tight">
                        <span className="block font-medium">{h.symbol}</span>
                        <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                          {h.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-mono tabular-nums">{formatUsd(h.price)}</td>
                  <td className="py-4 text-right text-zinc-500 tabular-nums dark:text-zinc-400">
                    {h.amount}
                  </td>
                  <td className="py-4 text-right font-mono font-medium tabular-nums">
                    {formatUsdCompact(h.value)}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end">
                      <Change value={h.changePct} />
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-black/[.06] sm:block dark:bg-white/[.08]">
                        <span
                          className="block h-full rounded-full bg-emerald-500"
                          style={{ width: `${h.allocationPct}%` }}
                        />
                      </span>
                      <span className="w-9 tabular-nums text-zinc-500 dark:text-zinc-400">
                        {h.allocationPct}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
