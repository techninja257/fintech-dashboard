// Simulated data for the Verdant dashboard. No backend — realistic mock values
// plus a small tick simulator for the live-markets strip.

export type Instrument = {
  key: string;
  symbol: string;
  name: string;
  category: "Crypto" | "Livestock";
  price: number;
  changePct: number; // 24h percentage change
  unit?: string; // e.g. "¢/lb" for livestock
  volatility: number; // max absolute per-tick drift
};

export const INSTRUMENTS: Instrument[] = [
  { key: "btc", symbol: "BTC", name: "Bitcoin", category: "Crypto", price: 68301.58, changePct: 2.65, volatility: 45 },
  { key: "eth", symbol: "ETH", name: "Ethereum", category: "Crypto", price: 3562.02, changePct: -1.13, volatility: 6 },
  { key: "lct", symbol: "LCT", name: "Live Cattle", category: "Livestock", price: 188.54, changePct: 1.41, unit: "¢/lb", volatility: 0.4 },
  { key: "lhg", symbol: "LHG", name: "Lean Hogs", category: "Livestock", price: 92.35, changePct: -0.59, unit: "¢/lb", volatility: 0.25 },
];

export const STATS = {
  totalBalance: 234843,
  balanceChangePct: 3.12,
  profitLoss: 4218,
  profitLossPct: 1.83,
  activeHoldings: 5,
  cryptoCount: 3,
  livestockCount: 2,
};

export type Allocation = {
  key: string;
  symbol: string;
  name: string;
  value: number;
  pct: number;
  color: string;
};

export const ALLOCATION: Allocation[] = [
  { key: "btc", symbol: "BTC", name: "Bitcoin", value: 79832, pct: 34, color: "#34d399" },
  { key: "eth", symbol: "ETH", name: "Ethereum", value: 49321, pct: 21, color: "#6ee7b7" },
  { key: "lct", symbol: "LCT", name: "Live Cattle", value: 42277, pct: 18, color: "#a7f3d0" },
  { key: "sol", symbol: "SOL", name: "Solana", value: 37575, pct: 16, color: "#fbbf24" },
  { key: "lhg", symbol: "LHG", name: "Lean Hogs", value: 25838, pct: 11, color: "#38bdf8" },
];

export type Insight = {
  id: string;
  sentiment: "Bullish" | "Neutral" | "Bearish";
  tag: string;
  title: string;
  body: string;
  confidence: number;
};

export const INSIGHTS: Insight[] = [
  {
    id: "cattle-bull",
    sentiment: "Bullish",
    tag: "Livestock",
    title: "Cattle futures signaling a bullish run",
    body: "Live Cattle (LCT) shows a bullish trend as rising feed costs tighten supply. Consider increasing exposure by 3–5% over the next quarter.",
    confidence: 82,
  },
  {
    id: "eth-rebalance",
    sentiment: "Neutral",
    tag: "Crypto",
    title: "Rebalance your ETH profits",
    body: "Ethereum is up 14% this month, pushing allocation above target. Trimming ~4% would lock in gains and reduce concentration risk.",
    confidence: 74,
  },
  {
    id: "hogs-bear",
    sentiment: "Bearish",
    tag: "Livestock",
    title: "Lean Hogs facing near-term pressure",
    body: "Seasonal demand softening suggests short-term weakness in Lean Hogs (LHG). Hold current position and reassess after the next USDA report.",
    confidence: 67,
  },
];

// Portfolio performance series (30 days), portfolio vs. benchmark, in USD.
export type PerfPoint = { date: string; portfolio: number; benchmark: number };

export const PERFORMANCE: PerfPoint[] = (() => {
  const points: PerfPoint[] = [];
  let portfolio = 205000;
  let benchmark = 208000;
  const start = new Date("2026-06-10");
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    // Deterministic-ish gentle upward drift so the build output is stable.
    portfolio += Math.sin(i / 3) * 900 + 700;
    benchmark += Math.sin(i / 4 + 1) * 700 + 500;
    points.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      portfolio: Math.round(portfolio),
      benchmark: Math.round(benchmark),
    });
  }
  return points;
})();

export type Holding = {
  key: string;
  symbol: string;
  name: string;
  category: "Crypto" | "Livestock";
  amount: string; // human-readable quantity, e.g. "1.17 BTC"
  price: number;
  value: number;
  changePct: number;
  allocationPct: number;
};

export const HOLDINGS: Holding[] = [
  { key: "btc", symbol: "BTC", name: "Bitcoin", category: "Crypto", amount: "1.169 BTC", price: 68301.58, value: 79832, changePct: 2.65, allocationPct: 34 },
  { key: "eth", symbol: "ETH", name: "Ethereum", category: "Crypto", amount: "13.84 ETH", price: 3562.02, value: 49321, changePct: -1.13, allocationPct: 21 },
  { key: "lct", symbol: "LCT", name: "Live Cattle", category: "Livestock", amount: "2 contracts", price: 188.54, value: 42277, changePct: 1.41, allocationPct: 18 },
  { key: "sol", symbol: "SOL", name: "Solana", category: "Crypto", amount: "214.2 SOL", price: 175.4, value: 37575, changePct: 4.02, allocationPct: 16 },
  { key: "lhg", symbol: "LHG", name: "Lean Hogs", category: "Livestock", amount: "1 contract", price: 92.35, value: 25838, changePct: -0.59, allocationPct: 11 },
];

export type FuturesContract = {
  key: string;
  symbol: string;
  name: string;
  expiry: string;
  price: number;
  changePct: number;
  openInterest: string;
};

export const FUTURES: FuturesContract[] = [
  { key: "lct-aug", symbol: "LCT", name: "Live Cattle", expiry: "Aug 2026", price: 188.54, changePct: 1.41, openInterest: "142.3k" },
  { key: "lct-oct", symbol: "LCT", name: "Live Cattle", expiry: "Oct 2026", price: 190.12, changePct: 1.02, openInterest: "98.1k" },
  { key: "lhg-aug", symbol: "LHG", name: "Lean Hogs", expiry: "Aug 2026", price: 92.35, changePct: -0.59, openInterest: "76.4k" },
  { key: "lhg-oct", symbol: "LHG", name: "Lean Hogs", expiry: "Oct 2026", price: 84.70, changePct: -1.24, openInterest: "54.9k" },
  { key: "fc-aug", symbol: "FC", name: "Feeder Cattle", expiry: "Aug 2026", price: 258.80, changePct: 0.88, openInterest: "41.2k" },
];

export type Alert = {
  id: string;
  symbol: string;
  condition: string;
  target: string;
  enabled: boolean;
  status: "Active" | "Triggered";
};

export const ALERTS: Alert[] = [
  { id: "a1", symbol: "BTC", condition: "Price rises above", target: "$70,000.00", enabled: true, status: "Active" },
  { id: "a2", symbol: "ETH", condition: "Price falls below", target: "$3,400.00", enabled: true, status: "Active" },
  { id: "a3", symbol: "LCT", condition: "AI signal turns", target: "Bullish", enabled: true, status: "Triggered" },
  { id: "a4", symbol: "LHG", condition: "Daily change exceeds", target: "±3%", enabled: false, status: "Active" },
  { id: "a5", symbol: "SOL", condition: "Price rises above", target: "$200.00", enabled: false, status: "Active" },
];

export function formatUsd(n: number, opts?: Intl.NumberFormatOptions) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...opts,
  });
}

export function formatUsdCompact(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
