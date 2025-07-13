"use client";

/* eslint-disable */

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
      backgroundValue={selectedBackground?.css || selectedBackground?.fileUrl}
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
  backgroundValue?: string;
  aspectRatio: number;
  padding: number;
  boxShadow: number;
  borderRadius: number;
  inset: number;
  alt: string;
}

const WIDE_CANVAS_WIDTH = 1200;
const TALL_CANVAS_HEIGHT = 900;

function debounce(fn: (...args: any[]) => void, delay: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

const FilePreviewCanvas: React.FC<FilePreviewCanvasProps> = ({
  imageUrl,
  backgroundValue,
  aspectRatio,
  padding,
  boxShadow,
  borderRadius,
  inset,
  alt,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const isTall = aspectRatio < 1;

  let width: number;
  let height: number;
  let effectivePadding = padding;
  if (isMobile && isTall) {
    width = 1080;
    height = 1920;
    effectivePadding = 10;
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
  // FIX: Add ref and loaded state for the background image.
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [bgImgLoaded, setBgImgLoaded] = React.useState(false);

  // FIX: Check if the background is an image URL.
  const isBackgroundImage =
    backgroundValue?.startsWith("http") ||
    backgroundValue?.startsWith("data:image");

  // Preload and cache the main image
  useEffect(() => {
    setImgLoaded(false);
    const img = new window.Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin loading
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // FIX: Preload and cache the background image if it is one.
  useEffect(() => {
    if (isBackgroundImage && backgroundValue) {
      setBgImgLoaded(false);
      const bgImg = new window.Image();
      bgImg.crossOrigin = "anonymous"; // Important for canvas security
      bgImg.onload = () => {
        bgImgRef.current = bgImg;
        setBgImgLoaded(true);
      };
      // In case the background image fails to load, we can fall back.
      bgImg.onerror = () => {
        bgImgRef.current = null;
        setBgImgLoaded(false); // Mark as not loaded
      };
      bgImg.src = backgroundValue;
    }
  }, [backgroundValue, isBackgroundImage]);

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Draw Background ---
    // FIX: New logic to handle drawing a background image.
    if (isBackgroundImage && bgImgLoaded && bgImgRef.current) {
      ctx.drawImage(bgImgRef.current, 0, 0, canvas.width, canvas.height);
    }
    // FIX: Fallback to the original logic for gradients and colors.
    else if (backgroundValue && !isBackgroundImage) {
      if (backgroundValue.startsWith("linear-gradient")) {
        const stopsMatch = backgroundValue.match(
          /linear-gradient\([^,]+,(.*)\)/,
        );
        if (stopsMatch) {
          const stops = stopsMatch[1].split(",").map((s) => s.trim());
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
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
              try {
                grad.addColorStop(pos, color);
              } catch (_e) {
                /* skip */
              }
            }
          });
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = "#fff";
        }
      } else if (backgroundValue.startsWith("radial-gradient")) {
        const stopsMatch = backgroundValue.match(
          /radial-gradient\([^,]+,(.*)\)/,
        );
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
              try {
                grad.addColorStop(pos, color);
              } catch (e) {
                /* skip */
              }
            }
          });
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = "#fff";
        }
      } else {
        ctx.fillStyle = backgroundValue;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // --- The rest of your drawing logic remains the same ---
    if (inset > 0) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.filter = `blur(${inset}px)`;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

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
    backgroundValue,
    aspectRatio,
    padding,
    boxShadow,
    borderRadius,
    inset,
    width,
    height,
    effectivePadding,
    isBackgroundImage,
    bgImgLoaded,
  ]);

  // Debounce redraw and only draw after all necessary images are loaded
  useEffect(() => {
    const readyToDraw =
      imgLoaded && (!isBackgroundImage || (isBackgroundImage && bgImgLoaded));

    if (!readyToDraw) return;
    const debouncedDraw = debounce(draw, 80);
    debouncedDraw();
  }, [draw, imgLoaded, bgImgLoaded, isBackgroundImage]);

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
        borderRadius: 0,
        boxShadow: undefined,
        display: "block",
        background: "transparent",
        margin: "0 auto",
      }}
    />
  );
};
