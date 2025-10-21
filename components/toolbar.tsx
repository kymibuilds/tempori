"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import IconPicker from "./icon-picker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="px-6 sm:px-8 md:px-12 py-6 md:py-8 space-y-4">
      {/* Icon with Title - Inline Layout */}
      <div className="space-y-2">
        {/* Icon Section */}
        {!!initialData.icon && (
          <div className="group/icon relative inline-block">
            {!preview ? (
              <>
                <IconPicker onchange={onIconSelect}>
                  <div className="relative cursor-pointer hover:opacity-75 transition-opacity">
                    <p className="text-5xl sm:text-6xl md:text-7xl select-none leading-none">
                      {initialData.icon}
                    </p>
                  </div>
                </IconPicker>
                <Button
                  onClick={onRemoveIcon}
                  className="rounded-full absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 p-0 opacity-0 group-hover/icon:opacity-100 transition shadow-sm"
                  variant="outline"
                  size="icon"
                >
                  <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </>
            ) : (
              <p className="text-5xl sm:text-6xl md:text-7xl select-none leading-none">
                {initialData.icon}
              </p>
            )}
          </div>
        )}

        {/* Title Section */}
        <div className={!!initialData.icon ? "pt-1" : ""}>
          {isEditing && !preview ? (
            <TextareaAutosize
              ref={inputRef}
              onBlur={disableInput}
              onKeyDown={onKeyDown}
              onChange={(e) => onInput(e.target.value)}
              value={value}
              placeholder="Untitled"
              className="w-full text-3xl sm:text-4xl md:text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none leading-tight placeholder:text-muted-foreground/40"
            />
          ) : (
            <div
              onClick={enableInput}
              className={`
                text-3xl sm:text-4xl md:text-5xl font-bold break-words outline-none leading-tight
                text-[#3F3F3F] dark:text-[#CFCFCF]
                ${!preview && "cursor-text hover:bg-muted/30 rounded-sm px-1 -mx-1 transition-colors"}
              `}
            >
              {initialData.title}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {!preview && (
        <div className="flex items-center gap-x-2 flex-wrap">
          {!initialData.icon && (
            <IconPicker asChild onchange={onIconSelect}>
              <Button
                className="text-muted-foreground text-xs h-7 sm:h-8 px-2.5 sm:px-3"
                variant="outline"
                size="sm"
              >
                <Smile className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">Add Icon</span>
                <span className="sm:hidden">Icon</span>
              </Button>
            </IconPicker>
          )}
          {!initialData.coverImage && (
            <Button
              className="text-muted-foreground text-xs h-7 sm:h-8 px-2.5 sm:px-3"
              variant="outline"
              size="sm"
              onClick={coverImage.onOpen}
            >
              <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
              <span className="hidden sm:inline">Add Cover</span>
              <span className="sm:hidden">Cover</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Toolbar;