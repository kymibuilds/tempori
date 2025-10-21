"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Trash } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

function Cover({ url, preview }: CoverProps) {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { edgestore } = useEdgeStore();
  const [coverUrl, setCoverUrl] = React.useState(url);
  
  React.useEffect(() => {
    setCoverUrl(url);
  }, [url]);
  
  const onRemove = async () => {
    if (!params.documentId || !coverUrl) return;
    try {
      await edgestore.publicFiles.delete({ url: coverUrl });
      await removeCoverImage({ id: params.documentId as Id<"documents"> });
      setCoverUrl(undefined);
    } catch (err) {
      console.error("Failed to remove cover image:", err);
    }
  };
  
  if (!coverUrl) return null;
  
  return (
    <div
      className={cn(
        "relative w-full rounded-md group",
        "h-[20vh] bg-muted overflow-visible"
      )}
    >
      <Image
        src={coverUrl}
        alt="Cover Image"
        fill
        className="object-cover w-full h-full"
        sizes="100vw"
        priority={preview}
      />
      {!preview && (
        <div className="absolute bottom-2 right-2 flex items-center gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-50 z-10">
          <Button
            size="sm"
            variant="outline"
            onClick={() => url && coverImage.onReplace(url)}
          >
            <span className="text-xs text-muted-foreground">
              <ImageIcon />
            </span>
          </Button>
          <Button size="sm" variant="outline" onClick={onRemove}>
            <span className="text-xs text-muted-foreground">
              <Trash />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[20vh]" />;
};