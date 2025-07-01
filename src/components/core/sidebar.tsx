import { ClipboardIcon, DownloadIcon } from "lucide-react";
import { BackgroundPicker } from "../backgrounds";
import { DesignSettings } from "../design-settings";
import { Separator } from "../ui/separator";
import { GlowingButton } from "../ui/glowing-button";
import { Button } from "../ui/button";

export const Sidebar = () => {
  return (
    <div className="w-96 h-[calc(100vh-1rem)] border rounded-md p-6">
      <BackgroundPicker />
      <Separator />
      <DesignSettings />
      <Separator />
      <ExportButton />
    </div>
  );
};

const ExportButton = () => {
  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        <GlowingButton className="w-full cursor-pointer">
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
