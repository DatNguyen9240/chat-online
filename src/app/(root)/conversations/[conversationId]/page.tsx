"use client";
import React from "react";
import ConversationContainer from "@/components/common/conservation/ConversationContainer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationId = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
  });
  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  ) : conversation === null ? (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-muted-foreground">Conversation not found</p>
    </div>
  ) : (
    <ConversationContainer>
      <Header
        imgUrl={
          conversation.isGroup ? undefined : conversation.otherMember.imageUrl
        }
        name={
          conversation.isGroup
            ? conversation.name
            : conversation.otherMember.username
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationId;
