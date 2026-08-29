import {
  ShieldCheck, Activity, Anchor, Smile, Sparkles, Layers, Scissors, Baby, Scan, Zap,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  ShieldCheck, Activity, Anchor, Smile, Sparkles, Layers, Scissors, Baby, Scan, Zap,
};

export default function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
