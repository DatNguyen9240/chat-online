"use client";

import { useNavigation } from "@/components/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/auth/auth-button";
import { useConversation } from "@/components/hooks/useConversation";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";

const MobileNav = () => {
  const paths = useNavigation();
  const { isActive } = useConversation();
  if (isActive) return null;
  return (
    <Card className="fixed bottom-0 left-0 right-0 w-[calc(100vw-32px)] mx-auto flex items-center h-16 p-2 lg:hidden rounded-t-2xl">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            const Icon = path.icon;
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={path.active ? "default" : "ghost"}
                        size="icon"
                        className={cn(
                          "hover:bg-primary/10",
                          path.active &&
                            "bg-primary text-white hover:bg-primary/90"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {typeof path.count === "number" && path.count > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 z-50"
                          >
                            {path.count}
                          </Badge>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      className="bg-white text-black border shadow-md rounded-md px-3 py-1.5 text-sm z-[100]"
                    >
                      {path.name}
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10">
                  <ThemeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-white text-black border shadow-md rounded-md px-3 py-1.5 text-sm z-[100]"
              >
                Giao diện
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10">
                  <UserButton />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-white text-black border shadow-md rounded-md px-3 py-1.5 text-sm z-[100]"
              >
                Tài khoản
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
