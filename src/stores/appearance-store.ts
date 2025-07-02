import { create } from "zustand";

interface AppearanceState {
  padding: number;
  boxShadow: number;
  inset: number;
  borderRadius: number;
  setAppearance: (
    key: keyof Omit<AppearanceState, "setAppearance">,
    value: number,
  ) => void;
}

export const useAppearanceStore = create<AppearanceState>((set) => ({
  padding: 0,
  boxShadow: 0,
  borderRadius: 0,
  inset: 0,
  setAppearance: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
}));
