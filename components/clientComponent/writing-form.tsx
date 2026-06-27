"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/action-result.interface";
import { ImageKitUpload } from "./imagekit-upload";
import { NovelTextEditor } from "./novel-text-editor";

export interface WritingFormValues {
	content: string;
	coverImageAlt: string;
	coverImageSrc: string;
	publishedAt: string;
	tags: string;
	title: string;
}

export interface WritingFormProps {
	action: (
		prevState: ActionResult | null,
		formData: FormData
	) => Promise<ActionResult>;
	defaultValues?: Partial<WritingFormValues>;
	redirectTo?: string;
	submitLabel: string;
}

interface WritingFormErrors {
	content?: string;
	coverImageAlt?: string;
	coverImageSrc?: string;
	publishedAt?: string;
	tags?: string;
	title?: string;
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

const stripHtml = (value: string): string =>
	value
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/\s+/g, " ")
		.trim();

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

export const WritingForm = ({
	action,
	submitLabel,
	defaultValues,
	redirectTo,
}: WritingFormProps): ReactElement => {
	const [state, formAction] = useActionState<ActionResult | null, FormData>(
		action,
		null
	);
	const [errors, setErrors] = useState<WritingFormErrors>({});
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [contentHtml, setContentHtml] = useState<string>(
		defaultValues?.content ?? ""
	);

	const router = useRouter();
	const targetUrl = redirectTo ?? "/dashboard/writing";
	const coverImageRef = useRef<HTMLInputElement | null>(null);

	useEffect((): void => {
		if (!state) {
			return;
		}

		if (state.ok) {
			toast.success("Writing post saved.");
			router.push(targetUrl);
			return;
		}

		toast.error(state.error ?? "Unable to save writing post.");
	}, [router, state, targetUrl]);

	const validateFormData = (formData: FormData): WritingFormErrors => {
		const title = String(formData.get("title") ?? "").trim();
		const coverImageSrc = String(formData.get("coverImageSrc") ?? "").trim();
		const coverImageAlt = String(formData.get("coverImageAlt") ?? "").trim();
		const tags = String(formData.get("tags") ?? "").trim();
		const publishedAt = String(formData.get("publishedAt") ?? "").trim();

		const nextErrors: WritingFormErrors = {};

		if (!title) {
			nextErrors.title = "Title is required.";
		}

		if (!(coverImageSrc && isValidUrlOrPath(coverImageSrc))) {
			nextErrors.coverImageSrc = "Enter a valid image URL or path.";
		}

		if (!coverImageAlt) {
			nextErrors.coverImageAlt = "Cover image alt text is required.";
		}

		if (!contentHtml || stripHtml(contentHtml).length === 0) {
			nextErrors.content = "Content is required.";
		}

		if (!tags) {
			nextErrors.tags = "Add at least one tag.";
		}

		if (!publishedAt) {
			nextErrors.publishedAt = "Published date is required.";
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
			<input name="content" type="hidden" value={contentHtml} />

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Title
				<input
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.title ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.title ?? ""}
					name="title"
					required
					type="text"
				/>
				{errors.title ? (
					<span className="font-normal text-destructive text-xs normal-case tracking-normal">
						{errors.title}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Cover image URL
				<input
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.coverImageSrc ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.coverImageSrc ?? ""}
					name="coverImageSrc"
					ref={coverImageRef}
					required
					type="text"
				/>
				{errors.coverImageSrc ? (
					<span className="font-normal text-destructive text-xs normal-case tracking-normal">
						{errors.coverImageSrc}
					</span>
				) : null}
				<div className="mt-2">
					<ImageKitUpload
						existingImageAlt={defaultValues?.coverImageAlt ?? undefined}
						existingImageUrl={defaultValues?.coverImageSrc ?? undefined}
						folder="writing"
						onUploadError={(error) => {
							setUploadError(error);
							toast.error("Image upload failed.");
						}}
						onUploadSuccess={(url) => {
							if (coverImageRef.current) {
								coverImageRef.current.value = url;
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
				Cover image alt text
				<input
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.coverImageAlt ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.coverImageAlt ?? ""}
					name="coverImageAlt"
					required
					type="text"
				/>
				{errors.coverImageAlt ? (
					<span className="font-normal text-destructive text-xs normal-case tracking-normal">
						{errors.coverImageAlt}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Content
				<NovelTextEditor
					initialValue={defaultValues?.content ?? ""}
					onChange={(html) => {
						setContentHtml(html);
					}}
					placeholder="Write your shayari, poem, or story here..."
				/>
				{errors.content ? (
					<span className="font-normal text-destructive text-xs normal-case tracking-normal">
						{errors.content}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Tags (comma separated)
				<input
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.tags ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.tags ?? ""}
					name="tags"
					placeholder="shayari, hindi, late-night"
					required
					type="text"
				/>
				{errors.tags ? (
					<span className="font-normal text-destructive text-xs normal-case tracking-normal">
						{errors.tags}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Published at
				<input
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.publishedAt ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.publishedAt ?? ""}
					name="publishedAt"
					placeholder="Mar 2026"
					required
					type="text"
				/>
				{errors.publishedAt ? (
					<span className="font-normal text-destructive text-xs normal-case tracking-normal">
						{errors.publishedAt}
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
