"use client";
import React, { useState, useEffect } from "react";
import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { notFound } from "next/navigation"; // Add this import

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}

function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = React.use(params); // unwrap the promise
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const document = useQuery(api.documents.getById, { documentId });
  const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined);
  const update = useMutation(api.documents.update);
  
  const onChange = (content: string) => {
    update({
      id: documentId,
      content,
    });
  };
  
  useEffect(() => {
    if (document?.coverImage) setCoverUrl(document.coverImage);
  }, [document]);
  
  if (document === undefined) {
    // show skeleton while loading
    return (
      <div className="pb-40">
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto p-4 rounded-md">
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }
  
  if (document === null) {
    notFound(); // Changed from return <div>Not found</div>
  }
  
  return (
    <div className="pb-40">
      <Cover  preview url={coverUrl} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto p-4 rounded-md">
        <Toolbar preview initialData={document} />
        <Editor editable={false} onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}

export default DocumentIdPage;