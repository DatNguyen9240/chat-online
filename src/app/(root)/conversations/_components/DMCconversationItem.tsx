import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { User } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
interface Props {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
}

const DMCconversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageSender,
  lastMessageContent,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <div className="w-full">
        <Card className="w-full p-2 flex flex-row items-center gap-4 truncate">
          <div className="flex flex-row items-center gap-4 truncate w-full">
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback />
              <User />
            </Avatar>
            <div className="flex flex-col truncate">
              <h4 className="truncate">{username}</h4>
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

export default DMCconversationItem;
