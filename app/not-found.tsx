"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <span className="text-7xl mb-6 block">🔍</span>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button onClick={()=>router.push("/documents")}>
          Go Back
        </Button>
      </div>
    </div>
  );
}