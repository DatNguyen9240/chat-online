import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_ultils";
import { Id } from "./_generated/dataModel";

type Conversation = {
  _id: Id<"conversations">;
  name?: string;
  isGroup: boolean;
  lastMessageId?: Id<"messages">;
};

type User = {
  _id: Id<"users">;
  username: string;
  imageUrl: string;
  email: string;
  clerkId: string;
};

type GroupMember = {
  username: string;
};

type ConversationResponse =
  | {
      _id: Id<"conversations">;
      name?: string;
      isGroup: true;
      lastMessageId?: Id<"messages">;
      otherMember: null;
      otherMembers: GroupMember[];
    }
  | {
      _id: Id<"conversations">;
      name?: string;
      isGroup: false;
      lastMessageId?: Id<"messages">;
      otherMember: User & { lastSeenMessageId?: Id<"messages"> };
      otherMembers: null;
    };

export const get = query({
  args: {
    id: v.id("conversations"),
  },
  handler: async (ctx, args): Promise<ConversationResponse> => {
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
    const conversation = await ctx.db.get(args.id);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_member_id_conversation_id", (q) =>
        q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)
      )
      .unique();

    if (!membership) {
      throw new Error("Membership not found");
    }
    const allConversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversation_id", (q) =>
        q.eq("conversationId", conversation._id)
      )
      .collect();
    if (!conversation.isGroup) {
      const otherMembership = allConversationMemberships.filter(
        (membership) => membership.memberId !== currentUser._id
      )[0];
      if (!otherMembership) {
        throw new Error("Other member not found");
      }
      const otherMemberDetails = await ctx.db.get(otherMembership.memberId);
      if (!otherMemberDetails) {
        throw new Error("Other member details not found");
      }
      return {
        ...conversation,
        otherMember: {
          ...otherMemberDetails,
          lastSeenMessageId: otherMembership.lastSeenMessageId,
        },
        otherMembers: null,
      } as ConversationResponse;
    } else {
      const otherMembers = await Promise.all(
        allConversationMemberships
          .filter((membership) => membership.memberId !== currentUser._id)
          .map(async (membership) => {
            const member = await ctx.db.get(membership.memberId);
            if (!member) {
              throw new Error("Member not found");
            }
            return {
              username: member.username,
            };
          })
      );
      return {
        ...conversation,
        otherMembers,
        otherMember: null,
      } as ConversationResponse;
    }
  },
});

export const createGroup = mutation({
  args: {
    members: v.array(v.id("users")),
    name: v.string(),
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
    const conversationId = await ctx.db.insert("conversations", {
      name: args.name,
      isGroup: true,
    });
    await ctx.db.insert("conversationMembers", {
      conversationId,
      memberId: currentUser._id,
    });
    await Promise.all(
      [...args.members, currentUser._id].map((member) =>
        ctx.db.insert("conversationMembers", {
          conversationId,
          memberId: member,
        })
      )
    );
    return conversationId;
  },
});
