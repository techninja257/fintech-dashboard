import { BookOpen, MessageCircle, Mail } from "lucide-react";
import { Panel } from "@/components/ui";

const FAQS = [
  {
    q: "How is my portfolio value calculated?",
    a: "We sum the live market value of every holding across crypto and livestock futures, updated in real time on the Overview page.",
  },
  {
    q: "Where do AI signals come from?",
    a: "Signals are generated from price momentum, volatility, and seasonality models, each shown with a confidence score.",
  },
  {
    q: "Can I trade directly from Verdant?",
    a: "Not yet. Verdant is an analytics dashboard today — trade execution via connected brokers is on the roadmap.",
  },
];

const CHANNELS = [
  { icon: BookOpen, title: "Documentation", desc: "Guides and API references", cta: "Browse docs" },
  { icon: MessageCircle, title: "Live chat", desc: "Typical reply in under 5 min", cta: "Start chat" },
  { icon: Mail, title: "Email us", desc: "support@verdant.io", cta: "Send email" },
];

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <Panel key={c.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{c.desc}</p>
              <button
                type="button"
                className="mt-4 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                {c.cta} →
              </button>
            </Panel>
          );
        })}
      </div>

      <Panel title="Frequently asked" subtitle="Quick answers to common questions">
        <div className="divide-y divide-black/[.05] dark:divide-white/[.05]">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {f.q}
                <span className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Panel>
    </div>
  );
}
