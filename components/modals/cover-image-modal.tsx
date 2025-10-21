"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "@/hooks/use-cover-image";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "../upload/single-image";
import { UploaderProvider } from "../upload/uploader-provider";
import { DialogTitle } from "@radix-ui/react-dialog";

function CoverImageModal() {
  const params = useParams();
  const coverImage = useCoverImage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);

  const onClose = () => {
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const handleUpload = async (file: File) => {
    try {
      setIsSubmitting(true);

      const res = await edgestore.publicFiles.upload({
        file,
        options: coverImage.url
          ? { replaceTargetUrl: coverImage.url }
          : undefined,
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    } catch (err) {
      console.error("Cover image upload failed:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>

        <div className="flex justify-center">
          <UploaderProvider
            uploadFn={async ({ file }) => {
              const res = await edgestore.publicFiles.upload({ file });
              return { url: res.url };
            }}
          >
            <SingleImageDropzone
              width={300}
              height={200}
              className="w-full outline-none"
              disabled={isSubmitting}
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) await handleUpload(file);
              }}
            />
          </UploaderProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CoverImageModal;
