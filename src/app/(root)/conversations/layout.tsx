"use client";
import React from "react";
import ItemList from "@/components/common/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import DMCconversationItem from "./_components/DMCconversationItem";
import { Loader2 } from "lucide-react";
import { CreateGroupDialog } from "./[conversationId]/_components/dialogs";
type Props = React.PropsWithChildren<{}>;

const ConservationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemList title="Cuộc hội thoại" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="h-full w-full flex items-center justify-center">
              No conversations
            </p>
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? (
                <p>Group</p>
              ) : (
                <DMCconversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  username={conversations.otherMember?.username || ""}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
                  email={conversations.otherMember?.email || ""}
                  lastMessageSender={conversations.lastMessage?.sender}
                  lastMessageContent={conversations.lastMessage?.content}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConservationsLayout;
