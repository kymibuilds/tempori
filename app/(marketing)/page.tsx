import React from "react";
import Heading from "./_components/Heading";
import Footer from "./_components/Footer";
import Features from "./_components/Features";
import Content from "./_components/Content";
import Newsbox from "./_components/Newsbox";

function MarketingPage() {
  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-white text-[#2f3437]
        dark:bg-white dark:text-[#2f3437]
        relative
      "
    >
      {/* Background Image with Fade In/Out Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat h-screen opacity-40"
        style={{
          backgroundImage: "url('/background.jpg')",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.8) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.8) 70%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 relative z-10">
        <Heading />
      </div>

      {/* Features Section */}
      <div className="relative z-10">
        <Features />
        <Content />
      </div>

      <div className="relative z-10 pb-4">
        <Footer />
      </div>

      <div className="fixed right-4 bottom-4 z-50">
        <Newsbox />
      </div>
    </div>
  );
}

export default MarketingPage;
