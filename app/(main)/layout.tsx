"use client";

import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { redirect, usePathname } from "next/navigation";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import Navbar from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const pathname = usePathname();

  // Check if current route is a preview route
  const isPreviewRoute = pathname?.startsWith("/preview/");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  // Allow preview routes without authentication
  if (!isAuthenticated && !isPreviewRoute) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      {!isPreviewRoute && <Navigation />}
      <main className="flex-1 h-full overflow-y-auto">
        {!isPreviewRoute && <Navbar />}
        {!isPreviewRoute && <SearchCommand />}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
