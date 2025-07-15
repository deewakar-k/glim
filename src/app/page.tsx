"use client";

import { Canvas } from "@/components/core/canvas";
import { Sidebar } from "@/components/core/sidebar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(`
                          
       ,--.,--.           
 ,---. |  |\`--',--,--,--. 
| .-. ||  |,--.|        | 
' '-' '|  ||  ||  |  |  | 
.\`-  / \`--'\`--'\`--\`--\`--' 
\`---'                     
`);
    console.log(`
github: https://github.com/deewakar-k/glim
twitter: https://x.com/deewakar01
`);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
      <Sidebar className="order-2 sm:order-1" />
      <Canvas className="order-1 sm:order-2" />
    </div>
  );
}
