"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteGalleryImageAction } from "@/actions/dashboard/gallery/delete-gallery-image.action";
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

export interface GalleryDeleteButtonProps {
  imageId: string;
}

export const GalleryDeleteButton = ({
  imageId,
}: GalleryDeleteButtonProps): ReactElement => {
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
      formData.set("id", imageId);
      const result = await deleteGalleryImageAction(null, formData);

      if (result.ok) {
        toast.success("Gallery image deleted.");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error ?? "Unable to delete image.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete image.",
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
          <AlertDialogTitle>Delete this image?</AlertDialogTitle>
          <AlertDialogDescription>
            This action permanently removes the image from your gallery.
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
