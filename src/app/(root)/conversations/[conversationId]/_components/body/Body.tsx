'use client';
import { useConversation } from '@/components/hooks/useConversation';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React, { useEffect } from 'react';
import Message from './Message';
import useMutationState from '@/components/hooks/useMutationState';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

interface Member {
  lastSeenMessageId?: Id<'messages'>;
  username?: string;
  imageUrl?: string;
  email?: string;
}

type Props = {
  members: Member[];
};

const Body = ({ members }: Props) => {
  const { mutation: markRead } = useMutationState(api.conversation.markRead);
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, {
    conversationId: conversationId as Id<'conversations'>,
  });

  useEffect(() => {
    if (messages && messages.length > 0) {
      markRead({
        conversationId,
        messageId: messages[0].message._id,
      });
    }
  }, [members.length, conversationId, markRead, messages]);

  const formatSeenBy = (names: string[]) => {
    switch (names.length) {
      case 1:
        return <p className="text-muted-foreground text-sm text-right">{`seen by ${names[0]}`}</p>;
      case 2:
        return (
          <p className="text-muted-foreground text-sm text-right">{`seen by ${names[0]} and ${names[1]}`}</p>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-muted-foreground text-sm text-right">
                  {`seen by  ${names[0]},  ${names[1]}, ${names.length - 2} people`}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {names.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  const getSeenMessage = (messageId: Id<'messages'>) => {
    const seenUsers = members
      .filter(member => member.lastSeenMessageId === messageId)
      ?.map(user => user.username!.split(' ')[0]);
    if (seenUsers.length == 0) {
      return undefined;
    }
    return formatSeenBy(seenUsers);
  };

  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(({ message, senderImage, senderName, isCurrentUser }, index) => {
        const lastByUser =
          messages[index - 1]?.message.senderId === messages[index].message.senderId;

        const seenMessage = isCurrentUser ? getSeenMessage(message._id) : undefined;
        return (
          <Message
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            type={message.type}
            seen={seenMessage}
          />
        );
      })}
    </div>
  );
};

export default Body;
