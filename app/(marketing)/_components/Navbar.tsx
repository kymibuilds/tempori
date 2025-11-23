"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useConvexAuth } from "convex/react";

function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 fixed top-0 flex items-center w-full h-16 px-4 md:px-6",
        !scrolled && "py-3",
        // default transparent until scrolled
        "bg-transparent",
        "transition-all duration-300 ease-in-out",
        scrolled &&
          "border-b border-gray-300 shadow-sm backdrop-blur-md bg-white/90"
      )}
    >
      {/* Logo - static dark text */}
      <p className="font-extrabold text-2xl md:text-3xl tracking-tight text-black">
        jottr
      </p>

      <div className="ml-auto flex items-center gap-x-2 md:gap-x-4">
        {isLoading && <Spinner size="lg" />}

        {/* Not authenticated */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button
                size="default"
                variant="ghost"
                className="text-base font-medium text-black transition-all duration-150 border border-transparent hover:scale-[1.03]"
              >
                Log in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button
                size="default"
                className="hidden sm:inline-flex text-base font-medium rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] bg-black text-white"
              >
                Get Jottr Free
              </Button>
            </SignInButton>
          </>
        )}

        {/* Authenticated */}
        {isAuthenticated && !isLoading && (
          <>
            <Button
              size="default"
              variant="ghost"
              asChild
              className="text-black hover:scale-[1.03]"
            >
              <Link
                href="/documents"
                className="text-base font-medium transition-all duration-150 border border-transparent"
              >
                Enter Jottr
              </Link>
            </Button>

            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
