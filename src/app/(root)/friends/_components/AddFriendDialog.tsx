'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { UserPlus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import useMutationState from '@/components/hooks/useMutationState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

const AddFriendDialogSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .max(255)
    .email('Invalid email address'),
});

type FormData = z.infer<typeof AddFriendDialogSchema>;

const AddFriendDialog = () => {
  const { pending, mutation: createRequest } = useMutationState(api.request.create);
  const form = useForm<FormData>({
    resolver: zodResolver(AddFriendDialogSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    const result = await createRequest({ email: data.email });
    if (result.error) {
      toast.error(result.error);
    } else {
      form.reset();
      toast.success('Request sent');
    }
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <UserPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>Add a friend by their email address.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                {pending ? 'Sending...' : 'Send Request'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
