"use client";

import { useFileStore } from "@/stores/file-store";
import { Card } from "./ui/card";
import { useBackgroundStore } from "@/stores/bg-store";

export const FilePreview = () => {
  const { selectedFile, imageUrl, clearFile } = useFileStore();
  const { backgroundColor } = useBackgroundStore();

  if (!selectedFile || !imageUrl) {
    return (
      <Card
        className="w-full h-64 items-center justify-center border-dashed"
        style={{ background: backgroundColor }}
      >
        <p>no file selected</p>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden w-full">
      <div
        className="absolute inset-0"
        style={{ background: backgroundColor }}
      />
      <div className="relative p-8">
        <img
          src={imageUrl}
          alt={selectedFile?.name}
          className="w-full h-auto max-h-96 object-contain rounded-xl shadow-lg"
        />
      </div>
    </Card>
  );
};
