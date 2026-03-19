"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteWritingPostAction } from "@/actions/dashboard/writing/delete-writing-post.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { Button } from "@/components/ui";

export interface WritingDeleteButtonProps {
  postId: string;
}

export const WritingDeleteButton = ({
  postId,
}: WritingDeleteButtonProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const handleConfirmDelete = async (): Promise<void> => {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      const formData = new FormData();
      formData.set("id", postId);

      const result = await deleteWritingPostAction(null, formData);

      if (result.ok) {
        toast.success("Writing post deleted.");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error ?? "Unable to delete writing post.");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete writing post.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase"
          type="button"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action permanently removes the writing post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
