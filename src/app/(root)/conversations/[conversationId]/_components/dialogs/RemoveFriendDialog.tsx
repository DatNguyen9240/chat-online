'use client';
import useMutationState from '@/components/hooks/useMutationState';
import { Button } from '@/components/ui/Button';
import { Id } from '@/convex/_generated/dataModel';
import React, { Dispatch, SetStateAction } from 'react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogCancel,
} from '@/components/ui/AlertDialog';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
type Props = {
  conversationId: Id<'conversations'>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RemoveFriendDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutation: removeFriend, pending } = useMutationState(api.friend.remove);
  const handleRemoveFriend = async () => {
    removeFriend({ conversationId })
      .then(() => {
        setOpen(false);
        toast.success('Friend removed');
      })
      .catch(error => {
        toast.error(error instanceof Error ? error.message : 'Unknown error');
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Friend</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this friend?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild disabled={pending}>
            <Button variant="outline" className="w-[120px]">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild disabled={pending} onClick={handleRemoveFriend}>
            <Button variant="destructive">Remove Friend</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFriendDialog;
