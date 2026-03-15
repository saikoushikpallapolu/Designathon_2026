interface SeverityBadgeProps {
  severity: 1 | 2 | 3 | 4;
  className?: string;
}

const config = {
  1: { bg: "bg-red-100", text: "text-red-700", label: "S1" },
  2: { bg: "bg-amber-100", text: "text-amber-700", label: "S2" },
  3: { bg: "bg-blue-100", text: "text-blue-700", label: "S3" },
  4: { bg: "bg-slate-100", text: "text-slate-600", label: "S4" },
};

export default function SeverityBadge({ severity, className = "" }: SeverityBadgeProps) {
  const c = config[severity];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase ${c.bg} ${c.text} ${className}`}
    >
      {c.label}
    </span>
  );
}
