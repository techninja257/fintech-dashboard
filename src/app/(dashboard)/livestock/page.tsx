import { Beef, Sprout } from "lucide-react";
import { FUTURES } from "@/lib/data";
import { Panel, Change } from "@/components/ui";

export default function LivestockPage() {
  const cattle = FUTURES.find((f) => f.key === "lct-aug")!;
  const hogs = FUTURES.find((f) => f.key === "lhg-aug")!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { c: cattle, icon: Beef, label: "Live Cattle · front month" },
          { c: hogs, icon: Sprout, label: "Lean Hogs · front month" },
        ].map(({ c, icon: Icon, label }) => (
          <Panel key={c.key}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Icon className="h-6 w-6" />
              </span>
              <div className="leading-tight">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="font-mono text-3xl font-semibold tabular-nums">
                {c.price.toFixed(2)}
                <span className="ml-1 text-sm font-normal text-zinc-400">¢/lb</span>
              </p>
              <Change value={c.changePct} />
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Futures Curve" subtitle="Open contracts across expiries">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wider text-zinc-400 dark:border-white/[.06]">
                <th className="pb-3 font-medium">Contract</th>
                <th className="pb-3 font-medium">Expiry</th>
                <th className="pb-3 text-right font-medium">Price</th>
                <th className="pb-3 text-right font-medium">Change</th>
                <th className="pb-3 text-right font-medium">Open Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[.05] dark:divide-white/[.05]">
              {FUTURES.map((f) => (
                <tr key={f.key}>
                  <td className="py-4">
                    <span className="font-medium">{f.symbol}</span>
                    <span className="ml-2 text-zinc-500 dark:text-zinc-400">{f.name}</span>
                  </td>
                  <td className="py-4 text-zinc-500 dark:text-zinc-400">{f.expiry}</td>
                  <td className="py-4 text-right font-mono tabular-nums">{f.price.toFixed(2)}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end">
                      <Change value={f.changePct} />
                    </div>
                  </td>
                  <td className="py-4 text-right tabular-nums text-zinc-500 dark:text-zinc-400">
                    {f.openInterest}
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
