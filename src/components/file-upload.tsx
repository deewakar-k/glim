"use client";

import { useFileStore } from "@/stores/file-store";
import { Input } from "./ui/input";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";

export const FileUpload = () => {
  const { setSelectedFile } = useFileStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    //TODO: support short video clips

    if (!file.type.startsWith("image/")) {
      toast.error("please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("file size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button variant="ghost" size="icon" onClick={handleButtonClick}>
        <ImageIcon />
      </Button>
    </>
  );
};
