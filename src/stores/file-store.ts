import { create } from "zustand";

interface FileState {
  selectedFile: File | null;
  imageUrl: string | null;
  setSelectedFile: (file: File | null) => void;
  clearFile: () => void;
}

export const useFileStore = create<FileState>()((set, get) => ({
  selectedFile: null,
  imageUrl: null,

  setSelectedFile: (file) => {
    const currentUrl = get().imageUrl;
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }

    const newUrl = file ? URL.createObjectURL(file) : null;

    set({
      selectedFile: file,
      imageUrl: newUrl,
    });
  },

  clearFile: () => {
    const currentUrl = get().imageUrl;
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }

    set({
      selectedFile: null,
      imageUrl: null,
    });
  },
}));
