"use client";

import { gradientBackgrounds, solidBackgrounds } from "@/lib/background";
import { useBackgroundStore } from "@/stores/bg-store";
import { Button } from "./ui/button";
import { Background } from "@/lib/types";
import { cn, convertFileToDataURL } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface BackgroundSectionProps {
  title: string;
  backgrounds: Background[];
}

const BackgroundSection = ({ title, backgrounds }: BackgroundSectionProps) => {
  const { selectedBackground, setBackground } = useBackgroundStore();
  const isSolid = title === "Solid";

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">{title}</p>
      <div
        className={cn("grid gap-1.5", isSolid ? "grid-cols-8" : "grid-cols-5")}
      >
        {backgrounds.map((background) => (
          <Button
            key={background.id}
            variant="ghost"
            size="sm"
            className={cn(
              "relative overflow-hidden group hover:scale-105 transition-transform p-0",
              isSolid ? "w-6 h-6" : "w-10 h-10 mt-2",
            )}
            onClick={() => setBackground(background)}
            title={background.name}
          >
            <div
              className={cn(
                "absolute inset-0",
                isSolid
                  ? "rounded-full w-4 h-4 m-1"
                  : "w-full h-full rounded-md",
              )}
              style={{ background: background.css }}
            />
            {selectedBackground?.id === background.id && (
              <div className="absolute inset-0 ring-2 ring-primary ring-offset-1 rounded-md" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const CustomBackground = () => {
  const { selectedBackground, setBackground } = useBackgroundStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBackgroundChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("please select an image or gif file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("file size must be less than 10MB");
      return;
    }

    const fileUrl = await convertFileToDataURL(file);
    const customBackground: Background = {
      id: `custom-${Date.now()}`,
      name: file.name,
      css: "",
      preview: fileUrl,
      fileUrl,
    };

    setBackground(customBackground);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3 mb-3">
      <p className="text-muted-foreground text-xs">Custom</p>
      <Input
        ref={inputRef}
        onChange={handleBackgroundChange}
        type="file"
        className="hidden"
      />
      <div className="flex items-center gap-2">
        <Button
          onClick={handleButtonClick}
          className="border border-dashed"
          variant="ghost"
          size="icon"
          aria-label="Upload custom background"
        >
          <PlusIcon className="text-border" />
        </Button>

        {selectedBackground.fileUrl && (
          <div
            className="h-9 w-9 cursor-pointer rounded-md bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedBackground.fileUrl})` }}
            aria-label="Current custom background preview. Click to change."
            role="button"
          />
        )}
      </div>
    </div>
  );
};

export const BackgroundPicker = () => {
  return (
    <div className="flex flex-col gap-4 my-4">
      <BackgroundSection title="Gradients" backgrounds={gradientBackgrounds} />
      <BackgroundSection title="Solid" backgrounds={solidBackgrounds} />
      <CustomBackground />
    </div>
  );
};
