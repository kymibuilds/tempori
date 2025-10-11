"use client";

import Image from "next/image";
import React from "react";

function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen">
      <div className="flex items-center">
        <div className="relative w-[400px] h-[400px] sm:w-[500px] md:w-[600px] md:h-[600px]">
          <Image
            src="/heroImage.png"
            fill
            className="object-contain"
            alt="image"
          />
        </div>
        <div className="relative">

        </div>
      </div>
    </div>
  );
}

export default Heroes;
