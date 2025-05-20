import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const get = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
  },
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

export const update = internalMutation({
  args: {
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, args);
  },
});

export default {
  get,
  create,
  update,
};
