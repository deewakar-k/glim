import { aspectRatios } from "@/lib/ratios";
import { AspectRatioOption } from "@/lib/types";
import { create } from "zustand";

interface AspectRatioState {
  selectedRatio: AspectRatioOption | null;
  setSelectedRatio: (ratio: AspectRatioOption) => void;
}

export const useAspectRatioStore = create<AspectRatioState>((set) => ({
  selectedRatio: aspectRatios.find((ar) => ar.value === "16 / 9") || null,
  setSelectedRatio: (ratio) => set({ selectedRatio: ratio }),
}));
