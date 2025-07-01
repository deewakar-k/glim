import React from "react";
import { cn } from "@/lib/utils";

interface GlowingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export const GlowingButton = ({
  children,
  glowColor = "rgb(255, 60, 60)",
  className,
  ...props
}: GlowingButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-md flex items-center justify-center gap-2 px-6 py-3 font-medium text-white",
        className,
      )}
      style={{
        backgroundColor: glowColor,
        boxShadow: `
          ${glowColor.replace("rgb", "rgba").replace(")", ", 0.3)")} 0px 0px 72px 0px,
          rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset
        `,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
