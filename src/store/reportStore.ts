import { create } from "zustand";

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
  setCategory: (category: string) => void;
  setIncidentDetails: (details: Partial<Pick<ReportState, "dateFrom" | "dateTo" | "location" | "description" | "isPattern" | "respondentRole">>) => void;
  setContext: (context: Partial<Pick<ReportState, "hasWitnesses" | "witnessGroup" | "evidence" | "desiredOutcome">>) => void;
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
};

export const useReportStore = create<ReportState>((set) => ({
  ...initialState,
  setCategory: (category) => set({ category }),
  setIncidentDetails: (details) => set((state) => ({ ...state, ...details })),
  setContext: (context) => set((state) => ({ ...state, ...context })),
  reset: () => set(initialState),
}));
