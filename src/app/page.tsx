import { FilePreview } from "@/components/file-preview";
import { FileUpload } from "@/components/file-upload";

export default function Home() {
  return (
    <div className="min-h-screen flex gap-10 items-center justify-center">
      <FileUpload />
      <FilePreview />
    </div>
  );
}
