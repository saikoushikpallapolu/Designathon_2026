"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReportProgressBar from "@/components/report/ProgressBar";
import Footer from "@/components/Footer";
import { useReportStore } from "@/store/reportStore";

export default function IncidentDetailsPage() {
  const router = useRouter();
  const store = useReportStore();

  return (
    <div className="min-h-screen flex flex-col">
      <ReportProgressBar currentStep={2} />

      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C5F8A] mb-2">Describe what happened</h1>
          <p className="text-slate-600">
            Be as specific as you can — dates, locations, and exact behaviors help the investigation.
          </p>
        </div>

        {/* Anonymous Tip Banner */}
        <div className="bg-[#2C5F8A]/5 border border-[#2C5F8A]/20 rounded-lg p-4 flex items-start gap-3 mb-10">
          <span className="material-symbols-outlined text-[#2C5F8A] mt-0.5">info</span>
          <p className="text-[#2C5F8A] text-sm font-medium leading-relaxed">
            You are not required to share your name. Describe only what happened. This helps ensure
            your report remains anonymous while providing essential context.
          </p>
        </div>

        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          {/* When did it happen? */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">calendar_today</span>
              When did it happen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  From Date
                </label>
                <input
                  type="date"
                  value={store.dateFrom}
                  onChange={(e) => store.setIncidentDetails({ dateFrom: e.target.value })}
                  className="w-full rounded border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  To Date
                </label>
                <input
                  type="date"
                  value={store.dateTo}
                  onChange={(e) => store.setIncidentDetails({ dateTo: e.target.value })}
                  className="w-full rounded border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A]"
                />
              </div>
            </div>
          </section>

          {/* Where did it happen? */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">location_on</span>
              Where did it happen?
            </h2>
            <select
              value={store.location}
              onChange={(e) => store.setIncidentDetails({ location: e.target.value })}
              className="w-full rounded border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A]"
            >
              <option value="" disabled>Select location type</option>
              <option value="office">Office/Campus</option>
              <option value="online">Online or Remote</option>
              <option value="offsite">Off-site Event</option>
              <option value="other">Other</option>
            </select>
          </section>

          {/* Describe the incident */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">description</span>
              Describe the incident
            </h2>
            <div className="relative">
              <textarea
                value={store.description}
                onChange={(e) => store.setIncidentDetails({ description: e.target.value })}
                className="w-full rounded border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A] p-4 resize-none"
                placeholder="Describe what happened in your own words. Include specific behaviors, what was said or done, and how it affected you."
                rows={8}
              />
              <div className="mt-2 flex justify-end">
                <span className={`text-xs ${store.description.length >= 50 ? "text-emerald-600" : "text-slate-400"}`}>
                  {store.description.length}/50 minimum characters
                </span>
              </div>
            </div>
          </section>

          {/* Has this happened more than once? */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">history</span>
              Has this happened more than once?
            </h2>
            <div className="flex gap-4">
              {[false, true].map((val) => (
                <label key={String(val)} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    checked={store.isPattern === val}
                    onChange={() => store.setIncidentDetails({ isPattern: val })}
                    className="peer hidden"
                  />
                  <div className="py-3 px-4 text-center rounded border border-slate-200 peer-checked:border-[#2C5F8A] peer-checked:bg-[#2C5F8A]/5 peer-checked:text-[#2C5F8A] font-medium">
                    {val ? "Yes" : "No"}
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Respondent's Role */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">badge</span>
              What is the respondent&apos;s role?
            </h2>
            <p className="text-xs text-slate-500 mb-2 italic">
              Please select the professional capacity of the person involved. Do not provide names here.
            </p>
            <select
              value={store.respondentRole}
              onChange={(e) => store.setIncidentDetails({ respondentRole: e.target.value })}
              className="w-full rounded border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A]"
            >
              <option value="" disabled>Select role</option>
              <option value="professor">Professor</option>
              <option value="lab_assistant">Lab Assistant</option>
              <option value="admin">Administrative Staff</option>
              <option value="student">Fellow Student</option>
              <option value="other">Other</option>
            </select>
          </section>

          {/* Navigation */}
          <div className="pt-10 border-t border-slate-200 flex items-center justify-between">
            <Link
              href="/report/category"
              className="text-slate-500 font-bold hover:text-slate-700 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </Link>
            <button
              type="button"
              onClick={() => router.push("/report/context")}
              className="bg-[#2C5F8A] text-white px-10 py-3 rounded-lg font-bold hover:bg-[#2C5F8A]/90 transition-all shadow-lg shadow-[#2C5F8A]/20"
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
