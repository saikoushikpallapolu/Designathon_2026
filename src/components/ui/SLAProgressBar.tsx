interface SLAProgressBarProps {
  percentage: number;
  label?: string;
  className?: string;
}

export default function SLAProgressBar({ percentage, label, className = "" }: SLAProgressBarProps) {
  const getColor = () => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getTextColor = () => {
    if (percentage >= 80) return "text-red-600";
    if (percentage >= 50) return "text-amber-600";
    return "text-slate-400";
  };

  return (
    <div className={className}>
      <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {label && (
        <span className={`text-[10px] font-bold mt-1 block ${getTextColor()}`}>
          {label}
        </span>
      )}
    </div>
  );
}
