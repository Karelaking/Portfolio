"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import type { createExperience } from "@/actions/dashboard/experience/create-experience.action";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/action-result.interface";

export interface ExperienceFormValues {
	company: string;
	coreTech: string;
	highlights: string;
	period: string;
	role: string;
	summary: string;
}

type ExperienceFormAction = typeof createExperience;

export interface ExperienceFormProps {
	action: ExperienceFormAction;
	defaultValues?: Partial<ExperienceFormValues>;
	redirectTo?: string;
	submitLabel: string;
}

interface ExperienceFormErrors {
	company?: string;
	highlights?: string;
	period?: string;
	role?: string;
	summary?: string;
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

const parseHighlights = (value: string): string[] =>
	value
		.split(/\r?\n|,/)
		.map((item) => item.trim())
		.filter((item) => item.length > 0);

export const ExperienceForm = ({
	action,
	submitLabel,
	defaultValues,
	redirectTo,
}: ExperienceFormProps): ReactElement => {
	const [state, formAction] = useActionState<ActionResult | null, FormData>(
		action,
		null
	);
	const [errors, setErrors] = useState<ExperienceFormErrors>({});
	const router = useRouter();
	const targetUrl = redirectTo ?? "/dashboard/experience";

	useEffect((): void => {
		if (!state) {
			return;
		}

		if (state.ok) {
			toast.success("Experience saved.");
			router.push(targetUrl);
			return;
		}

		toast.error(state.error ?? "Unable to save experience.");
	}, [router, state, targetUrl]);

	const validateFormData = (formData: FormData): ExperienceFormErrors => {
		const role = String(formData.get("role") ?? "").trim();
		const company = String(formData.get("company") ?? "").trim();
		const period = String(formData.get("period") ?? "").trim();
		const summary = String(formData.get("summary") ?? "").trim();
		const highlights = String(formData.get("highlights") ?? "").trim();

		const nextErrors: ExperienceFormErrors = {};

		if (!role) {
			nextErrors.role = "Role is required.";
		}
		if (!company) {
			nextErrors.company = "Company is required.";
		}
		if (!period) {
			nextErrors.period = "Period is required.";
		}
		if (!summary) {
			nextErrors.summary = "Summary is required.";
		}

		if (!highlights) {
			nextErrors.highlights = "Add at least one highlight.";
		} else if (parseHighlights(highlights).length === 0) {
			nextErrors.highlights = "Add at least one highlight.";
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
				Role
				<input
					aria-describedby={errors.role ? "experience-role-error" : undefined}
					aria-invalid={errors.role ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.role ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.role ?? ""}
					name="role"
					required
					type="text"
				/>
				{errors.role ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="experience-role-error"
					>
						{errors.role}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Company
				<input
					aria-describedby={
						errors.company ? "experience-company-error" : undefined
					}
					aria-invalid={errors.company ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.company ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.company ?? ""}
					name="company"
					required
					type="text"
				/>
				{errors.company ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="experience-company-error"
					>
						{errors.company}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Period
				<input
					aria-describedby={
						errors.period ? "experience-period-error" : undefined
					}
					aria-invalid={errors.period ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.period ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.period ?? ""}
					name="period"
					required
					type="text"
				/>
				{errors.period ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="experience-period-error"
					>
						{errors.period}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Summary
				<textarea
					aria-describedby={
						errors.summary ? "experience-summary-error" : undefined
					}
					aria-invalid={errors.summary ? true : undefined}
					className={cn(
						"min-h-30 rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.summary ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.summary ?? ""}
					name="summary"
					required
				/>
				{errors.summary ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="experience-summary-error"
					>
						{errors.summary}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Core tech (one per line)
				<textarea
					className="min-h-27.5 rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm"
					defaultValue={defaultValues?.coreTech ?? ""}
					name="coreTech"
					placeholder="React\nNext.js\nTypeScript"
				/>
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Highlights (one per line)
				<textarea
					aria-describedby={
						errors.highlights ? "experience-highlights-error" : undefined
					}
					aria-invalid={errors.highlights ? true : undefined}
					className={cn(
						"min-h-35 rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.highlights ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.highlights ?? ""}
					name="highlights"
					required
				/>
				{errors.highlights ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="experience-highlights-error"
					>
						{errors.highlights}
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
