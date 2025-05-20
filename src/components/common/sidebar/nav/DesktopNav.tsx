"use client";

import { useNavigation } from "@/components/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import UserButton from "@/components/auth/user-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-4 lg:py-4">
      <nav className="flex flex-col items-center gap-4">
        <ul className="flex flex-col gap-4 items-center">
          {paths.map((path, id) => {
            const Icon = path.icon;
            return (
              <li key={id}>
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
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      align="center"
                      className="bg-white text-black"
                    >
                      {path.name}
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
