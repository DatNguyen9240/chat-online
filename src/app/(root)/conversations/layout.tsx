"use client";
import React from "react";
import ItemList from "@/components/common/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import DMCconversationItem from "./_components/DMCconversationItem";
import { Loader2 } from "lucide-react";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupConversationItem from "./_components/GroupConversationItem";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
}

const ConservationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  const { t } = useTranslation("conversations");

  return (
    <>
      <ItemList title="title" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="h-full w-full flex items-center justify-center">
              {t("empty")}
            </p>
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  name={conversations.conversation?.name || ""}
                  lastMessageSender={conversations.lastMessage?.sender}
                  lastMessageContent={conversations.lastMessage?.content}
                />
              ) : (
                <DMCconversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  username={conversations.otherMember?.username || ""}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
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
