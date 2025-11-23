"use client";

import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight, LogOutIcon } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // Assuming a Button component for better styling

function UserItem() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Aesthetic Improvement: Using standardized hover class and flexible layout */}
        <div
          role="button"
          className="flex items-center w-full px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-x-2 max-w-[80%]">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-sm font-medium line-clamp-1">
              {user?.fullName}&apos;s workspace
            </span>
          </div>
          <ChevronsLeftRight className="ml-auto h-4 w-4 rotate-90 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        className="w-64"
        align="start"
        alignOffset={10}
        side="bottom"
      >
        <DropdownMenuLabel className="flex flex-col space-y-1 p-2">
          <p className="text-xs text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild className="w-full h-auto py-2">
          <SignOutButton>
            <div
              role="button"
              className="flex items-center w-full gap-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-500/10 cursor-pointer transition-colors"
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Log out</span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserItem;