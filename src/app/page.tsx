import { Canvas } from "@/components/core/canvas";
import { Sidebar } from "@/components/core/sidebar";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
      <Sidebar className="order-2 sm:order-1" />
      <Canvas className="order-1 sm:order-2" />
    </div>
  );
}
