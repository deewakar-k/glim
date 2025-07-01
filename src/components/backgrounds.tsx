"use client";

import { gradientBackgrounds, solidBackgrounds } from "@/lib/background";
import { useBackgroundStore } from "@/stores/bg-store";
import { Button } from "./ui/button";
import { Background } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BackgroundSectionProps {
  title: string;
  backgrounds: Background[];
}

const BackgroundSection = ({ title, backgrounds }: BackgroundSectionProps) => {
  const { selectedBackground, setBackground } = useBackgroundStore();
  return (
    <div
      className={cn(
        "grid gap-2",
        title === "solid" ? "grid-cols-8" : "grid-cols-5",
      )}
    >
      {backgrounds.map((background) => (
        <Button
          key={background.id}
          variant="outline"
          className="relative overflow-hidden group"
          onClick={() => setBackground(background)}
          title={background.name}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: background.css,
            }}
          />
        </Button>
      ))}
    </div>
  );
};

export const BackgroundPicker = () => {
  return (
    <div className="flex flex-col gap-4">
      <BackgroundSection title="gradients" backgrounds={gradientBackgrounds} />
      <BackgroundSection title="solid" backgrounds={solidBackgrounds} />
    </div>
  );
};
