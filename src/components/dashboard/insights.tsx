import { Sparkles, TrendingUp, Minus } from "lucide-react";
import { INSIGHTS, type Insight } from "@/lib/data";

const SENTIMENT: Record<
  Insight["sentiment"],
  { text: string; bar: string; badge: string; icon: React.ReactNode }
> = {
  Bullish: {
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: <TrendingUp className="h-3 w-3" />,
  },
  Neutral: {
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: <Minus className="h-3 w-3" />,
  },
  Bearish: {
    text: "text-rose-600 dark:text-rose-400",
    bar: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    icon: <TrendingUp className="h-3 w-3 rotate-180" />,
  },
};

function InsightCard({ insight }: { insight: Insight }) {
  const s = SENTIMENT[insight.sentiment];
  return (
    <article className="rounded-xl border border-black/[.06] bg-zinc-50/60 p-4 dark:border-white/[.06] dark:bg-zinc-950/40">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.badge}`}
        >
          {s.icon}
          {insight.sentiment}
        </span>
        <span className="text-xs text-zinc-400">{insight.tag}</span>
      </div>
      <h3 className="mt-2.5 text-sm font-semibold leading-snug">{insight.title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        {insight.body}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[.06] dark:bg-white/[.08]">
          <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${insight.confidence}%` }} />
        </div>
        <span className="text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
          {insight.confidence}%
        </span>
      </div>
    </article>
  );
}

export function Insights() {
  return (
    <div className="rounded-2xl border border-black/[.06] bg-white p-5 dark:border-white/[.06] dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <h2 className="text-base font-semibold">AI Insights</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Generated from market signals
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          3 new
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {INSIGHTS.map((i) => (
          <InsightCard key={i.id} insight={i} />
        ))}
      </div>
    </div>
  );
}
