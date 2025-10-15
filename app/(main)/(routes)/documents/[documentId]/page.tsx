"use client";

import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}

function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = React.use(params); // unwrap the promise
  const document = useQuery(api.documents.getById, { documentId });

  if (document === undefined) return <div>Loading....</div>;
  if (document === null) return <div>Not found</div>;

  return (
    <div className="pb-40">
      <div className="h-[15vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto  p-4 rounded-md">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}

export default DocumentIdPage;
