import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-Menu";
import { CircleArrowLeftIcon, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
type Props = {
  imgUrl?: string;
  name?: string;
  options?: {
    label: string;
    destructive?: boolean;
    onClick: () => void;
  }[];
};

const Header = ({ imgUrl, name, options }: Props) => {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/conversations" className="block lg:hidden">
            <CircleArrowLeftIcon />
          </Link>
          <Avatar className="w-8 h-8">
            <AvatarImage src={imgUrl} />
            <AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {options.map((option, id) => (
                <DropdownMenuItem
                  key={id}
                  onClick={option.onClick}
                  className={cn("text-xs font-medium", {
                    "text-destructive focus:bg-destructive/10":
                      option.destructive,
                    "focus:bg-primary/10": !option.destructive,
                  })}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  );
};

export default Header;
