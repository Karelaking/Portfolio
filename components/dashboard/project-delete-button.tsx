"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/actions/dashboard/projects/delete-project.action";
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

export interface ProjectDeleteButtonProps {
  projectId: string;
}

export const ProjectDeleteButton = ({
  projectId,
}: ProjectDeleteButtonProps): ReactElement => {
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
      formData.set("id", projectId);
      const result = await deleteProjectAction(null, formData);

      if (result.ok) {
        toast.success("Project deleted.");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error ?? "Unable to delete project.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete project.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
          type="button"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action permanently removes the project from your portfolio.
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
