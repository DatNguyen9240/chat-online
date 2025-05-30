import React, { useMemo } from "react";
import z from "zod";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useMutationState from "@/components/hooks/useMutationState";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/Form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { PlusIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";

type Props = {};

const CreateGroupDialogSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  memberIds: z
    .string()
    .array()
    .min(2, { message: "At least 2 members are required" }),
});

const CreateGroupDialog = (props: Props) => {
  const friends = useQuery(api.friends.get);
  const { mutation: createGroup, pending } = useMutationState(
    api.conversation.createGroup
  );
  const form = useForm<z.infer<typeof CreateGroupDialogSchema>>({
    resolver: zodResolver(CreateGroupDialogSchema),
    defaultValues: {
      name: "",
      memberIds: [],
    },
  });
  const members = form.watch("memberIds", []);
  const unSelectedFriends = useMemo(() => {
    return friends
      ? friends.filter((friend) => !members.includes(friend._id))
      : [];
  }, [friends?.length, members.length]);

  const handleSubmit = (data: z.infer<typeof CreateGroupDialogSchema>) => {
    createGroup({
      name: data.name,
      memberIds: data.memberIds,
    })
      .then(() => {
        form.reset();
        toast.success("Group created successfully");
      })
      .catch((error) => {
        error instanceof Error
          ? toast.error(error.message)
          : toast.error("Something went wrong");
      });
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Create a new group</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
          <DialogDescription>
            Create a new group with your friends
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Group name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memberIds"
              render={() => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        disabled={unSelectedFriends.length === 0}
                      >
                        <Button variant="outline" className="w-full">
                          Select members
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {unSelectedFriends.map((friend) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={friend._id}
                              className="flex items-center gap-2 w-full p-2"
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  form.setValue("memberIds", [
                                    ...members,
                                    friend._id,
                                  ]);
                                }
                              }}
                            >
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={friend.imageUrl} />
                                <AvatarFallback>
                                  {friend.username.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <h4 className="truncate">{friend.username}</h4>
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {members && members.length > 0 ? (
              <Card className="flex flex-row items-center gap-3 overflow-x-auto w-full p-2 no-scrollbar">
                {friends
                  ?.filter((friend) => members.includes(friend._id))
                  .map((friend) => {
                    return (
                      <div
                        className="flex flex-row items-center gap-2 min-w-fit"
                        key={friend._id}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={friend.imageUrl} />
                            <AvatarFallback>
                              {friend.username.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <X
                            className="text-muted-foreground w-4 h-4 absolute -top-1 -right-1 bg-muted rounded-full cursor-pointer"
                            onClick={() => {
                              form.setValue(
                                "memberIds",
                                members.filter((id) => id !== friend._id)
                              );
                            }}
                          />
                        </div>
                        <p className="truncate">
                          {friend.username.split(" ")[0]}
                        </p>
                      </div>
                    );
                  })}
              </Card>
            ) : null}
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                {pending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
