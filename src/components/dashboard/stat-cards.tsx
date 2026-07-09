import { Wallet, TrendingUp, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import { STATS, formatUsdCompact } from "@/lib/data";

function Delta({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        up
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      }`}
    >
      <TrendingUp className={`h-3 w-3 ${up ? "" : "rotate-180"}`} />
      {up ? "+" : ""}
      {value}%
    </span>
  );
}

function Card({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/[.06] bg-white p-5 dark:border-white/[.06] dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
          {icon}
        </span>
      </div>
      {children}
    </div>
  );
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card icon={<Wallet className="h-5 w-5" />} label="Total Balance">
        <p className="mt-3 text-3xl font-semibold tabular-nums">
          {formatUsdCompact(STATS.totalBalance)}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Delta value={STATS.balanceChangePct} /> vs last week
        </div>
      </Card>

      <Card icon={<TrendingUp className="h-5 w-5" />} label="24h Profit / Loss">
        <p className="mt-3 text-3xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
          +{formatUsdCompact(STATS.profitLoss)}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Delta value={STATS.profitLossPct} /> last 24 hours
        </div>
      </Card>

      <Card icon={<Layers className="h-5 w-5" />} label="Active Holdings">
        <p className="mt-3 text-3xl font-semibold tabular-nums">{STATS.activeHoldings}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {STATS.cryptoCount} Crypto
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {STATS.livestockCount} Livestock
          </span>
        </div>
      </Card>

      <Card icon={<Sparkles className="h-5 w-5" />} label="AI Insight Alert">
        <p className="mt-3 text-sm font-medium leading-snug">
          Cattle futures turning bullish — review allocation.
        </p>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
        >
          View 3 new insights <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </Card>
    </div>
  );
}
