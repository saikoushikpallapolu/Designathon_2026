import Link from "next/link";

interface ReportProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ReportProgressBar({ currentStep, totalSteps = 6 }: ReportProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <>
      <div className="h-1 bg-[#2C5F8A] w-full" />
      <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
        <div
          className="bg-[#2C5F8A] h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <nav className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#2C5F8A]">
              <span className="material-symbols-outlined text-3xl font-bold">shield_with_heart</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">SafeVoice</h1>
          </Link>
          <div className="text-slate-500 text-sm font-medium">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2C5F8A]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#2C5F8A] text-xl">person</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
