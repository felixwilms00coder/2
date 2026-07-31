import {
  Wallet,
  BarChart3,
  PiggyBank,
  TrendingUp,
  CreditCard,
  Shield,
  Clock,
  FileText,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  wallet: Wallet,
  chart: BarChart3,
  "piggy-bank": PiggyBank,
  "trending-up": TrendingUp,
  "credit-card": CreditCard,
  shield: Shield,
  clock: Clock,
  "file-text": FileText,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? Wallet;
  return <Cmp className={className} aria-hidden="true" />;
}
