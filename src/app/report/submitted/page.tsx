"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { useReportStore } from "@/store/reportStore";

const severityLabels: Record<number, { label: string; color: string; bg: string; border: string }> = {
  1: { label: "Severity 1 — Critical", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  2: { label: "Severity 2 — Workplace Incident", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  3: { label: "Severity 3 — Policy Breach", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  4: { label: "Severity 4 — Informational", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
};

export default function SubmittedPage() {
  const [copied, setCopied] = useState(false);
  const { submissionResult, submitError } = useReportStore();

  const token = submissionResult?.token ?? "SVX-XXXX-XXXX-XXXX";
  const severity = submissionResult?.severity ?? 2;
  const recommendation = submissionResult?.recommendation ?? "Your report has been assigned to an HR officer.";
  const slaHours = submissionResult?.slaHours ?? 168;
  const slaDays = Math.ceil(slaHours / 24);
  const sev = severityLabels[severity] ?? severityLabels[2];

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      {/* Top Accent Bar */}
      <div className="h-1 bg-[#2C5F8A] w-full" />

      {/* Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-[#2C5F8A] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">shield_person</span>
          </div>
          <h1 className="text-[#2C5F8A] text-xl font-bold tracking-tight">SafeVoice</h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm hidden sm:block">Secure Report Portal</span>
          <div className="h-8 w-8 rounded-full bg-[#2C5F8A]/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#2C5F8A] text-sm">lock</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 max-w-4xl mx-auto w-full">
        {/* Error Banner */}
        {submitError && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-red-500">error</span>
            <p className="text-sm text-red-700 font-medium">{submitError}. Showing placeholder data below.</p>
          </div>
        )}

        {/* Status Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#1A7F5A]/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#1A7F5A] text-4xl font-bold">
              check_circle
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#2C5F8A] mb-3">
            Your report has been submitted
          </h2>
          <p className="text-slate-600 max-w-lg">
            It has been encrypted and routed for review. Save your case token — it is the only way
            to track this report.
          </p>
        </div>

        {/* Token Display Box */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-8 mb-8 text-center">
          <span className="text-[10px] font-bold tracking-[0.15em] text-[#2C5F8A] uppercase block mb-3">
            Your Secure Case Token
          </span>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-4 flex flex-col items-center">
            <span className="font-mono text-2xl sm:text-3xl tracking-[0.2em] text-[#2C5F8A] font-medium">
              {token}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 mx-auto px-6 py-2 border-2 border-[#2C5F8A] text-[#2C5F8A] font-semibold rounded-lg hover:bg-[#2C5F8A]/5 transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied!" : "Copy token"}
          </button>
          <div className="flex items-center justify-center gap-2 text-[#EF9F27]">
            <span className="material-symbols-outlined text-sm">warning</span>
            <p className="text-xs font-medium">
              This token is not stored anywhere. If you lose it, you cannot access this report again.
            </p>
          </div>
        </div>

        {/* Assessment Card */}
        <div className="w-full bg-white border border-slate-100 shadow-sm rounded-xl p-6 mb-12">
          <h3 className="text-lg font-bold text-[#2C5F8A] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">analytics</span>
            Initial assessment
          </h3>
          <div className={`inline-flex items-center gap-2 px-3 py-1 ${sev.bg} ${sev.color} rounded-full text-xs font-bold mb-4 border ${sev.border}`}>
            <span className={`w-2 h-2 rounded-full ${severity === 1 ? "bg-red-500" : severity === 2 ? "bg-[#EF9F27]" : severity === 3 ? "bg-blue-500" : "bg-slate-400"}`} />
            {sev.label}
          </div>
          <p className="text-slate-600">
            {recommendation}. Expected response within{" "}
            <span className="font-bold text-slate-800">{slaDays} days</span>.
          </p>
        </div>

        {/* What happens next */}
        <div className="w-full mb-12">
          <h3 className="text-xl font-bold text-[#2C5F8A] mb-8 text-center">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Assigned to an investigator within 4 hours",
              "Investigation begins — you may receive follow-up questions via this platform",
              "You will be notified of the outcome through your token",
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#2C5F8A] text-white flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action */}
        <div className="flex justify-center w-full mb-12">
          <Link
            href={`/status/${token}`}
            className="bg-[#2C5F8A] text-white px-10 py-3 rounded-lg font-bold hover:bg-[#2C5F8A]/90 transition-shadow shadow-lg shadow-[#2C5F8A]/20 flex items-center gap-2"
          >
            Check my case status
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
