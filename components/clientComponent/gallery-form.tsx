"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import type { createGalleryImage } from "@/actions/dashboard/gallery/create-gallery-image.action";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/action-result.interface";
import { ImageKitUpload } from "./imagekit-upload";

export interface GalleryFormValues {
	alt: string;
	imageFileId?: string;
	src: string;
}

type GalleryFormAction = typeof createGalleryImage;

export interface GalleryFormProps {
	action: GalleryFormAction;
	defaultValues?: Partial<GalleryFormValues>;
	redirectTo?: string;
	submitLabel: string;
}

interface GalleryFormErrors {
	alt?: string;
	src?: string;
}

interface SubmitButtonProps {
	label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps): ReactElement => {
	const { pending } = useFormStatus();

	return (
		<Button
			className="rounded-full bg-foreground px-5 py-3 font-semibold text-background text-xs uppercase tracking-[0.3em]"
			disabled={pending}
			type="submit"
		>
			{pending ? "Saving..." : label}
		</Button>
	);
};

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

export const GalleryForm = ({
	action,
	submitLabel,
	defaultValues,
	redirectTo,
}: GalleryFormProps): ReactElement => {
	const [state, formAction] = useActionState<ActionResult | null, FormData>(
		action,
		null
	);
	const [errors, setErrors] = useState<GalleryFormErrors>({});
	const [uploadError, setUploadError] = useState<string | null>(null);
	const router = useRouter();
	const targetUrl = redirectTo ?? "/dashboard/gallery";
	const imageSrcRef = useRef<HTMLInputElement | null>(null);
	const imageFileIdRef = useRef<HTMLInputElement | null>(null);

	useEffect((): void => {
		if (!state) {
			return;
		}

		if (state.ok) {
			toast.success("Gallery image saved.");
			router.push(targetUrl);
			return;
		}

		toast.error(state.error ?? "Unable to save image.");
	}, [router, state, targetUrl]);

	const validateFormData = (formData: FormData): GalleryFormErrors => {
		const src = String(formData.get("src") ?? "").trim();
		const alt = String(formData.get("alt") ?? "").trim();
		const nextErrors: GalleryFormErrors = {};

		if (!src) {
			nextErrors.src = "Image URL is required.";
		} else if (!isValidUrlOrPath(src)) {
			nextErrors.src = "Enter a valid image URL or path.";
		}

		if (!alt) {
			nextErrors.alt = "Alt text is required.";
		}

		return nextErrors;
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		const formData = new FormData(event.currentTarget);
		const nextErrors = validateFormData(formData);
		const hasErrors = Object.keys(nextErrors).length > 0;

		if (hasErrors) {
			event.preventDefault();
			setErrors(nextErrors);
			toast.error("Please fix the highlighted fields.");
			return;
		}

		setErrors({});
	};

	return (
		<form
			action={formAction}
			className="grid gap-4"
			noValidate
			onSubmit={handleSubmit}
		>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Image URL
				<input
					defaultValue={defaultValues?.imageFileId ?? ""}
					name="imageFileId"
					ref={imageFileIdRef}
					type="hidden"
				/>
				<input
					aria-describedby={errors.src ? "gallery-src-error" : undefined}
					aria-invalid={errors.src ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.src ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.src ?? ""}
					name="src"
					ref={imageSrcRef}
					required
					type="text"
				/>
				{errors.src ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="gallery-src-error"
					>
						{errors.src}
					</span>
				) : null}
				<div className="mt-2">
					<ImageKitUpload
						existingImageAlt={defaultValues?.alt ?? undefined}
						existingImageUrl={defaultValues?.src ?? undefined}
						folder="gallery"
						onUploadError={(error) => {
							setUploadError(error);
							toast.error("Image upload failed.");
						}}
						onUploadSuccess={(url, fileId) => {
							if (imageSrcRef.current) {
								imageSrcRef.current.value = url;
							}
							if (imageFileIdRef.current) {
								imageFileIdRef.current.value = fileId ?? "";
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
				Alt text
				<input
					aria-describedby={errors.alt ? "gallery-alt-error" : undefined}
					aria-invalid={errors.alt ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.alt ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.alt ?? ""}
					name="alt"
					required
					type="text"
				/>
				{errors.alt ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="gallery-alt-error"
					>
						{errors.alt}
					</span>
				) : null}
			</label>

			{state?.error ? (
				<p className="text-destructive text-sm">{state.error}</p>
			) : null}

			<SubmitButton label={submitLabel} />
		</form>
	);
};
