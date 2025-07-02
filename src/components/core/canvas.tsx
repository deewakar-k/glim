import { FilePreview } from "../file-preview";
import { Toolbar } from "../toolbar";

export const Canvas = () => {
  return (
    <div className="w-full h-[calc(100vh-1rem)] border rounded-md">
      <div className="flex items-center justify-center h-[calc(100vh-1rem)]">
        <FilePreview />
      </div>
      <div className="fixed bottom-8 left-2/4">
        <Toolbar />
      </div>
    </div>
  );
};
