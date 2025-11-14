import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

function Footer() {
  return (
    <div className="flex items-center justify-center w-full px-6 py-3 text-sm text-gray-500 bg-transparent">
      <p className="flex items-center justify-center gap-1"> made with <Heart className="text-muted-foreground" strokeWidth={1.15} width={15}/> by kymi</p>
      
    </div>
  );
}

export default Footer;
