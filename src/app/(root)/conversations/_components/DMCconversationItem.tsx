import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
interface Props {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  email: string;
}

const DMCconversationItem = ({ id, imageUrl, username, email }: Props) => {
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
            <div className="flex flex-col truncate flex-1">
              <h4 className="truncate">{username}</h4>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
};

export default DMCconversationItem;
