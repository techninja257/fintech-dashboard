# Verdant — Real-time Fintech Analytics Dashboard

A responsive, dark-mode-ready analytics dashboard for a fintech app, tracking
live crypto and livestock-futures prices with AI-style investment insights.

**Live demo:** https://fintech-dashboard-pi-one.vercel.app/

## Features

- **Live prices** — a market strip that ticks every 3s over mock data (BTC, ETH,
  Live Cattle, Lean Hogs). No backend required.
- **Dark mode toggle** — class-based theming via `next-themes`, with a toggle in
  the top bar and system-preference default.
- **Fully responsive** — the sidebar collapses to a slide-in drawer on
  mobile/tablet, stat/market grids reflow 1 → 2 → 4 columns, and data tables
  scroll horizontally on small screens.
- **Multi-page app** — Overview, Portfolio, Markets (search + filter),
  Livestock futures, AI Insights, Alerts (toggleable), Settings (editable), and
  Support, all sharing one app shell.
- **Recharts** portfolio performance chart with a benchmark line and 7D/30D/90D
  range toggle.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- Tailwind CSS v4
- [Recharts](https://recharts.org/) for the performance chart
- [lucide-react](https://lucide.dev/) icons
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # eslint — passes with 0 errors
npm run build    # production build
```

## Project structure

```
src/
  app/
    (dashboard)/        # route group sharing the sidebar + topbar shell
      page.tsx          # Overview
      portfolio/  markets/  livestock/
      ai-insights/  alerts/  settings/  support/
    layout.tsx          # root layout (html/body + ThemeProvider)
    globals.css
  components/
    app-shell.tsx  sidebar.tsx  topbar.tsx
    dashboard/          # Overview widgets
    ui.tsx              # shared Panel / Change / AssetAvatar helpers
  lib/
    data.ts             # simulated data + formatters
    nav.ts              # sidebar nav config
```

## Notes on the assignment

This dashboard satisfies the functional brief — live (mock) prices, dark-mode
toggle, full responsiveness, committed to GitHub with zero lint errors, and
deployed to Vercel with a live URL.

**Transparency note:** the UI was built directly in Next.js/Tailwind rather than
generated with v0.dev. All mock data is simulated client-side; swapping in a real
feed (e.g. the CoinGecko API) would only require changing `src/lib/data.ts` and
the tick logic in `src/components/dashboard/live-markets.tsx`.
