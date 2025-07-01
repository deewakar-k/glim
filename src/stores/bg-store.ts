import { Background } from "@/lib/types";
import { create } from "zustand";

interface BackgroundState {
  selectedBackground: Background | null;
  backgroundColor: string;
  setBackground: (background: Background) => void;
  clearBackground: () => void;
}

export const useBackgroundStore = create<BackgroundState>()((set) => ({
  selectedBackground: null,
  backgroundColor: "#ffffff",

  setBackground: (background) => {
    set({
      selectedBackground: background,
      backgroundColor: background.css,
    });
  },

  clearBackground: () => {
    set({
      selectedBackground: null,
      backgroundColor: "#ffffff",
    });
  },
}));
