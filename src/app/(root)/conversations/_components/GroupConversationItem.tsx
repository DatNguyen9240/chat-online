import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
interface Props {
  id: Id<"conversations">;
  name: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
}

const GroupConversationItem = ({
  id,
  name,
  lastMessageSender,
  lastMessageContent,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <div className="w-full">
        <Card className="w-full p-2 flex flex-row items-center gap-4 truncate">
          <div className="flex flex-row items-center gap-4 truncate w-full">
            <Avatar>
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <h4 className="truncate">{name}</h4>
              {lastMessageSender && lastMessageContent ? (
                <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                  <p className="font-semibold">
                    {lastMessageSender}
                    {": "}&nbsp;
                  </p>
                  <p className="ml-1">{lastMessageContent}</p>
                </span>
              ) : (
                <p className="text-xs text-muted-foreground truncate">
                  Start the conversation!
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
};

export default GroupConversationItem;
