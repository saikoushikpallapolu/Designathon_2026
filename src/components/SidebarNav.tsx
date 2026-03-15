"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/cases", icon: "work", label: "My Cases" },
  { href: "/admin", icon: "folder_managed", label: "All Cases" },
  { href: "/audit", icon: "history", label: "Audit Log" },
];

const bottomItems = [
  { href: "#", icon: "settings", label: "Settings" },
];

interface SidebarNavProps {
  userName?: string;
  userRole?: string;
}

export default function SidebarNav({ userName = "Sarah Jenkins", userRole = "HR Officer" }: SidebarNavProps) {
  const pathname = usePathname();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="w-64 bg-[#2C5F8A] text-white flex flex-col fixed h-full shadow-xl z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-2xl">shield_person</span>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">SafeVoice</h1>
          <p className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded inline-block uppercase tracking-wider font-bold">
            Enterprise
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors text-white/80 hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            {initials}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold truncate">{userName}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">
              {userRole}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
