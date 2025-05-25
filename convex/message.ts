import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getUserByClerkId } from "./_ultils";
export const create = mutation({
  args: {
    conversationId: v.id("conversations"),
    type: v.string(),
    content: v.array(v.string()),
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
    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_member_id_conversation_id", (q) =>
        q
          .eq("memberId", currentUser._id)
          .eq("conversationId", args.conversationId)
      )
      .unique();
    if (!membership) {
      throw new Error("You are not a member of this conversation");
    }
    const message = await ctx.db.insert("messages", {
      type: args.type,
      content: args.content,
      conversationId: args.conversationId,
      senderId: currentUser._id,
    });
    await ctx.db.patch(args.conversationId, {
      lastMessageId: message,
    });
    return message;
  },
});
