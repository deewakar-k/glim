"use client";

import { useFileStore } from "@/stores/file-store";
import { useBackgroundStore } from "@/stores/bg-store";
import { useAspectRatioStore } from "@/stores/aspect-ratio-store";
import { useAppearanceStore } from "@/stores/appearance-store";
import React, { useRef, useEffect } from "react";
import { DropFile } from "./drop-file";

export const FilePreview = () => {
  const { selectedFile, imageUrl } = useFileStore();
  const { selectedBackground } = useBackgroundStore();
  const { selectedRatio } = useAspectRatioStore();
  const { padding, boxShadow, borderRadius, inset } = useAppearanceStore();

  if (!selectedFile || !imageUrl) {
    return <DropFile />;
  }

  return (
    <FilePreviewCanvas
      imageUrl={imageUrl}
      background={selectedBackground?.css}
      aspectRatio={selectedRatio?.ratio || 1}
      padding={padding}
      boxShadow={boxShadow}
      borderRadius={borderRadius}
      inset={inset}
      alt={selectedFile.name}
    />
  );
};

interface FilePreviewCanvasProps {
  imageUrl: string;
  background?: string;
  aspectRatio: number;
  padding: number;
  boxShadow: number;
  borderRadius: number;
  inset: number;
  alt: string;
}

const WIDE_CANVAS_WIDTH = 1200;
const TALL_CANVAS_HEIGHT = 900;

