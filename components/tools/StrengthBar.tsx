import { Lock } from "lucide-react";

interface StrengthBarProps {
  text: string;
  color: string;
}

export default function StrengthBar({ text, color }: StrengthBarProps) {
  return (
    <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 bg-slate-100/50 max-w-fit px-3 py-1.5 rounded-lg">
      <Lock className="h-3.5 w-3.5" />
      Security Strength: <span className={color}>{text}</span>
    </div>
  );
}