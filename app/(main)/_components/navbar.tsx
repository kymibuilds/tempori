"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { MenuIcon, Edit3 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Publish from "./publish";

interface NavbarProps {
  preview?: boolean;
}

function Navbar({ preview }: NavbarProps) {
  const params = useParams();
  const documentId = params?.documentId as Id<"documents"> | undefined;

  const document = useQuery(
    api.documents.getById,
    documentId ? { documentId } : "skip"
  );

  const update = useMutation(api.documents.update);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handler = (e: CustomEvent) => setIsCollapsed(e.detail);
    window.addEventListener("custom:sidebarState", handler as EventListener);
    return () =>
      window.removeEventListener(
        "custom:sidebarState",
        handler as EventListener
      );
  }, []);

  useEffect(() => {
    if (document?.title) {
      setTitle(document.title);
    }
  }, [document?.title]);

  const handleSave = () => {
    if (documentId && title.trim()) {
      update({
        id: documentId,
        title: title.trim(),
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(document?.title || "");
    setIsEditing(false);
  };

  const borderColor = document?.isArchived
    ? "border-yellow-400"
    : document
    ? "border-blue-400"
    : "border-gray-200";

  return (
    <>
      <nav
        className={`
          sticky top-0 z-20 bg-background dark:bg-[#1f1f1f] px-3 py-2 h-12 flex items-center gap-x-4
          ${borderColor} transition-colors duration-300
          shadow-sm
        `}
      >
        {isCollapsed && !preview && (
          <MenuIcon
            role="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("custom:openSidebar"))
            }
            className="h-6 w-6 text-muted-foreground cursor-pointer flex-shrink-0"
          />
        )}

        {documentId && document ? (
          <div className="flex items-center gap-x-2 min-w-0 flex-1">
            <span className="text-sm font-medium truncate">
              {document.icon} {document.title}
            </span>
            {!preview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-7 w-7 p-0 flex-shrink-0 hover:bg-muted"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ) : documentId && document === undefined ? (
          <div className="flex items-center gap-x-2 flex-1">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {!preview && (
          <div className="ml-auto">
            {document && <Publish initialData={document} />}
          </div>
        )}
      </nav>

      {document?.isArchived && !preview && <Banner documentId={document._id} />}

      {!preview && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit document title</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  } else if (e.key === "Escape") {
                    handleCancel();
                  }
                }}
                placeholder="Enter document title"
                className="w-full"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Navbar;