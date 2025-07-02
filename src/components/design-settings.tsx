"use client";

import { aspectRatios } from "@/lib/ratios";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useAspectRatioStore } from "@/stores/aspect-ratio-store";
import { cn } from "@/lib/utils";
import { useAppearanceStore } from "@/stores/appearance-store";

export const Appearance = () => {
  const { padding, boxShadow, borderRadius, inset, setAppearance } =
    useAppearanceStore();

  return (
    <div className="flex flex-col space-y-6 my-6">
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Padding</p>
        <Slider
          value={[padding]}
          onValueChange={(value) => setAppearance("padding", value[0])}
          max={100}
          step={1}
        />
      </div>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Shadows</p>
        <Slider
          value={[boxShadow]}
          onValueChange={(value) => setAppearance("boxShadow", value[0])}
          max={50}
          step={1}
        />
      </div>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Inset</p>
        <Slider
          value={[inset]}
          onValueChange={(value) => setAppearance("inset", value[0])}
          max={100}
          step={1}
        />
      </div>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Corners</p>
        <Slider
          value={[borderRadius]}
          onValueChange={(value) => setAppearance("borderRadius", value[0])}
          max={50}
          step={1}
        />
      </div>
      <AspectRatioSelector />
    </div>
  );
};

const AspectRatioSelector = () => {
  const { selectedRatio, setSelectedRatio } = useAspectRatioStore();

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">Ratios</p>
      <div className="space-x-2">
        {aspectRatios.map((ar) => (
          <Tooltip key={ar.label}>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  "w-10 h-10",
                  selectedRatio?.value === ar.value ? "bg-surface" : "",
                )}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRatio(ar)}
              >
                {ar.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{ar.tooltip}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
