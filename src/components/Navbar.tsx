"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="h-1 bg-[#2C5F8A] w-full" />
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-[#2C5F8A]">
              <span className="material-symbols-outlined text-4xl">security</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#2C5F8A]">SafeVoice</h1>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/status"
              className="text-sm font-semibold text-slate-600 hover:text-[#2C5F8A] transition-colors"
            >
              Check Case Status
            </Link>
            <Link
              href="/login"
              className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden hover:bg-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-slate-400">person</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
