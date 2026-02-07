"use client";

import type { ReactElement } from "react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteProjectAction } from "@/app/dashboard/projects/actions";
import type { ActionResult } from "@/lib/portfolio/types";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export interface ProjectDeleteButtonProps {
  projectId: string;
}

export const ProjectDeleteButton = ({
  projectId,
}: ProjectDeleteButtonProps): ReactElement => {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    deleteProjectAction,
    null,
  );

  useEffect((): void => {
    if (!state) {
      return;
    }

    if (state.ok) {
      toast.success("Project deleted.");
      return;
    }

    toast.error(state.error ?? "Unable to delete project.");
  }, [state]);

  return (
    <form action={formAction}>
      <input name="id" type="hidden" value={projectId} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] "
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
