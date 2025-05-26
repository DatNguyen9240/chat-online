import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: string;
};

const Message = ({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  type,
}: Props) => {
  const formattedDate = format(createdAt, "HH:mm - MMM d, yyyy");
  return (
    <div
      className={cn("flex items-end gap-2", {
        "flex-row-reverse": fromCurrentUser,
      })}
    >
      <Avatar
        className={cn("relative w-8 h-8", {
          invisible: lastByUser,
        })}
      >
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div
        className={cn("flex flex-col w-full", {
          "items-end": fromCurrentUser,
          "items-start": !fromCurrentUser,
        })}
      >
        <div
          className={cn("px-4 py-2 rounded-lg max-w-[70%]", {
            "bg-primary text-primary-foreground": fromCurrentUser,
            "bg-secondary text-secondary-foreground": !fromCurrentUser,
            "rounded-br-none": !lastByUser && fromCurrentUser,
            "rounded-bl-none": !lastByUser && !fromCurrentUser,
          })}
        >
          {type === "text" ? (
            <p className="text-wrap break-words whitespace-pre-wrap">
              {content}
            </p>
          ) : (
            <Image
              src={content[0]}
              alt="image"
              width={250}
              height={250}
              className="rounded-md object-cover"
            />
          )}
          <p
            className={cn("text-[11px] font-medium mt-1.5", {
              "ml-auto": fromCurrentUser,
              "text-primary-foreground/80": fromCurrentUser,
              "text-secondary-foreground/80": !fromCurrentUser,
            })}
          >
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
