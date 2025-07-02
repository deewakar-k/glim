import {
  Circle,
  MousePointer2,
  MoveUpRight,
  SquareIcon,
  Type,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FileUpload } from "./file-upload";

export const Toolbar = () => {
  return (
    <div
      className="w-fit px-4 py-2 flex h-12 space-x-3 items-center rounded-md bg-surface shadow-sm shadow-neutral-700"
      style={{
        boxShadow: `
  rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset
`,
      }}
    >
      <Button variant="ghost" size="icon">
        <MousePointer2 />
      </Button>

      <Button variant="ghost" size="icon">
        <MoveUpRight />
      </Button>

      <Button variant="ghost" size="icon">
        <Circle />
      </Button>

      <Button variant="ghost" size="icon">
        <SquareIcon />
      </Button>

      <Button variant="ghost" size="icon">
        <Type />
      </Button>
      <Separator orientation="vertical" />

      <FileUpload />
    </div>
  );
};
