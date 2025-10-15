"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { RotateCcw, Trash2 } from "lucide-react";

interface BannerProps {
  documentId: Id<"documents">;
}

function Banner({ documentId }: BannerProps) {
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);
  const router = useRouter();

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting...",
      success: "Note deleted permanently",
      error: "Unable to delete note",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Note restored successfully",
      error: "Unable to restore note",
    });
    router.push(`/documents/${documentId}`);
  };

  return (
    <div className="w-full bg-rose-500 border-b border-rose-500/20 px-4 py-1 flex items-center justify-center gap-3">
      <p className="text-xs text-white font-medium">
        This note is in the trash
      </p>
      <div className="flex items-center gap-2">
        <Button
          onClick={onRestore}
          variant="outline"
          size="sm"
          className="h-7 px-3 text-xs bg-white hover:bg-rose-50 border-rose-200"
        >
          <RotateCcw className="h-3 w-3 mr-1.5" />
          Restore
        </Button>
        <Button
          onClick={onRemove}
          variant="outline"
          size="sm"
          className="h-7 px-3 text-xs bg-white hover:bg-rose-100 border-rose-200 text-rose-700 hover:text-rose-800"
        >
          <Trash2 className="h-3 w-3 mr-1.5" />
          Delete permanently
        </Button>
      </div>
    </div>
  );
}

export default Banner;
