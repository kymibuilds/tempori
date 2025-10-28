"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
        Work beautifully, think clearly with{" "}
        <span className="underline">tempori</span>
      </h1>
      <h3 className="text-lg md:text-2xl font-normal text-gray-600">
        A fast, privacy-first workspace built for focus. <br />
        Capture ideas, notes, and projects instantly synced with tempori&apos;s browser
        extension.
      </h3>

      {!isLoading && (
        <div className="flex justify-center">
          {isAuthenticated ? (
            <Button
              onClick={() => router.push("/documents")}
              className="group flex items-center"
            >
              Enter Workspace
              <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="group flex items-center">
                Get Started
                <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </SignInButton>
          )}
        </div>
      )}
    </div>
  );
}

export default Heading;
