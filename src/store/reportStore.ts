import { create } from "zustand";

export interface SubmissionResult {
  token: string;
  caseId: string;
  severity: number;
  recommendation: string;
  slaHours: number;
}

export interface ReportState {
  category: string;
  dateFrom: string;
  dateTo: string;
  location: string;
  description: string;
  isPattern: boolean;
  respondentRole: string;
  hasWitnesses: boolean;
  witnessGroup: string;
  evidence: string[];
  desiredOutcome: string[];
  submissionResult: SubmissionResult | null;
  submitting: boolean;
  submitError: string | null;
  setCategory: (category: string) => void;
  setIncidentDetails: (details: Partial<Pick<ReportState, "dateFrom" | "dateTo" | "location" | "description" | "isPattern" | "respondentRole">>) => void;
  setContext: (context: Partial<Pick<ReportState, "hasWitnesses" | "witnessGroup" | "evidence" | "desiredOutcome">>) => void;
  submitReport: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  category: "",
  dateFrom: "",
  dateTo: "",
  location: "",
  description: "",
  isPattern: false,
  respondentRole: "",
  hasWitnesses: false,
  witnessGroup: "",
  evidence: [],
  desiredOutcome: [],
  submissionResult: null,
  submitting: false,
  submitError: null,
};

export const useReportStore = create<ReportState>((set, get) => ({
  ...initialState,
  setCategory: (category) => set({ category }),
  setIncidentDetails: (details) => set((state) => ({ ...state, ...details })),
  setContext: (context) => set((state) => ({ ...state, ...context })),
  submitReport: async () => {
    const state = get();
    set({ submitting: true, submitError: null });
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: state.category,
          description: state.description,
          location: state.location,
          dateRange: { from: state.dateFrom, to: state.dateTo },
          isRecurring: state.isPattern,
          respondentRole: state.respondentRole,
          witnessPresent: state.hasWitnesses,
          witnessGroup: state.witnessGroup,
          desiredOutcome: state.desiredOutcome,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }
      const data = await res.json();
      set({
        submitting: false,
        submissionResult: {
          token: data.token,
          caseId: data.caseId,
          severity: data.severity,
          recommendation: data.recommendation,
          slaHours: data.slaHours,
        },
      });
    } catch (e: unknown) {
      set({
        submitting: false,
        submitError: e instanceof Error ? e.message : "Submission failed",
      });
    }
  },
  reset: () => set(initialState),
}));
