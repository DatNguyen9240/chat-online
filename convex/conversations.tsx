import { query } from "./_generated/server";
import { getUserByClerkId } from "./_ultils";
import { v } from "convex/values";

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
        if (conversation.isGroup) {
          return { conversation };
        } else {
          const otherMembership = allconversationmemberships.filter(
            (membership) => membership.memberId !== currentUser._id
          )[0];
          const otherMember = await ctx.db.get(otherMembership.memberId);
          return { conversation, otherMember };
        }
      })
    );

    return conversationsWithDetails;
  },
});
