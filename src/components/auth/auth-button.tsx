"use client";

import { UserButton as ClerkUserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-Menu";
import { Button } from "@/components/ui/Button";
import { LogIn, UserPlus } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";

const UserButton = () => {
  const { isSignedIn } = useUser();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  if (isSignedIn) {
    return (
      <ClerkUserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
            userButtonPopoverCard: "rounded-lg shadow-lg",
            userButtonPopoverActionButton: "hover:bg-primary/10",
            userButtonPopoverActionButtonText: "text-sm",
            userButtonPopoverFooter: "hidden",
            userButtonPopover: isMobile
              ? "translate-y-[-40%]"
              : "translate-y-[-20%]",
          },
        }}
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-8 h-8 hover:bg-primary/10"
        >
          <UserPlus className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className={`w-48 bg-secondary ${isMobile ? "translate-y-[-40%]" : "translate-y-[-20%]"}`}
        sideOffset={isMobile ? 8 : 4}
      >
        <DropdownMenuItem className="cursor-pointer">
          <SignInButton mode="modal">
            <div className="flex items-center gap-2 w-full">
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </div>
          </SignInButton>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <SignUpButton mode="modal">
            <div className="flex items-center gap-2 w-full">
              <UserPlus className="w-4 h-4" />
              <span>Đăng ký</span>
            </div>
          </SignUpButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
