"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TimelineEntry {
  action: string;
  actorRole: string;
  createdAt: string;
}

interface CaseData {
  caseId: string;
  severity: number;
  status: string;
  slaDeadline: string;
  slaHours: number;
  createdAt: string;
  timeline: TimelineEntry[];
}

const statusLabels: Record<string, { label: string; color: string; bg: string; border: string }> = {
  open: { label: "Under Investigation", color: "text-blue-700", bg: "bg-blue-100", border: "border-blue-200" },
  in_progress: { label: "In Progress", color: "text-blue-700", bg: "bg-blue-100", border: "border-blue-200" },
  resolved: { label: "Resolved", color: "text-green-700", bg: "bg-green-100", border: "border-green-200" },
  closed: { label: "Closed", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" },
  breached: { label: "SLA Breached", color: "text-red-700", bg: "bg-red-100", border: "border-red-200" },
};

export default function StatusDetailPage() {
  const params = useParams();
  const token = params.token as string;
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Try sessionStorage first (from status page redirect)
    const cached = sessionStorage.getItem("caseStatus");
    if (cached) {
      setCaseData(JSON.parse(cached));
      sessionStorage.removeItem("caseStatus");
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Case not found");
        return res.json();
      })
      .then((data) => {
        setCaseData(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [token]);

  // Calculate SLA progress
  const getSLAProgress = () => {
    if (!caseData) return { percentage: 0, remaining: "" };
    const created = new Date(caseData.createdAt).getTime();
    const deadline = new Date(caseData.slaDeadline).getTime();
    const now = Date.now();
    const total = deadline - created;
    const elapsed = now - created;
    const pct = Math.min(100, Math.round((elapsed / total) * 100));
    const remainMs = deadline - now;
    const remainDays = Math.ceil(remainMs / (1000 * 60 * 60 * 24));
    const remaining = remainMs > 0 ? `${remainDays} day${remainDays !== 1 ? "s" : ""} remaining` : "Overdue";
    return { percentage: pct, remaining };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[#2C5F8A] text-5xl animate-spin">progress_activity</span>
          <p className="text-slate-600 font-medium">Loading case data...</p>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
          <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Case not found</h2>
          <p className="text-slate-600 mb-6">{error || "The token you entered does not match any case."}</p>
          <Link href="/status" className="text-[#2C5F8A] font-bold hover:underline">← Try again</Link>
        </div>
      </div>
    );
  }

  const { percentage, remaining } = getSLAProgress();
  const sevColor = caseData.severity === 1 ? "amber-700" : caseData.severity === 2 ? "amber-700" : "blue-700";
  const statInfo = statusLabels[caseData.status] ?? statusLabels.open;
  const slaDays = Math.ceil(caseData.slaHours / 24);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="flex h-full grow flex-col">
        {/* Navigation */}
        <header className="bg-white border-b border-slate-200 px-6 lg:px-40 py-4 flex items-center justify-between sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">shield_person</span>
            </div>
            <h2 className="text-slate-900 text-xl font-bold tracking-tight">SafeVoice</h2>
          </Link>
          <Link
            href="/report/category"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">lock</span>
            <span>Secure Report Portal</span>
          </Link>
        </header>

        <main className="max-w-5xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Case Status</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-sm font-medium uppercase tracking-wider">Case ID:</span>
                <code className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[#2C5F8A] font-bold">
                  {token}
                </code>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 bg-amber-100 text-${sevColor} px-4 py-2 rounded-full border border-amber-200`}>
                <span className="material-symbols-outlined text-base">priority_high</span>
                <span className="text-sm font-bold">Severity {caseData.severity}</span>
              </div>
              <div className={`flex items-center gap-2 ${statInfo.bg} ${statInfo.color} px-4 py-2 rounded-full border ${statInfo.border}`}>
                <span className="material-symbols-outlined text-base">search</span>
                <span className="text-sm font-bold uppercase tracking-wide">{statInfo.label}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* SLA Progress */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2C5F8A]">timer</span>
                    Response deadline
                  </h3>
                  <span className="text-slate-900 font-bold text-sm bg-slate-100 px-2 py-1 rounded">
                    {percentage}% Elapsed
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentage >= 80 ? "bg-red-500" : percentage >= 50 ? "bg-amber-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(100, percentage)}%` }}
                  />
                </div>
                <p className="text-slate-500 text-sm">
                  <span className={`font-semibold ${percentage >= 80 ? "text-red-600" : "text-amber-600"}`}>
                    {remaining}
                  </span>{" "}
                  of {slaDays}-day response window
                </p>
              </section>

              {/* Timeline */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-8 px-2">Case timeline</h3>
                <div className="relative space-y-8 ml-4">
                  {caseData.timeline.map((event, i) => (
                    <div key={i} className="relative pl-8">
                      {i < caseData.timeline.length - 1 && (
                        <div className="absolute left-[7px] top-5 w-0.5 h-full bg-green-500" />
                      )}
                      <div className="absolute left-0 top-1 size-4 rounded-full border-4 z-10 bg-green-500 border-green-100" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <p className="font-semibold text-slate-900">{event.action}</p>
                        <p className="text-xs text-slate-400 font-medium">
                          {event.actorRole} • {new Date(event.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Messages */}
            <div className="lg:col-span-1 space-y-6">
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2C5F8A]">chat_bubble</span>
                  Messages from your investigator
                </h3>
                <div className="flex-grow space-y-6 mb-8">
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-[#2C5F8A]">
                    <p className="text-slate-700 text-sm leading-relaxed mb-2">
                      &ldquo;Your report has been received and is under review. We may follow up with
                      additional questions.&rdquo;
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      System • {new Date(caseData.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-slate-500"
                    htmlFor="response"
                  >
                    Your response
                  </label>
                  <textarea
                    id="response"
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#2C5F8A] focus:border-[#2C5F8A] p-3"
                    placeholder="Type your secure response here..."
                    rows={4}
                  />
                  <button className="w-full bg-[#2C5F8A] text-white py-3 rounded-lg font-bold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">send</span>
                    Send Response
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-col items-center gap-6 border-t border-slate-200 pt-10">
            <button className="text-slate-400 text-sm hover:text-[#2C5F8A] transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">history</span>
              Reopen or appeal this case
            </button>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                © 2026 VNR Vignana Jyothi Institute of Engineering and Technology
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
