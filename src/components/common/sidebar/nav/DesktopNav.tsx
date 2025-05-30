"use client";

import { useNavigation } from "@/components/hooks/useNavigation";
import { Card } from "@/components/ui/Card";
import UserButton from "@/components/auth/Auth-Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";
import { Badge } from "@/components/ui/Badge";

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav className="flex flex-col items-center gap-4">
        <ul className="flex flex-col gap-4 items-center">
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
                      </Button>
                    </TooltipTrigger>
                    {typeof path.count === "number" && path.count > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 z-50"
                      >
                        {path.count}
                      </Badge>
                    )}
                    <TooltipContent
                      side="right"
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
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
