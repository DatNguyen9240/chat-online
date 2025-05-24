import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CircleArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  imgUrl?: string;
  name?: string;
};

const Header = ({ imgUrl, name }: Props) => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-2 pl-3">
        <Link href="/conversations" className="block lg:hidden">
          <CircleArrowLeftIcon />
        </Link>
        <Avatar className="w-8 h-8">
          <AvatarImage src={imgUrl} />
          <AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{name}</span>
      </div>
    </Card>
  );
};

export default Header;
