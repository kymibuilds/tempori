"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState, useEffect } from "react";

interface TitleProps {
  initialData?: Doc<"documents">;
}

function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "Untitled");

  // Sync title if initialData changes
  useEffect(() => {
    if (initialData?.title) setTitle(initialData.title);
  }, [initialData?.title]);

  const enableInput = () => {
    setTitle(initialData?.title || "");
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = async () => {
    setIsEditing(false);
    if (initialData && title !== initialData.title) {
      try {
        await update({ id: initialData._id, title: title || "Untitled" });
      } catch (err) {
        console.error("Failed to update title:", err);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") disableInput();
    if (e.key === "Escape") {
      setTitle(initialData?.title || "Untitled");
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-x-1 border rounded-sm">
      {initialData?.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          className="h-6 px-2 focus-visible:ring-transparent w-full"
          value={title}
          onChange={onChange}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          <span className="truncate">{initialData?.title || "Untitled"}</span>
        </Button>
      )}
    </div>
  );
}

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-4 w-full min-w-[150px] rounded-md" />;
};
