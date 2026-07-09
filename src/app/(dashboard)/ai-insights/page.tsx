import { Sparkles, Target, History } from "lucide-react";
import { INSIGHTS, type Insight } from "@/lib/data";
import { Panel } from "@/components/ui";

const SENTIMENT: Record<Insight["sentiment"], { badge: string; bar: string }> = {
  Bullish: { badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  Neutral: { badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", bar: "bg-amber-400" },
  Bearish: { badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400", bar: "bg-rose-500" },
};

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Panel>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Active signals</span>
          </div>
          <p className="mt-2 text-3xl font-semibold tabular-nums">{INSIGHTS.length}</p>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Model accuracy</span>
          </div>
          <p className="mt-2 text-3xl font-semibold tabular-nums">78%</p>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Signals · 30d</span>
          </div>
          <p className="mt-2 text-3xl font-semibold tabular-nums">42</p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {INSIGHTS.map((insight) => {
          const s = SENTIMENT[insight.sentiment];
          return (
            <article
              key={insight.id}
              className="rounded-2xl border border-black/[.06] bg-white p-5 dark:border-white/[.06] dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.badge}`}>
                  {insight.sentiment}
                </span>
                <span className="text-xs text-zinc-400">{insight.tag}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug">{insight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {insight.body}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[.06] dark:bg-white/[.08]">
                  <div
                    className={`h-full rounded-full ${s.bar}`}
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
                  {insight.confidence}% confidence
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
