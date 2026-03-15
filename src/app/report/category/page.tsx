"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReportProgressBar from "@/components/report/ProgressBar";
import PrivacyBanner from "@/components/report/PrivacyBanner";
import Footer from "@/components/Footer";
import { useReportStore } from "@/store/reportStore";

const categories = [
  { id: "sexual_harassment", label: "Sexual Harassment", icon: "person_off" },
  { id: "verbal_abuse", label: "Verbal or Emotional Abuse", icon: "record_voice_over" },
  { id: "bullying", label: "Workplace / Academic Bullying", icon: "groups" },
  { id: "discrimination", label: "Discrimination", icon: "diversity_3" },
  { id: "physical_misconduct", label: "Physical Misconduct", icon: "personal_injury" },
  { id: "retaliation", label: "Retaliation or Threats", icon: "warning" },
];

export default function CategorySelectionPage() {
  const router = useRouter();
  const { category, setCategory } = useReportStore();

  return (
    <div className="min-h-screen flex flex-col">
      <ReportProgressBar currentStep={1} />

      <main className="flex-grow container max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            What type of incident are you reporting?
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Select the category that best describes what happened. You can add more specific details in
            the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categories.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-4 p-5 rounded-lg shadow-sm text-left group transition-colors relative ${
                  isSelected
                    ? "bg-[#2C5F8A]/5 border-2 border-[#2C5F8A]"
                    : "bg-white border border-slate-200 hover:border-[#2C5F8A]"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? "bg-[#2C5F8A]/20 text-[#2C5F8A]"
                      : "bg-slate-50 text-slate-600 group-hover:bg-[#2C5F8A]/10 group-hover:text-[#2C5F8A]"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{cat.label}</h3>
                  {isSelected && (
                    <p className="text-xs text-[#2C5F8A] font-bold mt-1 uppercase tracking-wider">
                      Selected
                    </p>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 text-[#2C5F8A]">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <PrivacyBanner />

        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-200">
          <Link
            href="/"
            className="text-slate-600 font-semibold flex items-center gap-2 hover:text-[#2C5F8A] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </Link>
          <button
            onClick={() => {
              if (category) router.push("/report/incidents");
            }}
            disabled={!category}
            className="bg-[#2C5F8A] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
