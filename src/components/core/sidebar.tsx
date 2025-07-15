"use client";

import { ClipboardIcon, DownloadIcon } from "lucide-react";
import { BackgroundPicker } from "../backgrounds";
import { Separator } from "../ui/separator";
import { GlowingButton } from "../ui/glowing-button";
import { Button } from "../ui/button";
import { Appearance } from "../design-settings";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full h-[calc(60vh-1rem)] sm:w-96 sm:h-[calc(100vh-1rem)] flex flex-col items-center border rounded-md p-2 overflow-y-auto sm:overflow-hidden ${className}`}
    >
      <div className="flex-1 w-full p-2 space-y-4">
        <BackgroundPicker />
        <Separator />
        <Appearance />
        <Separator />
        <ExportButton />
      </div>
    </div>
  );
};

const ExportButton = () => {
  const handleExport = () => {
    const canvas = document.querySelector(
      "canvas[aria-label]",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "export.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        <GlowingButton className="w-full cursor-pointer" onClick={handleExport}>
          <DownloadIcon className="size-4" />
          <span className="text-xs">Export</span>
        </GlowingButton>
        <Button
          size="icon"
          variant="ghost"
          className="border px-5 py-5 cursor-pointer"
        >
          <ClipboardIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
