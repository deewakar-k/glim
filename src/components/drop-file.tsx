import Image from "next/image";
import { useFileStore } from "@/stores/file-store";
import { ChangeEvent, useRef, DragEvent } from "react";
import { toast } from "sonner";

export const DropFile = () => {
  const { setSelectedFile } = useFileStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndSetFile(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndSetFile(files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className="flex gap-4 flex-col items-center cursor-pointer p-8"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Image
          src={"/folder-icon.png"}
          width={50}
          height={50}
          alt="drop folder icon"
        />
        <div className="flex flex-col gap-px items-center">
          <h1 className="text-sm text-neutral-200/80 font-medium">
            Drag and drop your files here
          </h1>
          <p className="text-sm flex text-neutral-200/80 items-center gap-1">
            or,{" "}
            <span className="text-neutral-100 underline underline-offset-2">
              click to browse.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
