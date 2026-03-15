interface CaseStatusBadgeProps {
  status: "submitted" | "in_progress" | "escalated" | "resolved" | "closed" | "breached";
  className?: string;
}

const config = {
  submitted: { dot: "bg-slate-400", text: "text-slate-600", label: "Submitted" },
  in_progress: { dot: "bg-blue-500", text: "text-blue-700", label: "In Progress" },
  escalated: { dot: "bg-red-600", text: "text-red-700 font-semibold", label: "Escalated" },
  resolved: { dot: "bg-emerald-500", text: "text-emerald-700", label: "Resolved" },
  closed: { dot: "bg-slate-400", text: "text-slate-500", label: "Closed" },
  breached: { dot: "bg-red-500", text: "text-red-600 font-semibold", label: "SLA Breached" },
};

export default function CaseStatusBadge({ status, className = "" }: CaseStatusBadgeProps) {
  const c = config[status];
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className={`size-2 rounded-full ${c.dot}`} />
      <span className={`text-sm ${c.text}`}>{c.label}</span>
    </div>
  );
}
