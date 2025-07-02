import { gradientBackgrounds } from "@/lib/background";
import { Background } from "@/lib/types";
import { create } from "zustand";

interface BackgroundState {
  selectedBackground: Background;
  setBackground: (background: Background) => void;
}

export const useBackgroundStore = create<BackgroundState>()((set) => ({
  selectedBackground: gradientBackgrounds[0],
  setBackground: (background) => set({ selectedBackground: background }),
}));
