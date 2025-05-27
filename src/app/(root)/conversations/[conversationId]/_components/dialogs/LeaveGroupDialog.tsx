"use client";
import useMutationState from "@/components/hooks/useMutationState";
import { Button } from "@/components/ui/Button";
import { Id } from "@/convex/_generated/dataModel";
import React, { Dispatch, SetStateAction } from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogCancel,
} from "@/components/ui/Alert-Dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveGroupDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutation: leaveGroup, pending } = useMutationState(
    api.conversation.leaveGroup
  );
  const handleLeaveGroup = async () => {
    leaveGroup({ conversationId })
      .then(() => {
        setOpen(false);
        toast.success("Group deleted");
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unknown error");
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave Group</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to leave this group?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild disabled={pending}>
            <Button variant="outline" className="w-[120px]">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            disabled={pending}
            onClick={handleLeaveGroup}
          >
            <Button variant="destructive">Leave Group</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveGroupDialog;
