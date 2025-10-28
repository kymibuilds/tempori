import React from "react";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Features from "./_components/Features";
import Footer from "./_components/Footer";

function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2f3437]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <Features />
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;
