"use client";
import Link from "next/link";
import SidebarNav from "@/components/SidebarNav";

export default function CaseDetailPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <SidebarNav userName="Marcus Thorne" userRole="Senior Lead Officer" />

      <main className="flex-1 ml-64 p-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li><Link href="/dashboard" className="hover:text-[#2C5F8A]">Dashboard</Link></li>
            <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
            <li><Link href="/dashboard" className="hover:text-[#2C5F8A]">My Cases</Link></li>
            <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
            <li className="text-[#2C5F8A] font-semibold">SVX-1842</li>
          </ol>
        </nav>

        {/* Case Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#2C5F8A] tracking-tight">SVX-1842</h2>
            <div className="flex items-center gap-3 text-slate-600">
              <span className="font-semibold">Verbal Harassment — Office</span>
              <span className="size-1 bg-slate-400 rounded-full" />
              <span>Filed 3 days ago</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                S2 SEVERITY
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2C5F8A]/10 text-[#2C5F8A] text-xs font-bold border border-[#2C5F8A]/20">
                IN PROGRESS
              </span>
            </div>
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">SLA Timeline</span>
                <span className="text-[#2C5F8A]">3 days left</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#2C5F8A] rounded-full" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* AI Assessment Card */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2C5F8A]">psychology</span>
                  <h3 className="font-bold text-slate-800">AI Classification</h3>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  87% confidence
                </span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Detected Category</p>
                    <p className="text-sm font-medium">Workplace harassment — power imbalance</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Criminal Flag</p>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                      None detected
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Recommended Action</p>
                    <p className="text-sm font-medium">Route to HR + mediation recommended</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Corroboration Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <span key={i} className="material-symbols-outlined text-[#2C5F8A] text-sm">star</span>
                        ))}
                        {[4, 5].map((i) => (
                          <span key={i} className="material-symbols-outlined text-slate-300 text-sm">star</span>
                        ))}
                      </div>
                      <span className="text-sm font-medium">3/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Incident Summary Card */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2C5F8A]">description</span>
                <h3 className="font-bold text-slate-800">Incident details</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {[
                    { label: "Location", value: "Office/Campus" },
                    { label: "Date Range", value: "Mar 2–8, 2026" },
                    { label: "Pattern", value: "Yes" },
                    { label: "Witnesses", value: "Present - research batch" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">lock</span>
                  <p className="text-xs text-slate-500 font-medium italic">
                    Full description encrypted — visible in session only for authorized officers.
                  </p>
                </div>
              </div>
            </section>

            {/* Prima Facie Checklist */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2C5F8A]">fact_check</span>
                <h3 className="font-bold text-slate-800">Before you proceed</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  "At least one specific verifiable incident documented",
                  "Corroboration score above minimum threshold",
                  "No critical AI anomaly flags",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-slate-300 text-[#2C5F8A] focus:ring-[#2C5F8A]"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-[#2C5F8A] transition-colors">
                      {item}
                    </span>
                  </label>
                ))}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="flex gap-2 items-center text-amber-600">
                    <span className="material-symbols-outlined text-lg">info</span>
                    <p className="text-xs font-semibold">
                      You cannot notify the respondent until this checklist is complete.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Actions Card */}
            <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-slate-800 mb-4">Case Actions</h3>
              {[
                { icon: "note_add", label: "Add investigation note", style: "border-slate-300" },
                { icon: "mail", label: "Send follow-up to reporter", style: "border-slate-300" },
                { icon: "trending_up", label: "Escalate case", style: "border-amber-200 text-amber-600" },
              ].map((action) => (
                <button
                  key={action.label}
                  className={`w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors ${action.style}`}
                >
                  <span className="material-symbols-outlined text-lg">{action.icon}</span>
                  {action.label}
                </button>
              ))}
              <button className="w-full flex items-center justify-center gap-2 bg-[#2C5F8A] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#2C5F8A]/90 transition-shadow shadow-md mt-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Resolve case
              </button>
            </section>

            {/* Timeline Card */}
            <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-6">Timeline</h3>
              <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {[
                  { label: "Case Created", time: "March 10, 2026 • 10:42 AM", color: "bg-[#2C5F8A]" },
                  { label: "AI Assessment Completed", time: "March 10, 2026 • 10:43 AM", color: "bg-slate-300" },
                  { label: "Assigned to Marcus Thorne", time: "March 10, 2026 • 2:15 PM", color: "bg-slate-300" },
                  { label: "Initial Review Pending", time: "Awaiting officer checklist", color: "bg-amber-400" },
                ].map((event, i) => (
                  <div key={i} className="relative pl-8">
                    <div
                      className={`absolute left-0 top-1.5 size-[24px] rounded-full ${event.color} border-4 border-white z-10`}
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{event.label}</p>
                      <p className="text-[11px] text-slate-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conflict Declaration */}
            <section className="bg-[#2C5F8A]/5 border border-[#2C5F8A]/20 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#2C5F8A]">verified_user</span>
                <h3 className="font-bold text-[#2C5F8A]">Conflict Declaration</h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 mb-6">
                I confirm I have no personal or professional relationship with any of the parties
                involved in this case that would compromise my objectivity as an investigator.
              </p>
              <label className="flex items-start gap-2 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-[#2C5F8A]/30 text-[#2C5F8A] focus:ring-[#2C5F8A] bg-transparent"
                />
                <span className="text-[11px] font-medium text-slate-700 uppercase tracking-tight">
                  I acknowledge and confirm
                </span>
              </label>
              <button className="w-full bg-[#2C5F8A]/20 text-[#2C5F8A] border border-[#2C5F8A]/30 py-2 rounded-lg text-sm font-bold hover:bg-[#2C5F8A]/30 transition-colors">
                Confirm
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
