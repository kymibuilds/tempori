"use client";
import React, { useState } from "react";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import useOrigin from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Globe2, Check, Copy } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface PublishProps {
  initialData: {
    _id: Id<"documents">;
    isPublished?: boolean;
    title?: string;
  };
}

function Publish({ initialData }: PublishProps) {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!initialData?._id) return null;

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Document published!",
      error: "Failed to publish document.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Document unpublished.",
      error: "Failed to unpublish document.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe2 className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sky-100 dark:bg-sky-900/20 rounded-lg">
                <Globe2 className="h-5 w-5 text-sky-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">This note is live</p>
                <p className="text-xs text-muted-foreground">
                  Anyone with the link can view
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border">
              <span className="flex-1 text-xs text-muted-foreground truncate px-2">
                {url}
              </span>
              <Button
                onClick={onCopy}
                size="sm"
                variant="ghost"
                className="h-8 px-3 hover:bg-background"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                    <span className="text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>

            <div className="pt-2 border-t">
              <Button
                onClick={onUnpublish}
                disabled={isSubmitting}
                variant="ghost"
                size="sm"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Unpublish note
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center text-center py-2">
              <div className="p-3 bg-muted rounded-full mb-3">
                <Globe2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Publish this note</h3>
              <p className="text-xs text-muted-foreground">
                Share your work with others
              </p>
            </div>

            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full"
              size="sm"
            >
              <Globe2 className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Publish;