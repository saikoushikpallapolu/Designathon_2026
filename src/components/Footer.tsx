export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 px-6 py-8 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="text-sm font-semibold text-slate-600">
          VNR VJIET | CSBS Department
        </div>
        <div className="text-xs font-medium uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">security</span>
          Confidential — For campus use only
        </div>
      </div>
    </footer>
  );
}
