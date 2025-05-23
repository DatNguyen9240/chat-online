import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import useMutationState from "@/components/hooks/useMutationState";
import { toast } from "sonner";
type Props = {
  id: Id<"requests">;
  image: string;
  username: string;
  email: string;
};

const Request = ({ id, image, username, email }: Props) => {
  const { pending: denyingPending, mutation: denyRequest } = useMutationState(
    api.request.deny
  );
  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2 truncate">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3>{username}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="icon" className="h-8 w-8">
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          disabled={denyingPending}
          onClick={() =>
            denyRequest({ requestId: id })
              .then(() => {
                toast.success("Request denied");
              })
              .catch((error) => {
                toast.error(error.error);
              })
          }
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Request;
