import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <div className="flex items-center justify-between w-full px-6 border-t text-sm text-gray-500 bg-white">
      <Logo />
      <div className="flex items-center gap-x-4">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms
        </Button>
      </div>
    </div>
  );
}

export default Footer;