// Add debounce utility
function debounce(fn: (...args: any[]) => void, delay: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

const FilePreviewCanvas: React.FC<FilePreviewCanvasProps> = ({
  imageUrl,
  background,
  aspectRatio,
  padding,
  boxShadow,
  borderRadius,
  inset,
  alt,
}) => {
  // Detect mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const isTall = aspectRatio < 1;

  // Fixed size for mobile portrait (e.g., 9:16)
  let width: number;
  let height: number;
  let effectivePadding = padding;
  if (isMobile && isTall) {
    width = 1080;
    height = 1920;
    effectivePadding = 10; // override padding for mobile portrait
  } else {
    width = isTall
      ? Math.round(TALL_CANVAS_HEIGHT * aspectRatio)
      : WIDE_CANVAS_WIDTH;
    height = isTall
      ? TALL_CANVAS_HEIGHT
      : Math.round(WIDE_CANVAS_WIDTH / aspectRatio);
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  // Preload and cache the image
  useEffect(() => {
    setImgLoaded(false);
    const img = new window.Image();
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Debounced draw function
  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background
    if (background) {
      // Try to parse linear/radial-gradient or fallback to fillStyle
      if (background.startsWith("linear-gradient")) {
        // Robust linear-gradient parser for color stops
        const stopsMatch = background.match(/linear-gradient\([^,]+,(.*)\)/);
        if (stopsMatch) {
          const stops = stopsMatch[1].split(",").map((s) => s.trim());
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0); // vertical by default
          stops.forEach((stop, i) => {
            // Match color and optional position
            const match = stop.match(
              /((#[0-9a-fA-F]{3,6})|(rgba?\([^\)]+\))|(hsla?\([^\)]+\))|([a-zA-Z]+))\s*(\d+%?)?/,
            );
            if (match) {
              const color = match[1];
              let pos: number;
              if (typeof match[7] === "string" && match[7].endsWith("%"))
                pos = parseFloat(match[7]) / 100;
              else if (typeof match[7] === "string" && match[7])
                pos = parseFloat(match[7]);
              else pos = i / (stops.length - 1); // auto spread if no pos
              // Only add valid color stops
              if (
                color.startsWith("#") ||
                color.startsWith("rgb") ||
                color.startsWith("hsl") ||
                /^[a-zA-Z]+$/.test(color)
              ) {
                try {
                  grad.addColorStop(pos, color);
                } catch (e) {
                  // skip invalid stops
                }
              }
            }
          });
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = "#fff";
        }
      } else if (background.startsWith("radial-gradient")) {
        // Robust radial-gradient parser for color stops
        const stopsMatch = background.match(/radial-gradient\([^,]+,(.*)\)/);
        if (stopsMatch) {
          const stops = stopsMatch[1].split(",").map((s) => s.trim());
          const grad = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            Math.max(canvas.width, canvas.height) / 2,
          );
          stops.forEach((stop, i) => {
            const match = stop.match(
              /((#[0-9a-fA-F]{3,6})|(rgba?\([^\)]+\))|(hsla?\([^\)]+\))|([a-zA-Z]+))\s*(\d+%?)?/,
            );
            if (match) {
              const color = match[1];
              let pos: number;
              if (typeof match[7] === "string" && match[7].endsWith("%"))
                pos = parseFloat(match[7]) / 100;
              else if (typeof match[7] === "string" && match[7])
                pos = parseFloat(match[7]);
              else pos = i / (stops.length - 1);
              // Only add valid color stops
              if (
                color.startsWith("#") ||
                color.startsWith("rgb") ||
                color.startsWith("hsl") ||
                /^[a-zA-Z]+$/.test(color)
              ) {
                try {
                  grad.addColorStop(pos, color);
                } catch (e) {
                  // skip invalid stops
                }
              }
            }
          });
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = "#fff";
        }
      } else {
        ctx.fillStyle = background;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // Draw inset shadow if needed
    if (inset > 0) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.filter = `blur(${inset}px)`;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    // Draw image with border radius, box shadow, and padding
    const areaX = effectivePadding;
    const areaY = effectivePadding;
    const areaW = canvas.width - effectivePadding * 2;
    const areaH = canvas.height - effectivePadding * 2;
    const maxImgW = areaW * 0.7;
    const maxImgH = areaH * 0.7;
    let drawW = maxImgW;
    let drawH = maxImgH;
    const imgAspect = img.width / img.height;
    if (drawW / drawH > imgAspect) {
      drawW = drawH * imgAspect;
    } else {
      drawH = drawW / imgAspect;
    }
    const drawX = areaX + (areaW - drawW) / 2;
    const drawY = areaY + (areaH - drawH) / 2;
    if (boxShadow > 0) {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = boxShadow * 2;
      ctx.shadowOffsetY = boxShadow;
      ctx.beginPath();
      ctx.moveTo(drawX + borderRadius, drawY);
      ctx.lineTo(drawX + drawW - borderRadius, drawY);
      ctx.quadraticCurveTo(
        drawX + drawW,
        drawY,
        drawX + drawW,
        drawY + borderRadius,
      );
      ctx.lineTo(drawX + drawW, drawY + drawH - borderRadius);
      ctx.quadraticCurveTo(
        drawX + drawW,
        drawY + drawH,
        drawX + drawW - borderRadius,
        drawY + drawH,
      );
      ctx.lineTo(drawX + borderRadius, drawY + drawH);
      ctx.quadraticCurveTo(
        drawX,
        drawY + drawH,
        drawX,
        drawY + drawH - borderRadius,
      );
      ctx.lineTo(drawX, drawY + borderRadius);
      ctx.quadraticCurveTo(drawX, drawY, drawX + borderRadius, drawY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(drawX + borderRadius, drawY);
    ctx.lineTo(drawX + drawW - borderRadius, drawY);
    ctx.quadraticCurveTo(
      drawX + drawW,
      drawY,
      drawX + drawW,
      drawY + borderRadius,
    );
    ctx.lineTo(drawX + drawW, drawY + drawH - borderRadius);
    ctx.quadraticCurveTo(
      drawX + drawW,
      drawY + drawH,
      drawX + drawW - borderRadius,
      drawY + drawH,
    );
    ctx.lineTo(drawX + borderRadius, drawY + drawH);
    ctx.quadraticCurveTo(
      drawX,
      drawY + drawH,
      drawX,
      drawY + drawH - borderRadius,
    );
    ctx.lineTo(drawX, drawY + borderRadius);
    ctx.quadraticCurveTo(drawX, drawY, drawX + borderRadius, drawY);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, [
    background,
    aspectRatio,
    padding,
    boxShadow,
    borderRadius,
    inset,
    width,
    height,
  ]);

  // Debounce redraw and only draw after image is loaded
  useEffect(() => {
    if (!imgLoaded) return;
    const debouncedDraw = debounce(draw, 80);
    debouncedDraw();
  }, [draw, imgLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-label={alt}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: isTall ? "min(100vw, 400px)" : "min(100vw, 600px)",
        maxHeight: "80vh",
        borderRadius: borderRadius,
        boxShadow:
          boxShadow > 0
            ? `0 ${boxShadow}px ${boxShadow * 2}px rgba(0, 0, 0, 0.6)`
            : undefined,
        display: "block",
        background: "transparent",
        margin: "0 auto",
      }}
    />
  );
};
