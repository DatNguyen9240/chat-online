import { query, QueryCtx, MutationCtx } from "./_generated/server";
import { getUserByClerkId } from "./_ultils";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new Error("User not found");
    }
    const conversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_member_id", (q) => q.eq("memberId", currentUser._id))
      .collect();
    if (!conversationMemberships) {
      throw new Error("Conversation membership not found");
    }
    const conversations = await Promise.all(
      conversationMemberships.map(async (membership) => {
        const conversation = await ctx.db.get(membership.conversationId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }
        return conversation;
      })
    );
    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const allconversationmemberships = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversation_id", (q) =>
            q.eq("conversationId", conversation._id)
          )
          .collect();

        const lastMessage = await getLastMessageDetail({
          ctx,
          id: conversation.lastMessageId,
        });

        if (conversation.isGroup) {
          return { conversation, lastMessage };
        } else {
          const otherMembership = allconversationmemberships.filter(
            (membership) => membership.memberId !== currentUser._id
          )[0];
          const otherMember = await ctx.db.get(otherMembership.memberId);
          return { conversation, otherMember, lastMessage };
        }
      })
    );

    return conversationsWithDetails;
  },
});

const getLastMessageDetail = async ({
  ctx,
  id,
}: {
  ctx: QueryCtx | MutationCtx;
  id: Id<"messages"> | undefined;
}) => {
  if (!id) {
    return null;
  }

  const message = await ctx.db.get(id);
  if (!message) {
    return null;
  }

  const sender = await ctx.db.get(message.senderId);
  if (!sender) {
    return null;
  }

  const content = await getMessageContent(
    message.type,
    message.content as unknown as string
  );
  if (!content) {
    return null;
  }

  return {
    content,
    sender: sender.username,
  };
};

const getMessageContent = async (type: string, content: string) => {
  switch (type) {
    case "text":
      return content;

    default:
      return "Non-text message";
  }
};
