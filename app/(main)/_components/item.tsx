"use client";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  isCreate?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onclick: () => void;
  icon: LucideIcon;
}

export const Item = ({
  label,
  onclick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  isCreate,
  level = 0,
  onExpand,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  
  return (
    <div
      onClick={onclick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full flex items-center font-normal gap-2 rounded-sm cursor-pointer",
        active 
          ? "bg-primary/8 text-foreground" 
          : "text-muted-foreground hover:bg-accent/30"
      )}
    >
      {/* Chevron for expandable items */}
      {!!id && (
        <div
          role="button"
          className="h-4 w-4 flex items-center justify-center rounded-sm hover:bg-accent"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ChevronIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      
      {/* Icon container */}
      {documentIcon ? (
        <div className="shrink-0 h-[18px] w-[18px] flex items-center justify-center text-muted-foreground">
          {documentIcon}
        </div>
      ) : (
        <Icon className="h-[18px] w-[18px] shrink-0 text-muted-foreground" />
      )}
      
      {/* Label */}
      <span className="truncate flex-1">
        {label}
      </span>
      
      {/* Keyboard shortcuts */}
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {isCreate && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>O
        </kbd>
      )}
    </div>
  );
};