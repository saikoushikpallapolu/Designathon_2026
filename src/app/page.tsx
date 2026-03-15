import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Ombudsman Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 lg:px-20 text-center">
        <p className="text-sm font-medium text-amber-800">
          <span className="material-symbols-outlined align-middle text-lg mr-2">verified_user</span>
          This platform is monitored by an independent Ombudsman. All reports are reviewed.
        </p>
      </div>

      {/* Hero Section */}
      <section className="bg-[#F8F9FA]">
        <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
          {/* Left Content */}
          <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 lg:py-24">
            <h2 className="text-4xl font-black leading-tight text-[#2C5F8A] lg:text-5xl">
              A safe place to report harassment and misconduct
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              For VNR VJIET students, faculty, and staff. File a confidential report without revealing
              your identity. Every case is tracked, every complaint is heard.
            </p>
            <div className="mt-10">
              <Link
                href="/report/category"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2C5F8A] px-10 py-5 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">lock</span>
                File a Confidential Report — No Login Needed
              </Link>
            </div>

            {/* Trust Pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200">
                <span className="material-symbols-outlined text-base">lock</span> End-to-End Encrypted
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200">
                <span className="material-symbols-outlined text-base">person_off</span> Completely Anonymous
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200">
                <span className="material-symbols-outlined text-base">assignment</span> Every Case Tracked
              </div>
            </div>

            <p className="mt-10 text-sm font-medium text-[#C0392B]">
              If you are in immediate danger, contact campus security: 040-XXXXXXXX
            </p>
          </div>

          {/* Right Control Panel */}
          <div className="flex w-full flex-col justify-center bg-[#1A2744] p-12 text-white lg:w-1/3">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Your report. Your control.</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#2C5F8A]">check_circle</span>
                  <span>No name or email required</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#2C5F8A]">check_circle</span>
                  <span>Only you hold your case token</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#2C5F8A]">check_circle</span>
                  <span>Track your case status anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F8F9FA] px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: "edit_note", title: "1. Submit", desc: "Provide details about the incident. You can upload evidence if available. No personal info needed." },
              { icon: "key", title: "2. Get a Token", desc: "After submission, you'll receive a unique secure token. Save this—it's the only way to access your case." },
              { icon: "analytics", title: "3. Track Progress", desc: "Use your token to check status updates and communicate with investigators anonymously." },
            ].map((step) => (
              <div key={step.title} className="rounded-xl bg-white p-8 shadow-sm border border-slate-200">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#2C5F8A]/10 text-[#2C5F8A]">
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
                <p className="mt-3 text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting Categories Section */}
      <section className="bg-white px-6 py-20 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">What can you report?</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["Sexual Harassment", "Verbal Abuse", "Bullying", "Discrimination", "Physical Misconduct", "Retaliation"].map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-[#2C5F8A] hover:text-[#2C5F8A] cursor-default border-l-4 border-l-amber-500"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
