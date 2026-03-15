export default function PrivacyBanner() {
  return (
    <div className="bg-[#2C5F8A]/10 border border-[#2C5F8A]/20 rounded-lg p-4 flex items-center gap-4">
      <span className="material-symbols-outlined text-[#2C5F8A]">lock</span>
      <p className="text-sm text-slate-700">
        <span className="font-bold">Privacy Guaranteed:</span> Your IP address is never stored. This form is
        encrypted for your security and anonymity.
      </p>
    </div>
  );
}
