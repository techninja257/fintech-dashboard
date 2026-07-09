import { StatCards } from "@/components/dashboard/stat-cards";
import { LiveMarkets } from "@/components/dashboard/live-markets";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { Allocation } from "@/components/dashboard/allocation";
import { Insights } from "@/components/dashboard/insights";

export default function OverviewPage() {
  return (
    <div>
      <StatCards />
      <LiveMarkets />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <PerformanceChart />
          <Allocation />
        </div>
        <div className="lg:col-span-1">
          <Insights />
        </div>
      </div>
    </div>
  );
}
