"use client";

import { useFileStore } from "@/stores/file-store";

export const FilePreview = () => {
  const { selectedFile, imageUrl, clearFile } = useFileStore();

  if (!selectedFile || !imageUrl) {
    return <p>no file selected</p>;
  }

  return (
    <img
      src={imageUrl}
      alt={selectedFile?.name}
      className="w-full h-auto max-h-96 object-contain rounded-sm"
    />
  );
};
