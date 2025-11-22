import React from "react";
import Navbar from "./_components/Navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        h-full
        bg-white text-black
        dark:bg-white dark:text-black
      "
    >
      <Navbar />

      <main className="h-full">
        {children}
      </main>
    </div>
  );
}

export default MarketingLayout;
