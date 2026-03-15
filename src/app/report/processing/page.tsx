"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const steps = [
  { label: "Report encrypted", status: "done" },
  { label: "AI assessment running...", status: "loading" },
  { label: "Assigning to investigator", status: "pending" },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 1200),
      setTimeout(() => setCurrentStep(2), 2800),
      setTimeout(() => router.push("/report/submitted"), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  const getStepIcon = (index: number) => {
    if (index < currentStep) {
      return (
        <span
          className="material-symbols-outlined !text-[28px] text-[#1A7F5A]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      );
    }
    if (index === currentStep) {
      return (
        <span className="material-symbols-outlined !text-[28px] text-[#2C5F8A] animate-spin">
          progress_activity
        </span>
      );
    }
    return (
      <span className="material-symbols-outlined !text-[28px] text-slate-400">
        radio_button_unchecked
      </span>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden p-4 bg-[#F8F9FA]">
      <div className="flex flex-col items-center max-w-[480px] w-full bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200">
        {/* Central Shield Icon */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-[#2C5F8A]/10 p-6">
            <span className="material-symbols-outlined text-[#2C5F8A] !text-7xl">shield_lock</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[#2C5F8A] tracking-tight text-2xl md:text-3xl font-bold leading-tight text-center mb-10">
          Securing your report...
        </h1>

        {/* Processing Steps */}
        <div className="w-full space-y-4 mb-10">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg border transition-all duration-500 ${
                i === currentStep
                  ? "bg-slate-50 border-[#2C5F8A]/20"
                  : i < currentStep
                  ? "bg-white border-slate-100"
                  : "bg-white border-slate-100 opacity-60"
              }`}
            >
              <div className="flex items-center justify-center shrink-0">
                {getStepIcon(i)}
              </div>
              <p
                className={`text-base leading-normal flex-1 ${
                  i === currentStep
                    ? "text-[#2C5F8A] font-semibold"
                    : i < currentStep
                    ? "text-slate-700 font-medium"
                    : "text-slate-500 font-normal"
                }`}
              >
                {i < currentStep
                  ? step.label.replace("running...", "complete")
                  : step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Subtext */}
        <div className="text-center">
          <p className="text-slate-500 text-sm font-medium">
            This takes just a few seconds. Do not close this tab.
          </p>
        </div>
      </div>

      {/* SafeVoice Branding */}
      <div className="mt-8 flex items-center gap-2 grayscale opacity-50">
        <span className="material-symbols-outlined text-[#2C5F8A] text-xl">verified_user</span>
        <span className="text-[#2C5F8A] font-bold tracking-wider text-sm">SAFEVOICE SECURE</span>
      </div>
    </div>
  );
}
