"use client";

import { useFileStore } from "@/stores/file-store";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export const FileUpload = () => {
  const { setSelectedFile } = useFileStore();

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
    }

    setSelectedFile(file);
  };

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};
