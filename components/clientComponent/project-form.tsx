"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import type { createProject } from "@/actions/dashboard/projects/create-project.action";
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
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/action-result.interface";
import { ImageKitUpload } from "./imagekit-upload";

export interface ProjectFormValues {
	description: string;
	href: string;
	imageAlt: string;
	imageSrc: string;
	name: string;
	tags: string;
}

type ProjectFormAction = typeof createProject;

export interface ProjectFormProps {
	action: ProjectFormAction;
	defaultValues?: Partial<ProjectFormValues>;
	redirectTo?: string;
	submitLabel: string;
}

interface SubmitButtonProps {
	formId: string;
	label: string;
	onValidate?: () => boolean;
}

type ProjectFormErrors = Partial<Record<keyof ProjectFormValues, string>>;

const SubmitButton = ({
	label,
	formId,
	onValidate,
}: SubmitButtonProps): ReactElement => {
	const { pending } = useFormStatus();
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const confirmRef = useRef<HTMLButtonElement | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleTriggerPointerDown = (): void => {
		const active = document.activeElement;
		if (active instanceof HTMLElement && active !== triggerRef.current) {
			active.blur();
		}
	};

	const handleOpenChange = (nextOpen: boolean): void => {
		if (nextOpen) {
			const active = document.activeElement;
			if (active instanceof HTMLElement && active !== triggerRef.current) {
				active.blur();
			}
		}
		setOpen(nextOpen);
	};

	return (
		<AlertDialog onOpenChange={handleOpenChange} open={open}>
			<AlertDialogTrigger asChild>
				<button
					className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 font-semibold text-background text-xs uppercase tracking-[0.3em] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
					disabled={pending}
					onClick={(event): void => {
						if (!onValidate) {
							return;
						}
						const isValid = onValidate();
						if (!isValid) {
							event.preventDefault();
							event.stopPropagation();
						}
					}}
					onPointerDown={handleTriggerPointerDown}
					ref={triggerRef}
					type="button"
				>
					{pending ? "Saving..." : label}
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent
				onCloseAutoFocus={(event): void => {
					event.preventDefault();
					triggerRef.current?.focus();
				}}
				onOpenAutoFocus={(event): void => {
					event.preventDefault();
					confirmRef.current?.focus();
				}}
			>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm {label.toLowerCase()}</AlertDialogTitle>
					<AlertDialogDescription>
						This will {label.toLowerCase()} the project changes. You can update
						it again later.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							autoFocus
							className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 font-semibold text-background text-xs uppercase tracking-[0.3em] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
							disabled={pending}
							form={formId}
							onClick={(): void => {
								if (onValidate && !onValidate()) {
									return;
								}
								setOpen(false);
							}}
							ref={confirmRef}
							type="submit"
							variant="outline"
						>
							{pending ? "Saving..." : label}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export const ProjectForm = ({
	action,
	submitLabel,
	defaultValues,
	redirectTo,
}: ProjectFormProps): ReactElement => {
	const [state, formAction] = useActionState<ActionResult | null, FormData>(
		action,
		null
	);
	const [errors, setErrors] = useState<ProjectFormErrors>({});
	const [uploadError, setUploadError] = useState<string | null>(null);
	const formId = `project-form-${Date.now()}`;
	const imageSrcRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const targetUrl = redirectTo ?? "/dashboard/projects";

	useEffect((): void => {
		if (!state) {
			return;
		}

		if (state.ok) {
			const label = submitLabel.toLowerCase();
			const message = label.includes("update")
				? "Project updated."
				: "Project saved.";
			toast.success(message);
			router.push(targetUrl);
			return;
		}
		toast.error(state.error ?? "Unable to save project.");
	}, [state, router, submitLabel, targetUrl]);

	const isValidUrlOrPath = (value: string): boolean => {
		if (!value) {
			return false;
		}
		if (value.startsWith("/")) {
			return true;
		}
		try {
			new URL(value);
			return true;
		} catch {
			return false;
		}
	};

	const validateFormData = (formData: FormData): ProjectFormErrors => {
		const name = String(formData.get("name") ?? "").trim();
		const description = String(formData.get("description") ?? "").trim();
		const imageSrc = String(formData.get("imageSrc") ?? "").trim();
		const imageAlt = String(formData.get("imageAlt") ?? "").trim();
		const href = String(formData.get("href") ?? "").trim();
		const nextErrors: ProjectFormErrors = {};

		if (!name) {
			nextErrors.name = "Project name is required.";
		}
		if (!description) {
			nextErrors.description = "Description is required.";
		}
		if (!imageSrc) {
			nextErrors.imageSrc = "Image URL is required.";
		} else if (!isValidUrlOrPath(imageSrc)) {
			nextErrors.imageSrc = "Enter a valid image URL or path.";
		}
		if (!imageAlt) {
			nextErrors.imageAlt = "Alt text is required.";
		}
		if (href) {
			try {
				new URL(href);
			} catch {
				nextErrors.href = "Enter a valid project URL.";
			}
		} else {
			nextErrors.href = "Project URL is required.";
		}

		return nextErrors;
	};

	const applyValidation = (formData: FormData): boolean => {
		const nextErrors = validateFormData(formData);
		const hasErrors = Object.keys(nextErrors).length > 0;

		if (hasErrors) {
			setErrors(nextErrors);
			toast.error("Please fix the highlighted fields.");
			return false;
		}

		setErrors({});
		return true;
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		const form = event.currentTarget;
		const formData = new FormData(form);
		const isValid = applyValidation(formData);

		if (!isValid) {
			event.preventDefault();
		}
	};

	const handleValidateBeforeConfirm = (): boolean => {
		const form = document.getElementById(formId) as HTMLFormElement | null;
		if (!form) {
			return true;
		}
		return applyValidation(new FormData(form));
	};

	return (
		<form
			action={formAction}
			className="grid gap-4"
			id={formId}
			noValidate
			onSubmit={handleSubmit}
		>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Name
				<input
					aria-describedby={errors.name ? "project-name-error" : undefined}
					aria-invalid={errors.name ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.name ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.name ?? ""}
					name="name"
					required
					type="text"
				/>
				{errors.name ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="project-name-error"
					>
						{errors.name}
					</span>
				) : null}
			</label>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Description
				<textarea
					aria-describedby={
						errors.description ? "project-description-error" : undefined
					}
					aria-invalid={errors.description ? true : undefined}
					className={cn(
						"min-h-30 rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.description ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.description ?? ""}
					name="description"
					required
				/>
				{errors.description ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="project-description-error"
					>
						{errors.description}
					</span>
				) : null}
			</label>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Tags (comma separated)
				<input
					className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm"
					defaultValue={defaultValues?.tags ?? ""}
					name="tags"
					placeholder="Design System, Next.js"
					type="text"
				/>
			</label>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Image URL
				<input
					aria-describedby={
						errors.imageSrc ? "project-image-src-error" : undefined
					}
					aria-invalid={errors.imageSrc ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.imageSrc ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.imageSrc ?? ""}
					name="imageSrc"
					ref={imageSrcRef}
					required
					type="text"
				/>
				{errors.imageSrc ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="project-image-src-error"
					>
						{errors.imageSrc}
					</span>
				) : null}
				<div className="mt-2">
					<ImageKitUpload
						existingImageAlt={defaultValues?.imageAlt ?? undefined}
						existingImageUrl={defaultValues?.imageSrc ?? undefined}
						folder="projects"
						onUploadError={(error) => {
							setUploadError(error);
							toast.error("Image upload failed.");
						}}
						onUploadSuccess={(url) => {
							if (imageSrcRef.current) {
								imageSrcRef.current.value = url;
							}
							setUploadError(null);
							toast.success("Image uploaded.");
						}}
					/>
				</div>
				{uploadError ? (
					<p className="font-normal text-destructive text-xs normal-case tracking-normal">
						{uploadError}
					</p>
				) : null}
			</label>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Image alt text
				<input
					aria-describedby={
						errors.imageAlt ? "project-image-alt-error" : undefined
					}
					aria-invalid={errors.imageAlt ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.imageAlt ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.imageAlt ?? ""}
					name="imageAlt"
					required
					type="text"
				/>
				{errors.imageAlt ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="project-image-alt-error"
					>
						{errors.imageAlt}
					</span>
				) : null}
			</label>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Project URL
				<input
					aria-describedby={errors.href ? "project-href-error" : undefined}
					aria-invalid={errors.href ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.href ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.href ?? ""}
					name="href"
					required
					type="url"
				/>
				{errors.href ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="project-href-error"
					>
						{errors.href}
					</span>
				) : null}
			</label>
			{state?.error ? (
				<p className="text-destructive text-sm">{state.error}</p>
			) : null}
			<SubmitButton
				formId={formId}
				label={submitLabel}
				onValidate={handleValidateBeforeConfirm}
			/>
		</form>
	);
};
