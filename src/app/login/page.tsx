"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const users = [
  { email: "sarah@vnrvjiet.edu", password: "demo123", role: "HR Officer", name: "Sarah Jenkins", redirect: "/dashboard" },
  { email: "legal@vnrvjiet.edu", password: "demo123", role: "Legal Counsel", name: "Dr. Priya Shah", redirect: "/audit" },
  { email: "ombudsman@vnrvjiet.edu", password: "demo123", role: "Ombudsman", name: "Prof. Kumar", redirect: "/dashboard" },
  { email: "admin@vnrvjiet.edu", password: "demo123", role: "Admin", name: "V. Kumar", redirect: "/admin" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("safevoice_user", JSON.stringify(user));
      router.push(user.redirect);
    } else {
      setError("Invalid credentials. Try: sarah@vnrvjiet.edu / demo123");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <div className="h-1 bg-[#2C5F8A] w-full" />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#2C5F8A] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">shield_person</span>
              </div>
              <h1 className="text-2xl font-bold text-[#2C5F8A]">SafeVoice</h1>
            </Link>
            <p className="text-slate-600">Staff Portal — VNR VJIET</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Sign in to your account</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@vnrvjiet.edu"
                  className="w-full rounded-lg border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A] p-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border-slate-300 focus:ring-[#2C5F8A] focus:border-[#2C5F8A] p-3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2C5F8A] text-white py-3 rounded-lg font-bold hover:bg-[#2C5F8A]/90 transition-all shadow-lg shadow-[#2C5F8A]/20"
              >
                Sign In
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Demo Accounts
              </p>
              <div className="space-y-2">
                {users.map((u) => (
                  <button
                    key={u.email}
                    onClick={() => { setEmail(u.email); setPassword(u.password); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors text-sm flex justify-between items-center"
                  >
                    <span className="text-slate-700 font-medium">{u.name}</span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {u.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
