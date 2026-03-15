import Link from "next/link";

const timelineEvents = [
  { label: "Report received and encrypted", time: "Mar 12, 09:14", done: true },
  { label: "AI assessment completed — routed to HR officer", time: "Mar 12, 09:15", done: true },
  { label: "Investigator confirmed receipt", time: "Mar 12, 11:02", done: true },
  { label: "Investigation in progress", time: "Estimated Mar 19", done: false },
  { label: "Resolution", time: "Pending", done: false },
];

export default async function StatusDetailPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="flex h-full grow flex-col">
        {/* Navigation */}
        <header className="bg-white border-b border-slate-200 px-6 lg:px-40 py-4 flex items-center justify-between sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">shield_person</span>
            </div>
            <h2 className="text-slate-900 text-xl font-bold tracking-tight">SafeVoice</h2>
          </Link>
          <Link
            href="/report/category"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">lock</span>
            <span>Secure Report Portal</span>
          </Link>
        </header>

        <main className="max-w-5xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Case Status</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-sm font-medium uppercase tracking-wider">Case ID:</span>
                <code className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[#2C5F8A] font-bold">
                  {token}
                </code>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full border border-amber-200">
                <span className="material-symbols-outlined text-base">priority_high</span>
                <span className="text-sm font-bold">Severity 2</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                <span className="material-symbols-outlined text-base">search</span>
                <span className="text-sm font-bold uppercase tracking-wide">Under Investigation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* SLA Progress */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2C5F8A]">timer</span>
                    Response deadline
                  </h3>
                  <span className="text-slate-900 font-bold text-sm bg-slate-100 px-2 py-1 rounded">
                    43% Elapsed
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: "43%" }}
                  />
                </div>
                <p className="text-slate-500 text-sm">
                  <span className="font-semibold text-amber-600">3 days remaining</span> of 7-day
                  response window
                </p>
              </section>

              {/* Timeline */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-8 px-2">Case timeline</h3>
                <div className="relative space-y-8 ml-4">
                  {timelineEvents.map((event, i) => (
                    <div key={i} className="relative pl-8">
                      {i < timelineEvents.length - 1 && (
                        <div
                          className={`absolute left-[7px] top-5 w-0.5 h-full ${
                            event.done && timelineEvents[i + 1]?.done
                              ? "bg-green-500"
                              : event.done
                              ? "bg-slate-200"
                              : "border-l-2 border-dashed border-slate-300 bg-transparent"
                          }`}
                        />
                      )}
                      <div
                        className={`absolute left-0 top-1 size-4 rounded-full border-4 z-10 ${
                          event.done
                            ? "bg-green-500 border-green-100"
                            : "bg-slate-300 border-white"
                        }`}
                      />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <p
                          className={`font-semibold ${
                            event.done ? "text-slate-900" : "text-slate-500 italic"
                          }`}
                        >
                          {event.label}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Messages */}
            <div className="lg:col-span-1 space-y-6">
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2C5F8A]">chat_bubble</span>
                  Messages from your investigator
                </h3>
                <div className="flex-grow space-y-6 mb-8">
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-[#2C5F8A]">
                    <p className="text-slate-700 text-sm leading-relaxed mb-2">
                      &ldquo;Can you clarify approximately what time of day the March 8th incident
                      occurred?&rdquo;
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Investigator • Mar 13
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-slate-500"
                    htmlFor="response"
                  >
                    Your response
                  </label>
                  <textarea
                    id="response"
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#2C5F8A] focus:border-[#2C5F8A] p-3"
                    placeholder="Type your secure response here..."
                    rows={4}
                  />
                  <button className="w-full bg-[#2C5F8A] text-white py-3 rounded-lg font-bold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">send</span>
                    Send Response
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-col items-center gap-6 border-t border-slate-200 pt-10">
            <button className="text-slate-400 text-sm hover:text-[#2C5F8A] transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">history</span>
              Reopen or appeal this case
            </button>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                © 2026 VNR Vignana Jyothi Institute of Engineering and Technology
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
