"use client";

import { useFileStore } from "@/stores/file-store";
import { useBackgroundStore } from "@/stores/bg-store";

export const FilePreview = () => {
  const { selectedFile, imageUrl } = useFileStore();
  const { backgroundColor } = useBackgroundStore();

  if (!selectedFile || !imageUrl) {
    return (
      <div
        className="rounded-md"
        style={{
          background: backgroundColor,
          width: 700,
          height: 500,
          aspectRatio: "16 / 9",
        }}
      ></div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center rounded-md"
      style={{
        background: backgroundColor,
        width: 700,
        height: 500,
        aspectRatio: "16 / 9",
      }}
    >
      <img
        src={imageUrl}
        alt={selectedFile.name}
        className="rounded-lg pointer-events-none"
        style={{
          maxWidth: "70%",
          maxHeight: "70%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
