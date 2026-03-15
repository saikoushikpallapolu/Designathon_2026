"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReportProgressBar from "@/components/report/ProgressBar";
import Footer from "@/components/Footer";
import { useReportStore } from "@/store/reportStore";

const outcomeOptions = [
  "I just want this on record",
  "I'd like mediation between parties",
  "I want a formal investigation",
  "I want this escalated to authorities if needed",
];

export default function ContextEvidencePage() {
  const router = useRouter();
  const store = useReportStore();

  const toggleOutcome = (outcome: string) => {
    const current = store.desiredOutcome;
    const updated = current.includes(outcome)
      ? current.filter((o) => o !== outcome)
      : [...current, outcome];
    store.setContext({ desiredOutcome: updated });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ReportProgressBar currentStep={3} />

      <main className="max-w-4xl mx-auto w-full px-6 py-10 flex-1">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Additional context
          </h2>
          <p className="text-slate-600">
            Please provide any further details that might assist in resolving this matter securely.
          </p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Section 1: Witnesses */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#2C5F8A]">groups</span>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Section 1 — Witnesses
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-slate-800 mb-3">
                  Were there any witnesses?
                </label>
                <div className="flex gap-3">
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => store.setContext({ hasWitnesses: val })}
                      className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                        store.hasWitnesses === val
                          ? "border-2 border-[#2C5F8A] bg-[#2C5F8A]/5 text-[#2C5F8A]"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>

              {store.hasWitnesses && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Which group were they from?
                  </label>
                  <select
                    value={store.witnessGroup}
                    onChange={(e) => store.setContext({ witnessGroup: e.target.value })}
                    className="w-full rounded-lg border-slate-200 text-slate-900 focus:ring-[#2C5F8A] focus:border-[#2C5F8A]"
                  >
                    <option value="">Select group</option>
                    <option value="class">My class / batch</option>
                    <option value="research">My research group</option>
                    <option value="faculty">Department faculty</option>
                    <option value="staff">Administrative staff</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="mt-2 flex items-start gap-2 text-slate-500">
                    <span className="material-symbols-outlined text-[18px] mt-0.5">info</span>
                    <p className="text-xs">
                      We may send an anonymous notification to this group. No names are shared.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Evidence */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2C5F8A]">upload_file</span>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Section 2 — Evidence (Optional)
                </h3>
              </div>
              <span className="text-sm font-medium text-slate-500 underline cursor-pointer">
                Skip this step
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-base font-medium text-slate-800">
                  Do you have any supporting evidence?
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Files are encrypted immediately on upload and only accessible to legal counsel.
                </p>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-[#2C5F8A]/5 hover:border-[#2C5F8A] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
                  cloud_upload
                </span>
                <p className="text-slate-700 font-semibold text-center">
                  Drag and drop files here or <span className="text-[#2C5F8A]">browse</span>
                </p>
                <p className="text-slate-500 text-xs mt-2 text-center">
                  Screenshots, documents, audio recordings - Max 10MB per file
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Desired Outcome */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[#2C5F8A]">gavel</span>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Section 3 — Desired Outcome
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-base font-medium text-slate-800 mb-4">
                What outcome are you hoping for?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outcomeOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={store.desiredOutcome.includes(option)}
                      onChange={() => toggleOutcome(option)}
                      className="mt-1 rounded text-[#2C5F8A] focus:ring-[#2C5F8A] border-slate-300"
                    />
                    <span className="text-sm text-slate-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <Link
              href="/report/incidents"
              className="flex items-center gap-2 text-slate-600 hover:text-[#2C5F8A] transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Back
            </Link>
            <button
              type="button"
              onClick={() => router.push("/report/review")}
              className="bg-[#2C5F8A] text-white px-10 py-3 rounded-lg font-bold shadow-lg shadow-[#2C5F8A]/20 hover:bg-[#2C5F8A]/90 transition-all active:scale-95"
            >
              Continue
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
