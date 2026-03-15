"use client";
import Link from "next/link";
import SidebarNav from "@/components/SidebarNav";
import SeverityBadge from "@/components/ui/SeverityBadge";
import CaseStatusBadge from "@/components/ui/CaseStatusBadge";
import SLAProgressBar from "@/components/ui/SLAProgressBar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const weeklyData = [
  { name: "W1", cases: 3 },
  { name: "W2", cases: 5 },
  { name: "W3", cases: 2 },
  { name: "W4", cases: 6 },
  { name: "W5", cases: 4 },
  { name: "W6", cases: 5 },
  { name: "W7", cases: 1 },
  { name: "W8", cases: 4 },
];

const allCases = [
  { id: "SVX-1842", category: "Verbal Harassment", severity: 2 as const, status: "in_progress" as const, assignedTo: "HR Officer", sla: 43, slaLabel: "43% · 2d left", date: "Mar 12, 2026" },
  { id: "SVX-1841", category: "Cyber Bullying", severity: 1 as const, status: "breached" as const, assignedTo: "Legal Head", sla: 112, slaLabel: "Overdue", date: "Mar 10, 2026" },
  { id: "SVX-1838", category: "Physical Intimidation", severity: 3 as const, status: "resolved" as const, assignedTo: "Campus Security", sla: 100, slaLabel: "Completed in 14h", date: "Mar 09, 2026" },
  { id: "SVX-1835", category: "Digital Stalking", severity: 2 as const, status: "in_progress" as const, assignedTo: "HR Officer", sla: 88, slaLabel: "88% · 4h left", date: "Mar 08, 2026" },
  { id: "SVX-1834", category: "Discrimination", severity: 3 as const, status: "resolved" as const, assignedTo: "Welfare Comm", sla: 100, slaLabel: "Completed", date: "Mar 07, 2026" },
  { id: "SVX-1830", category: "Verbal Harassment", severity: 4 as const, status: "resolved" as const, assignedTo: "HR Officer", sla: 100, slaLabel: "Completed", date: "Mar 05, 2026" },
  { id: "SVX-1828", category: "Digital Stalking", severity: 1 as const, status: "in_progress" as const, assignedTo: "Legal Head", sla: 15, slaLabel: "15% · 6d left", date: "Mar 05, 2026" },
  { id: "SVX-1825", category: "Academic Pressure", severity: 3 as const, status: "closed" as const, assignedTo: "Counselor", sla: 100, slaLabel: "Auto-Closed", date: "Mar 01, 2026" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <SidebarNav userName="V. Kumar" userRole="Chief Admin" />

      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Platform Overview</h2>
            <p className="text-slate-500 font-medium">All cases across VNR VJIET — March 2026</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <span className="material-symbols-outlined text-lg">download</span> Export Report
            </button>
            <button className="bg-[#2C5F8A] text-white px-5 py-2 rounded-lg text-sm font-bold hover:brightness-110 shadow-lg shadow-[#2C5F8A]/20">
              New Manual Case
            </button>
          </div>
        </header>

        {/* Metrics */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { label: "Total Cases", value: "24", extra: <span className="text-green-600 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-sm">trending_up</span> 12%</span> },
            { label: "In Progress", value: "8", extra: <span className="text-slate-400 text-xs font-bold">Current</span> },
            { label: "SLA Breached", value: "3", extra: <span className="text-red-600 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-sm">warning</span> Action required</span>, valueColor: "text-red-600" },
            { label: "Resolved", value: "13", extra: <span className="text-green-600 text-xs font-bold">85% Rate</span>, valueColor: "text-green-600" },
            { label: "SLA Compliance", value: "91%", extra: <span className="text-green-600 text-xs font-bold flex items-center"><span className="material-symbols-outlined text-sm">expand_less</span> 1%</span> },
          ].map((m) => (
            <div key={m.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{m.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black ${m.valueColor || "text-slate-900"}`}>{m.value}</span>
                {m.extra}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Cases by Week</h3>
              <span className="text-xs font-bold text-slate-400">Last 8 Weeks</span>
            </div>
            <ResponsiveContainer width="100%" height={192}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((_, i) => (
                    <Cell key={i} fill="#2C5F8A" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          <div className="col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Cases by Severity</h3>
            <div className="flex flex-col items-center">
              <div
                className="relative w-40 h-40 flex items-center justify-center rounded-full"
                style={{
                  background: "conic-gradient(#ef4444 0% 15%, #f59e0b 15% 45%, #2C5F8A 45% 80%, #94a3b8 80% 100%)",
                }}
              >
                <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
                  <p className="text-2xl font-black text-slate-900 leading-none">24</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                {[
                  { color: "bg-red-500", label: "S1 Critical" },
                  { color: "bg-amber-500", label: "S2 High" },
                  { color: "bg-[#2C5F8A]", label: "S3 Medium" },
                  { color: "bg-slate-400", label: "S4 Low" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Anomaly Alerts */}
          <div className="col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-amber-500">analytics</span>
              <h3 className="font-bold text-slate-900">Anomaly Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-xs font-bold text-red-700 leading-tight mb-1">High Close Speed</p>
                <p className="text-[11px] text-red-600 leading-snug">
                  SVX-1839 closed in under 2 hours — immediate review required.
                </p>
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <p className="text-xs font-bold text-amber-700 leading-tight mb-1">Keyword Match</p>
                <p className="text-[11px] text-amber-600 leading-snug">
                  Multiple cases reported from Dept. Mechanical Eng. within 48h.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border-l-4 border-slate-400 rounded-r-lg">
                <p className="text-xs font-bold text-slate-700 leading-tight mb-1">Audit Flag</p>
                <p className="text-[11px] text-slate-600 leading-snug">
                  SLA target updated for S2 category by Legal Head.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">All Cases</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                  <input
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8A]/20 focus:border-[#2C5F8A] w-64"
                    placeholder="Search case ID, category..."
                    type="text"
                  />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                  <span className="material-symbols-outlined text-lg">filter_list</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Severity: All", "Status: All", "Assigned To: All", "Date Range: Last 30 Days"].map((filter) => (
                <select
                  key={filter}
                  className="text-sm border border-slate-200 rounded-lg bg-slate-50 px-3 py-1.5 focus:ring-[#2C5F8A] focus:border-[#2C5F8A]"
                  defaultValue={filter}
                >
                  <option>{filter}</option>
                </select>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Case ID", "Category", "Severity", "Status", "Assigned To", "SLA Progress", "Filed Date"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/cases/${c.id}`} className="font-bold text-[#2C5F8A] text-sm hover:underline">{c.id}</Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{c.category}</td>
                    <td className="px-6 py-4"><SeverityBadge severity={c.severity} /></td>
                    <td className="px-6 py-4"><CaseStatusBadge status={c.status} /></td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.assignedTo}</td>
                    <td className="px-6 py-4">
                      {c.status === "resolved" || c.status === "closed" ? (
                        <span className="text-[10px] font-black text-green-600 uppercase">{c.slaLabel}</span>
                      ) : (
                        <SLAProgressBar percentage={c.sla} label={c.slaLabel} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-slate-200 flex justify-between items-center bg-slate-50">
            <p className="text-sm text-slate-500 font-medium">Showing 8 of 24 cases</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1.5 border border-slate-200 bg-[#2C5F8A] text-white rounded-lg text-sm font-bold">1</button>
              <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">2</button>
              <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">3</button>
              <button className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
