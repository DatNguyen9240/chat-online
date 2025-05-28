import { useConversation } from "@/components/hooks/useConversation";
import { Card, CardContent } from "@/components/ui/Card";
import { api } from "@/convex/_generated/api";
import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useMutationState from "@/components/hooks/useMutationState";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/Form";
import TextareaAutosize from "react-textarea-autosize";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "Message cannot be empty" }),
});

const ChatInput = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { conversationId } = useConversation();
  const { mutation: createMessage, pending } = useMutationState(
    api.message.create
  );
  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "text",
      content: [values.content],
    })
      .then(() => {
        form.reset();
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred"
        );
      });
  };
  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;
    if (selectionStart != null) {
      form.setValue("content", value);
    }
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <TextareaAutosize
                      rows={1}
                      maxRows={3}
                      onKeyDown={async (event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      {...field}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      placeholder="Type a message"
                      className="min-h-full w-full resize-none border-0 outline-0 bg-card
                      text-card-foreground placehoder: text-muted-foreground p-1.5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={pending}>
              <SendIcon className="w-4 h-4" />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
