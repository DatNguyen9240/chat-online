"use client";

import { Card } from "@/components/ui/Card";
import React from "react";
import { cn } from "@/lib/utils";
import { useConversation } from "@/components/hooks/useConversation";
type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action: Action }: Props) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn(
        "hidden h-[calc(100vh-80px)] w-full lg:h-full lg:flex-none lg:w-80 p-2",
        {
          block: !isActive,
          "lg:block": isActive,
        }
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tighter">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-[calc(100%-60px)] flex flex-col items-center justify-start gap-2 overflow-y-auto">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
