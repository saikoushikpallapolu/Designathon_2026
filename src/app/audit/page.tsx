"use client";
import SidebarNav from "@/components/SidebarNav";

const auditEntries = [
  { time: "Mar 15 09:14", caseId: "SVX-1901", actor: "System", action: "Report received", hash: "a7f3...", anomaly: false },
  { time: "Mar 15 09:15", caseId: "SVX-1901", actor: "AI Engine", action: "Severity 2 assigned", hash: "b2c1...", anomaly: false },
  { time: "Mar 15 11:02", caseId: "SVX-1901", actor: "HR Officer #3", action: "Case accessed", hash: "d4e8...", anomaly: false },
  { time: "Mar 15 11:05", caseId: "SVX-1901", actor: "HR Officer #3", action: "Conflict declared", hash: "f1a2...", anomaly: false },
  { time: "Mar 15 15:42", caseId: "SVX-1901", actor: "HR Officer #7", action: "Closure attempted", hash: "99bc...", anomaly: false },
  { time: "Mar 15 15:43", caseId: "SVX-1901", actor: "System", action: "Anomaly flagged — fast closure on high-credibility case", hash: "3d71...", anomaly: true },
  { time: "Mar 15 16:01", caseId: "SVX-1901", actor: "Ombudsman #1", action: "Case reopened", hash: "7e4f...", anomaly: false },
];

export default function AuditLogPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <SidebarNav userName="Dr. Priya Shah" userRole="Legal Counsel" />

      <main className="flex-1 ml-64 px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Immutable Audit Log
            </h2>
            <p className="text-slate-500 max-w-xl">
              Every action on every case is recorded here. Records cannot be edited or deleted.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-100 text-sm font-semibold shadow-sm">
            <span className="material-symbols-outlined text-lg">verified</span>
            <span>✓ Hash chain intact — No tampering detected</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#2C5F8A]/10 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#2C5F8A]/20"
                placeholder="Search for Case ID"
                type="text"
              />
            </div>
            {["Action Type", "Date Range", "Actor Role"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 px-3 py-2 bg-[#F8F9FA] rounded-lg text-sm font-medium hover:bg-[#2C5F8A]/5 transition-colors"
              >
                <span>{filter}</span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#2C5F8A] text-[#2C5F8A] rounded-lg text-sm font-bold hover:bg-[#2C5F8A] hover:text-white transition-all">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export CSV</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-[#2C5F8A]/10 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2C5F8A]/5 border-b border-[#2C5F8A]/10">
                {["Timestamp", "Case ID", "Actor Role", "Action", "State Hash"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C5F8A]/5">
              {auditEntries.map((entry, i) => (
                <tr
                  key={i}
                  className={`transition-colors ${
                    entry.anomaly
                      ? "hover:bg-amber-50"
                      : "hover:bg-[#2C5F8A]/5"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-slate-600">{entry.time}</td>
                  <td className="px-6 py-4 text-sm font-mono font-bold text-[#2C5F8A]">
                    {entry.caseId}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{entry.actor}</td>
                  <td className="px-6 py-4 text-sm">
                    {entry.anomaly ? (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500 text-lg">
                          warning
                        </span>
                        <span className="text-amber-700 font-semibold">{entry.action}</span>
                      </div>
                    ) : (
                      entry.action
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{entry.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Explainer Card */}
        <div className="bg-slate-100 border border-slate-200 p-5 rounded-lg flex items-start gap-4">
          <div className="text-slate-400">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              How the Hash Chain Works
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Each entry&apos;s hash includes the previous entry&apos;s hash. This creates a
              cryptographically linked sequence of records. Any modification to an existing entry
              breaks the subsequent chain, making any tampering immediately visible to auditors.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
