import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const validatePayLoad = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.error("Webhook verification failed", error);
    return undefined;
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayLoad(req);
  if (!event) {
    return new Response("Invalid payload", { status: 400 });
  }

  switch (event.type) {
    case "user.created": {
      const user = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id,
      });
      if (!user) {
        await ctx.runMutation(internal.user.create, {
          username: `${event.data.first_name} ${event.data.last_name}`,
          imageUrl: event.data.image_url,
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
        });
      }
      break;
    }
    case "user.updated": {
      const user = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id,
      });
      if (user) {
        console.log(`Updating user ${event.data.id} with:`, event.data);
        await ctx.runMutation(internal.user.update, {
          username: `${event.data.first_name} ${event.data.last_name}`,
          imageUrl: event.data.image_url,
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
        });
      } else {
        // Handle the case where the user doesn't exist yet but received an update event
        console.log(`User ${event.data.id} not found, creating new record`);
        await ctx.runMutation(internal.user.create, {
          username: `${event.data.first_name} ${event.data.last_name}`,
          imageUrl: event.data.image_url,
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
        });
      }
      break;
    }
    default: {
      console.log("Unhandled event", event.type);
      break;
    }
  }
  return new Response(null, { status: 200 });
});

const http = httpRouter();
http.route({
  path: "/clerk-user-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
