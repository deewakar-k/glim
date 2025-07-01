import { Canvas } from "@/components/core/canvas";
import { Sidebar } from "@/components/core/sidebar";

export default function Home() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Sidebar />
      <Canvas />
    </div>
  );
}
