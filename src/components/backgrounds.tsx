"use client";

import { gradientBackgrounds, solidBackgrounds } from "@/lib/background";
import { useBackgroundStore } from "@/stores/bg-store";
import { Button } from "./ui/button";
import { Background } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

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
  return (
    <div className="space-y-3 mb-3">
      <p className="text-muted-foreground text-xs">Custom</p>
      <Button className="border border-dashed" variant="ghost" size="icon">
        <PlusIcon className="text-border" />
      </Button>
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
