"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import type { createTechnology } from "@/actions/dashboard/technologies/create-technology.action";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/action-result.interface";
import type { ProjectItem } from "@/types/project-item.interface";

export interface TechnologyFormValues {
	description: string;
	logoKey: string;
	name: string;
	projectIds: string[];
	websiteUrl: string;
}

export interface TechnologyFormProps {
	action: TechnologyFormAction;
	defaultValues?: Partial<TechnologyFormValues>;
	projects: ProjectItem[];
	redirectTo?: string;
	submitLabel: string;
}

type TechnologyFormAction = typeof createTechnology;

type TechnologyFormErrors = Partial<
	Record<"name" | "description" | "websiteUrl" | "logoKey", string>
>;

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

export const TechnologyForm = ({
	action,
	projects,
	submitLabel,
	defaultValues,
	redirectTo,
}: TechnologyFormProps): ReactElement => {
	const [state, formAction] = useActionState<ActionResult | null, FormData>(
		action,
		null
	);
	const [errors, setErrors] = useState<TechnologyFormErrors>({});
	const router = useRouter();
	const targetUrl = redirectTo ?? "/dashboard/technologies";

	useEffect((): void => {
		if (!state) {
			return;
		}

		if (state.ok) {
			toast.success("Technology saved.");
			router.push(targetUrl);
			return;
		}

		toast.error(state.error ?? "Unable to save technology.");
	}, [router, state, targetUrl]);

	const validateUrl = (value: string): boolean => {
		try {
			new URL(value);
			return true;
		} catch {
			return false;
		}
	};

	const validateFormData = (formData: FormData): TechnologyFormErrors => {
		const name = String(formData.get("name") ?? "").trim();
		const description = String(formData.get("description") ?? "").trim();
		const websiteUrl = String(formData.get("websiteUrl") ?? "").trim();
		const logoKey = String(formData.get("logoKey") ?? "").trim();

		const nextErrors: TechnologyFormErrors = {};

		if (!name) {
			nextErrors.name = "Technology name is required.";
		}

		if (!description) {
			nextErrors.description = "Description is required.";
		}

		if (!websiteUrl) {
			nextErrors.websiteUrl = "Website URL is required.";
		} else if (!validateUrl(websiteUrl)) {
			nextErrors.websiteUrl = "Enter a valid website URL.";
		}

		if (!logoKey) {
			nextErrors.logoKey = "Logo key is required.";
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

	const selectedProjectIds = new Set(defaultValues?.projectIds ?? []);

	return (
		<form
			action={formAction}
			className="grid gap-4"
			noValidate
			onSubmit={handleSubmit}
		>
			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Technology name
				<input
					aria-describedby={errors.name ? "technology-name-error" : undefined}
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
						id="technology-name-error"
					>
						{errors.name}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Description
				<textarea
					aria-describedby={
						errors.description ? "technology-description-error" : undefined
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
						id="technology-description-error"
					>
						{errors.description}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Website URL
				<input
					aria-describedby={
						errors.websiteUrl ? "technology-website-error" : undefined
					}
					aria-invalid={errors.websiteUrl ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.websiteUrl ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.websiteUrl ?? ""}
					name="websiteUrl"
					placeholder="https://example.dev"
					required
					type="url"
				/>
				{errors.websiteUrl ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="technology-website-error"
					>
						{errors.websiteUrl}
					</span>
				) : null}
			</label>

			<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
				Logo key
				<input
					aria-describedby={
						errors.logoKey ? "technology-logo-key-error" : undefined
					}
					aria-invalid={errors.logoKey ? true : undefined}
					className={cn(
						"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
						errors.logoKey ? "border-destructive" : null
					)}
					defaultValue={defaultValues?.logoKey ?? ""}
					name="logoKey"
					placeholder="react, nestjs, tailwindcss"
					required
					type="text"
				/>
				{errors.logoKey ? (
					<span
						className="font-normal text-destructive text-xs normal-case tracking-normal"
						id="technology-logo-key-error"
					>
						{errors.logoKey}
					</span>
				) : null}
			</label>

			<fieldset className="rounded-2xl border border-border p-4">
				<legend className="px-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
					Connected projects
				</legend>

				{projects.length === 0 ? (
					<p className="text-muted-foreground text-sm">
						No projects available yet.
					</p>
				) : (
					<div className="grid gap-2 sm:grid-cols-2">
						{projects.map((project) => (
							<label
								className="flex items-start gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm"
								key={project.id}
							>
								<input
									className="mt-1"
									defaultChecked={selectedProjectIds.has(project.id)}
									name="projectIds"
									type="checkbox"
									value={project.id}
								/>
								<span>
									<span className="block font-medium text-foreground">
										{project.name}
									</span>
									<span className="block text-muted-foreground text-xs">
										{project.href}
									</span>
								</span>
							</label>
						))}
					</div>
				)}
			</fieldset>

			{state?.error ? (
				<p className="text-destructive text-sm">{state.error}</p>
			) : null}

			<SubmitButton label={submitLabel} />
		</form>
	);
};
