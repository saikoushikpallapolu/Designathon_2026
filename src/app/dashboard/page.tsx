"use client";
import Link from "next/link";
import SidebarNav from "@/components/SidebarNav";
import SeverityBadge from "@/components/ui/SeverityBadge";
import CaseStatusBadge from "@/components/ui/CaseStatusBadge";
import SLAProgressBar from "@/components/ui/SLAProgressBar";

const cases = [
  { id: "SVX-1842", category: "Verbal Harassment", severity: 2 as const, status: "in_progress" as const, sla: 43, slaLabel: "43% (24h remaining)" },
  { id: "SVX-1839", category: "Physical Misconduct", severity: 1 as const, status: "escalated" as const, sla: 100, slaLabel: "100% BREACHED" },
  { id: "SVX-1831", category: "Discrimination", severity: 3 as const, status: "in_progress" as const, sla: 20, slaLabel: "20% (72h remaining)" },
  { id: "SVX-1829", category: "Bullying", severity: 3 as const, status: "resolved" as const, sla: 100, slaLabel: "Completed" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <SidebarNav userName="Sarah Jenkins" userRole="HR Officer" />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Good morning, Sarah
              </h2>
              <p className="text-slate-500 mt-1">
                3 cases need your attention today across your departments.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#2C5F8A] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-sm">add</span>
                New Case
              </button>
            </div>
          </div>
        </header>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">My Open Cases</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold text-slate-900">5</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                Active
              </span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-l-4 border-l-red-500 border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">SLA Due Today</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold text-red-600">2</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 rounded">
                Urgent
              </span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Awaiting my response</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold text-slate-900">1</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-600 rounded">
                Pending
              </span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Resolved this month</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold text-slate-900">8</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +12%
              </span>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-600">error</span>
            <p className="text-red-800 text-sm font-semibold">
              SVX-1839 SLA has been breached.{" "}
              <span className="font-normal opacity-90">
                Immediate action required for Physical Misconduct report.
              </span>
            </p>
          </div>
          <Link
            href="/cases/SVX-1839"
            className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1.5 rounded hover:bg-red-200 transition-colors"
          >
            Resolve Now
          </Link>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">My assigned cases</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                className="pl-10 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-[#2C5F8A] focus:border-[#2C5F8A] w-64"
                placeholder="Search case ID..."
                type="text"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100">
                  <th className="px-6 py-4">Case ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">SLA Progress</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {cases.map((c) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      c.status === "escalated" ? "bg-red-50/20" : ""
                    } ${c.status === "resolved" ? "opacity-75" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <Link href={`/cases/${c.id}`} className="font-bold text-sm text-[#2C5F8A] hover:underline">
                        {c.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.category}</td>
                    <td className="px-6 py-4">
                      <SeverityBadge severity={c.severity} />
                    </td>
                    <td className="px-6 py-4">
                      <CaseStatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4">
                      <SLAProgressBar percentage={c.sla} label={c.slaLabel} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/cases/${c.id}`}
                        className="text-slate-400 hover:text-[#2C5F8A] transition-colors"
                      >
                        <span className="material-symbols-outlined">more_horiz</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <p className="text-[12px] text-slate-500">Showing 4 of 12 cases assigned to you</p>
            <div className="flex gap-2">
              <button className="p-1 border border-slate-200 rounded hover:bg-white disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="p-1 border border-slate-200 rounded hover:bg-white">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
