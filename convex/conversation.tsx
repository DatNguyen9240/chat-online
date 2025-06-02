import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getUserByClerkId } from './_ultils';

export const get = query({
  args: {
    id: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new Error('User not found');
    }
    const conversation = await ctx.db.get(args.id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_member_id_conversation_id', q =>
        q.eq('memberId', currentUser._id).eq('conversationId', conversation._id)
      )
      .unique();

    if (!membership) {
      throw new Error('Membership not found');
    }
    const allConversationMemberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversation_id', q => q.eq('conversationId', conversation._id))
      .collect();
    if (!conversation.isGroup) {
      const otherMembership = allConversationMemberships.filter(
        membership => membership.memberId !== currentUser._id
      )[0];
      const otherMemberDetails = await ctx.db.get(otherMembership.memberId);
      return {
        ...conversation,
        otherMember: {
          ...otherMemberDetails,
          lastSeenMessageId: otherMembership.lastSeenMessageId,
        },
        otherMembers: null,
      };
    } else {
      const otherMembers = await Promise.all(
        allConversationMemberships
          .filter(membership => membership.memberId !== currentUser._id)
          .map(async membership => {
            const member = await ctx.db.get(membership.memberId);
            if (!member) {
              throw new Error('Member not found');
            }
            return {
              username: member.username,
              lastSeenMessageId: membership.lastSeenMessageId,
            };
          })
      );
      return {
        ...conversation,
        otherMember: null,
        otherMembers: otherMembers,
      };
    }
  },
});

export const createGroup = mutation({
  args: {
    name: v.string(),
    memberIds: v.array(v.id('users')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new Error('User not found');
    }
    const conversationId = await ctx.db.insert('conversations', {
      name: args.name,
      isGroup: true,
    });
    await Promise.all(
      [...args.memberIds, currentUser._id].map(async memberId => {
        await ctx.db.insert('conversationMembers', {
          conversationId,
          memberId,
        });
      })
    );
    return conversationId;
  },
});

export const deleteGroup = mutation({
  args: {
    conversationId: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new Error('User not found');
    }

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    const memberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversation_id', q => q.eq('conversationId', args.conversationId))
      .collect();
    if (!memberships || memberships.length <= 1) {
      throw new Error('This conversation does not have any members');
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversation_id', q => q.eq('conversationId', args.conversationId))
      .collect();
    await ctx.db.delete(args.conversationId);

    await Promise.all(
      memberships.map(async membership => {
        await ctx.db.delete(membership._id);
      })
    );
    await Promise.all(
      messages.map(async message => {
        await ctx.db.delete(message._id);
      })
    );
  },
});

export const leaveGroup = mutation({
  args: {
    conversationId: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new Error('User not found');
    }

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_member_id_conversation_id', q =>
        q.eq('memberId', currentUser._id).eq('conversationId', args.conversationId)
      )
      .unique();
    if (!membership) {
      throw new Error('You are not a member of this group');
    }

    await ctx.db.delete(membership._id);
  },
});

export const markRead = mutation({
  args: {
    conversationId: v.id('conversations'),
    messageId: v.id('messages'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new Error('User not found');
    }

    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_member_id_conversation_id', q =>
        q.eq('memberId', currentUser._id).eq('conversationId', args.conversationId)
      )
      .unique();
    if (!membership) {
      throw new Error('You are not a member of this group');
    }
    const lastMessage = await ctx.db.get(args.messageId);
    await ctx.db.patch(membership._id, {
      lastSeenMessageId: lastMessage ? lastMessage._id : undefined,
    });
  },
});
