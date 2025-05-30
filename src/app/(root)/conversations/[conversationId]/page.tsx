"use client";
import React, { useState } from "react";
import ConversationContainer from "@/components/common/conservation/ConversationContainer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";
type Props = {
  params: Promise<{
    conversationId: Id<"conversations">;
  }>;
};

const ConversationId = ({ params }: Props) => {
  const { conversationId } = React.use(params);
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
  });
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

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
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <Header
        imgUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        name={
          conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave Group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete Group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Remove Friend",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationId;
