"use client";

import { useFileStore } from "@/stores/file-store";
import { useBackgroundStore } from "@/stores/bg-store";
import { useAspectRatioStore } from "@/stores/aspect-ratio-store";
import { useAppearanceStore } from "@/stores/appearance-store";

export const FilePreview = () => {
  const { selectedFile, imageUrl } = useFileStore();
  const { backgroundColor } = useBackgroundStore();
  const { selectedRatio } = useAspectRatioStore();
  const { padding, boxShadow, borderRadius, inset } = useAppearanceStore();

  if (!selectedFile || !imageUrl) {
    return (
      <div
        className="rounded-md"
        style={{
          background: backgroundColor,
          height: 500,
          aspectRatio: selectedRatio?.value,
        }}
      ></div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center rounded-md"
      style={{
        background: backgroundColor,
        height: 500,
        aspectRatio: selectedRatio?.value,
        padding: `${padding}px`,
        boxShadow: inset > 0 ? `inset 0 0 ${inset}px rgba(0, 0, 0, 0.5)` : "",
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          borderRadius: `${borderRadius}px`,
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
            borderRadius: `${borderRadius}px`,
            boxShadow:
              boxShadow > 0
                ? `0 ${boxShadow}px ${boxShadow * 2}px rgba(0, 0, 0, 0.3)`
                : "",
          }}
        />
      </div>
    </div>
  );
};
