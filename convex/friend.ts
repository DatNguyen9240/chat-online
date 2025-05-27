import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getUserByClerkId } from "./_ultils";
export const remove = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
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

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    const memberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversation_id", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect();
    if (!memberships || memberships.length !== 2) {
      throw new Error("This conversation does not have any members");
    }

    const friendship = await ctx.db
      .query("friends")
      .withIndex("by_conversation_id", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .unique();
    if (!friendship) {
      throw new Error("You are not friends with this user");
    }

    const message = await ctx.db
      .query("messages")
      .withIndex("by_conversation_id", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect();
    await ctx.db.delete(args.conversationId);

    await ctx.db.delete(friendship._id);

    await Promise.all(
      memberships.map(async (membership) => {
        await ctx.db.delete(membership._id);
      })
    );
  },
});
