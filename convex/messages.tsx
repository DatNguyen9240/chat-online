import { query } from "./_generated/server";
import { getUserByClerkId } from "./_ultils";
import { v } from "convex/values";

export const get = query({
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
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation_id", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .order("desc")
      .collect();
    const messagesWithUser = await Promise.all(
      messages.map(async (message) => {
        const messageSender = await ctx.db.get(message.senderId);
        if (!messageSender) {
          throw new Error("User not found");
        }
        return {
          message,
          senderImage: messageSender.imageUrl,
          senderName: messageSender.username,
          imgUrl: currentUser.imageUrl,
          userName: currentUser.username,
          isCurrentUser: message.senderId === currentUser._id,
        };
      })
    );
    return messagesWithUser;
  },
});
