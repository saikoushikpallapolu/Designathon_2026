"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReportProgressBar from "@/components/report/ProgressBar";
import Footer from "@/components/Footer";
import { useReportStore } from "@/store/reportStore";

const categoryLabels: Record<string, string> = {
  sexual_harassment: "Sexual Harassment",
  verbal_abuse: "Verbal or Emotional Abuse",
  bullying: "Workplace / Academic Bullying",
  discrimination: "Discrimination",
  physical_misconduct: "Physical Misconduct",
  retaliation: "Retaliation or Threats",
};

const locationLabels: Record<string, string> = {
  office: "Office/Campus",
  online: "Online or Remote",
  offsite: "Off-site Event",
  other: "Other",
};

const roleLabels: Record<string, string> = {
  professor: "Professor",
  lab_assistant: "Lab Assistant",
  admin: "Administrative Staff",
  student: "Fellow Student",
  other: "Other",
};

export default function ReviewPage() {
  const router = useRouter();
  const store = useReportStore();

  return (
    <div className="min-h-screen flex flex-col">
      <ReportProgressBar currentStep={4} />

      <main className="max-w-2xl w-full mx-auto px-4 py-8 md:py-12 flex-grow">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-3xl font-bold text-slate-900">Review your report</h2>
            <span className="text-sm font-medium text-[#2C5F8A]">66% Complete</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2C5F8A] h-full w-2/3" />
          </div>
          <p className="mt-4 text-slate-600 text-base">
            Check everything below before submitting. You can edit any section.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="space-y-4">
          {/* Category Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-4">
            <div className="bg-[#2C5F8A]/10 p-3 rounded-lg text-[#2C5F8A]">
              <span className="material-symbols-outlined">category</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Incident Category
                </p>
                <Link
                  href="/report/category"
                  className="text-sm font-semibold text-[#2C5F8A] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span> Edit
                </Link>
              </div>
              <p className="text-lg font-semibold">
                {categoryLabels[store.category] || "Not selected"}
              </p>
            </div>
          </div>

          {/* Incident Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-4">
            <div className="bg-[#2C5F8A]/10 p-3 rounded-lg text-[#2C5F8A]">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Incident Details
                </p>
                <Link
                  href="/report/incidents"
                  className="text-sm font-semibold text-[#2C5F8A] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span> Edit
                </Link>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold">
                  {store.dateFrom && store.dateTo
                    ? `${store.dateFrom} — ${store.dateTo}`
                    : "No dates specified"}
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {locationLabels[store.location] || "Not specified"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">person</span>
                    {roleLabels[store.respondentRole] || "Not specified"}
                  </span>
                </div>
                {store.description && (
                  <p className="mt-3 text-slate-700 italic line-clamp-2">
                    &ldquo;{store.description.substring(0, 100)}...&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Context Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-4">
            <div className="bg-[#2C5F8A]/10 p-3 rounded-lg text-[#2C5F8A]">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Additional Context
                </p>
                <Link
                  href="/report/context"
                  className="text-sm font-semibold text-[#2C5F8A] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span> Edit
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Witnesses</p>
                  <p className="text-sm font-medium">
                    {store.hasWitnesses
                      ? `Yes — ${store.witnessGroup || "Not specified"}`
                      : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Evidence</p>
                  <p className="text-sm font-medium">
                    {store.evidence.length > 0
                      ? `${store.evidence.length} file(s) uploaded`
                      : "None uploaded"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-slate-400 uppercase font-bold">Desired Outcome</p>
                  <p className="text-sm font-medium">
                    {store.desiredOutcome.length > 0
                      ? store.desiredOutcome.join(", ")
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Reminder */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-4">
          <span className="material-symbols-outlined text-[#2C5F8A]">lock</span>
          <p className="text-sm text-slate-700 leading-relaxed">
            Your submission is encrypted the moment you click Submit. No personal information is
            stored on unencrypted local logs.
          </p>
        </div>

        {/* Action Area */}
        <div className="mt-10 space-y-4">
          <button
            onClick={() => router.push("/report/processing")}
            className="w-full bg-[#2C5F8A] hover:bg-[#2C5F8A]/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#2C5F8A]/20"
          >
            <span className="material-symbols-outlined">verified_user</span>
            Submit Report Securely
          </button>
          <p className="text-center text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            By submitting you confirm this report is truthful to the best of your knowledge.
          </p>
          <div className="pt-4 flex justify-start">
            <Link
              href="/report/context"
              className="flex items-center gap-2 text-slate-500 hover:text-[#2C5F8A] transition-colors font-medium"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-xs">
        <p>© 2026 SafeVoice Reporting System. All rights reserved.</p>
      </footer>
    </div>
  );
}
