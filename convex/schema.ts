import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    username: v.string(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),
  requests: defineTable({
    sender: v.id("users"),
    receiver: v.id("users"),
  })
    .index("by_receiver", ["receiver"])
    .index("by_receiver_sender", ["receiver", "sender"]),
});

export const create = internalMutation({
  args: {
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", args);
  },
});

export const get = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId)).unique;
  },
});
