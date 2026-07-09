import {
  LayoutDashboard,
  Wallet,
  LineChart,
  Sprout,
  Sparkles,
  Bell,
  Settings,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const MENU: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: Wallet },
  { label: "Markets", href: "/markets", icon: LineChart },
  { label: "Livestock", href: "/livestock", icon: Sprout },
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { label: "Alerts", href: "/alerts", icon: Bell },
];

export const GENERAL: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Support", href: "/support", icon: LifeBuoy },
];
