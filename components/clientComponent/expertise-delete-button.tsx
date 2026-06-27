"use client";

import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteExpertiseAction } from "@/actions/dashboard/expertise/delete-expertise.action";
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
	Button,
} from "@/components/ui";

export interface ExpertiseDeleteButtonProps {
	expertiseId: string;
}

export const ExpertiseDeleteButton = ({
	expertiseId,
}: ExpertiseDeleteButtonProps): ReactElement => {
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
			formData.set("id", expertiseId);
			const result = await deleteExpertiseAction(null, formData);

			if (result.ok) {
				toast.success("Expertise deleted.");
				setOpen(false);
				router.refresh();
			} else {
				toast.error(result.error ?? "Unable to delete expertise.");
			}
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Unable to delete expertise."
			);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<AlertDialog onOpenChange={setOpen} open={open}>
			<AlertDialogTrigger asChild>
				<Button
					className="rounded-full border px-4 py-2 font-semibold text-xs uppercase tracking-[0.2em]"
					type="button"
				>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this expertise?</AlertDialogTitle>
					<AlertDialogDescription>
						This action permanently removes the expertise card.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							disabled={isPending}
							onClick={handleConfirmDelete}
							type="button"
							variant="destructive"
						>
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
