import { aspectRatios } from "@/lib/ratios";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

export const DesignSettings = () => {
  return (
    <div className="flex flex-col space-y-6 my-6">
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Padding</p>
        <Slider />
      </div>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Shadows</p>
        <Slider />
      </div>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Inset</p>
        <Slider />
      </div>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Corners</p>
        <Slider />
      </div>
      <AspectRatioSelector />
    </div>
  );
};

const AspectRatioSelector = () => {
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">Ratios</p>
      <div className="space-x-2">
        {aspectRatios.map((ar) => (
          <Button
            className="w-10 h-10"
            variant="ghost"
            size="sm"
            key={ar.label}
          >
            {ar.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
