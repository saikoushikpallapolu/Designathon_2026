"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StatusPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const handleCheck = () => {
    if (token.trim()) {
      router.push(`/status/${token.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2C5F8A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[#2C5F8A] text-3xl">search</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Check Case Status</h1>
            <p className="text-slate-600">
              Enter your secure case token to view your report status and timeline.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Case Token
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value.toUpperCase())}
              placeholder="SVX-XXXX-XXXX-XXXX"
              className="w-full rounded-lg border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A] font-mono text-lg text-center tracking-wider p-4"
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
            <button
              onClick={handleCheck}
              disabled={!token.trim()}
              className="w-full mt-4 bg-[#2C5F8A] text-white py-3 rounded-lg font-bold hover:bg-[#2C5F8A]/90 transition-all shadow-lg shadow-[#2C5F8A]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">lock_open</span>
              Check Status
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Your token was provided when you submitted your report. We cannot recover lost tokens.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
