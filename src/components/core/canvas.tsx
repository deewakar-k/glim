"use client";

import { useFileStore } from "@/stores/file-store";
import { FilePreview } from "../file-preview";
import { useEffect } from "react";

export const Canvas = () => {
  const { setSelectedFile } = useFileStore();

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData;
      if (!clipboardData) return;

      const items = Array.from(clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith("image/"));

      if (imageItem) {
        e.preventDefault();

        const file = imageItem.getAsFile();
        if (file) {
          const namedFile = new File([file], `${Date.now()}`, {
            type: file.type,
            lastModified: Date.now(),
          });

          setSelectedFile(namedFile);
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [setSelectedFile]);

  return (
    <div className="w-full h-[calc(100vh-1rem)] border rounded-md">
      <div className="flex items-center justify-center h-[calc(100vh-1rem)]">
        <FilePreview />
      </div>
    </div>
  );
};
