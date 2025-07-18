import { mutation } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { getUserByClerkId } from './_ultils';
import { Id } from './_generated/dataModel';

type RequestResponse = { error: string } | { success: true; request: Id<'requests'> };

type DenyRequestResponse = { success: true } | { success: false; error: string };

type AcceptRequestResponse = { success: true } | { success: false; error: string };

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args): Promise<RequestResponse> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { error: 'Unauthorized' };
    }
    if (args.email === identity.email) {
      return { error: "Can't sent a request to yourself" };
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      return { error: 'User not found' };
    }

    const receiver = await ctx.db
      .query('users')
      .withIndex('by_email', q => q.eq('email', args.email))
      .unique();

    if (!receiver) {
      return { error: 'User not found' };
    }

    // Kiểm tra request đã gửi
    const existingSentRequests = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', q =>
        q.eq('receiver', receiver._id).eq('sender', currentUser._id)
      )
      .collect();

    if (existingSentRequests.length > 0) {
      return { error: 'Request already sent' };
    }

    // Kiểm tra request đã nhận
    const existingReceivedRequests = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', q =>
        q.eq('receiver', currentUser._id).eq('sender', receiver._id)
      )
      .collect();

    if (existingReceivedRequests.length > 0) {
      return { error: 'User already sent a request to you' };
    }

    const friend1 = await ctx.db
      .query('friends')
      .withIndex('by_user1', q => q.eq('user1', currentUser._id))
      .collect();

    const friend2 = await ctx.db
      .query('friends')
      .withIndex('by_user2', q => q.eq('user2', currentUser._id))
      .collect();
    if (
      friend1.some(friend => friend.user2 === receiver._id) ||
      friend2.some(friend => friend.user1 === receiver._id)
    ) {
      return { error: 'User already sent a request to you' };
    }
    // Tạo request mới
    const request = await ctx.db.insert('requests', {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return { success: true, request };
  },
});

export const deny = mutation({
  args: {
    requestId: v.id('requests'),
  },
  handler: async (ctx, args): Promise<DenyRequestResponse> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { success: false, error: 'Unauthorized' };
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      return { success: false, error: 'User not found' };
    }

    const request = await ctx.db.get(args.requestId);
    if (!request) {
      return { success: false, error: 'Request not found' };
    }

    if (request.receiver !== currentUser._id) {
      return { success: false, error: 'Unauthorized' };
    }

    await ctx.db.delete(args.requestId);
    return { success: true };
  },
});

export const accept = mutation({
  args: {
    requestId: v.id('requests'),
  },
  handler: async (ctx, args): Promise<AcceptRequestResponse> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { success: false, error: 'Unauthorized' };
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      return { success: false, error: 'User not found' };
    }

    const request = await ctx.db.get(args.requestId);
    if (!request) {
      return { success: false, error: 'Request not found' };
    }
    if (request.receiver !== currentUser._id) {
      return { success: false, error: 'Unauthorized' };
    }

    const conversationId = await ctx.db.insert('conversations', {
      isGroup: false,
    });

    await ctx.db.insert('friends', {
      user1: currentUser._id,
      user2: request.sender,
      conversationId,
    });
    await ctx.db.insert('conversationMembers', {
      memberId: currentUser._id,
      conversationId,
    });
    await ctx.db.insert('conversationMembers', {
      memberId: request.sender,
      conversationId,
    });
    await ctx.db.delete(args.requestId);
    return { success: true };
  },
});
