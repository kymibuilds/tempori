"use client";

import Image from "next/image";
import React from "react";

function Heroes() {
  return (
    <div className="relative w-full flex justify-center py-12">
      <Image
        src="/heroImage.png"
        alt="tempori workspace preview"
        width={800}
        height={500}
        className="rounded-xl shadow-md object-contain"
      />
    </div>
  );
}

export default Heroes;
