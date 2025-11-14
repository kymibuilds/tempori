"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      // transition + default background, then glassy when scrolled
      className={cn(
        "z-50 fixed top-0 flex items-center w-full py-2 px-6 text-[#2f3437] transition-colors duration-300 ease-in-out",
        // default: opaque white
        !scrolled && "bg-white",
        // scrolled: glassmorphism
        scrolled &&
          "bg-white/30 backdrop-blur-md border-b border-neutral-200/30 shadow-sm"
      )}
      // inline fallback for browsers / Tailwind setups that don't include backdrop utilities
      style={{
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <p className="font-black text-3xl">jottr</p>

      <div className="md:ml-auto flex items-center gap-x-3">
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-10 text-lg font-light bg-transparent border-2 border-neutral-800/70 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
              >
                Log in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button
                size="lg"
                className="rounded-xl px-10 text-lg font-light bg-neutral-900 text-white hover:bg-neutral-800 transition-all"
              >
                Get Started
              </Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button size="sm" className="rounded-xl px-6 py-3 font-medium" asChild>
              <Link href="/documents">Enter tempori</Link>
            </Button>

            <UserButton />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
