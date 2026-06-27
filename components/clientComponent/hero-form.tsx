"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteHeroAction } from "@/actions/dashboard/hero/delete-hero.action";
import { upsertHeroAction } from "@/actions/dashboard/hero/upsert-hero.action";
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
import type { HeroData } from "@/types/hero/hero-data.interface";
import type { HeroMetric } from "@/types/hero/hero-metric.interface";
import { ImageKitUpload } from "./imagekit-upload";

interface HeroFormProps {
	initialValues: HeroData;
}

interface HeroFormErrors {
	availability?: string;
	description?: string;
	imageAlt?: string;
	imageSrc?: string;
	location?: string;
	metrics?: string;
	subtitle?: string;
	title?: string;
}

interface HeroMetricEntry extends HeroMetric {
	id: string;
}

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

const createMetricId = (): string => {
	if (typeof globalThis.crypto?.randomUUID === "function") {
		return globalThis.crypto.randomUUID();
	}
	return `metric-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const HeroForm = ({ initialValues }: HeroFormProps): ReactElement => {
	const [state, formAction] = useActionState<ActionResult | null, FormData>(
		upsertHeroAction,
		null
	);
	const [errors, setErrors] = useState<HeroFormErrors>({});
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [metrics, setMetrics] = useState<HeroMetricEntry[]>(() => {
		if (initialValues.metrics.length > 0) {
			return initialValues.metrics.map((metric) => ({
				...metric,
				id: createMetricId(),
			}));
		}
		return [{ label: "", value: "", id: createMetricId() }];
	});
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
	const [deletePending, setDeletePending] = useState<boolean>(false);
	const router = useRouter();
	const imageSrcRef = useRef<HTMLInputElement | null>(null);

	const metricsJson = useMemo<string>(
		() =>
			JSON.stringify(
				metrics.map((metric) => ({ label: metric.label, value: metric.value }))
			),
		[metrics]
	);

	useEffect((): void => {
		if (!state) {
			return;
		}

		if (state.ok) {
			toast.success("Hero updated.");
			setErrors({});
			router.refresh();
			return;
		}

		toast.error(state.error ?? "Unable to update hero.");
	}, [router, state]);

	const updateMetric = (
		index: number,
		key: keyof HeroMetric,
		value: string
	): void => {
		setMetrics((current) =>
			current.map((metric, metricIndex) =>
				metricIndex === index ? { ...metric, [key]: value } : metric
			)
		);
	};

	const handleAddMetric = (): void => {
		setMetrics((current) => [
			...current,
			{ label: "", value: "", id: createMetricId() },
		]);
	};

	const handleRemoveMetric = (index: number): void => {
		setMetrics((current) =>
			current.filter((_, metricIndex) => metricIndex !== index)
		);
	};

	const validateFormData = (formData: FormData): HeroFormErrors => {
		const title = String(formData.get("title") ?? "").trim();
		const subtitle = String(formData.get("subtitle") ?? "").trim();
		const description = String(formData.get("description") ?? "").trim();
		const location = String(formData.get("location") ?? "").trim();
		const availability = String(formData.get("availability") ?? "").trim();
		const imageSrc = String(formData.get("imageSrc") ?? "").trim();
		const imageAlt = String(formData.get("imageAlt") ?? "").trim();

		const nextErrors: HeroFormErrors = {};

		if (!title) {
			nextErrors.title = "Title is required.";
		}
		if (!subtitle) {
			nextErrors.subtitle = "Subtitle is required.";
		}
		if (!description) {
			nextErrors.description = "Description is required.";
		}
		if (!location) {
			nextErrors.location = "Location is required.";
		}
		if (!availability) {
			nextErrors.availability = "Availability is required.";
		}
		if (!imageSrc) {
			nextErrors.imageSrc = "Image URL is required.";
		} else if (!isValidUrlOrPath(imageSrc)) {
			nextErrors.imageSrc =
				"Enter a valid URL or path (e.g. /images/hero.svg).";
		}
		if (!imageAlt) {
			nextErrors.imageAlt = "Image alt text is required.";
		}

		const hasInvalidMetric = metrics.some(
			(metric) =>
				metric.label.trim().length === 0 || metric.value.trim().length === 0
		);
		if (metrics.length === 0 || hasInvalidMetric) {
			nextErrors.metrics = "Add at least one metric with a label and value.";
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

	const handleDelete = async (): Promise<void> => {
		try {
			setDeletePending(true);
			const result = await deleteHeroAction();
			if (result.ok) {
				toast.success("Hero deleted. Using fallback content now.");
				setDeleteOpen(false);
				router.refresh();
				return;
			}
			toast.error(result.error ?? "Unable to delete hero.");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Unable to delete hero."
			);
		} finally {
			setDeletePending(false);
		}
	};

	return (
		<div className="space-y-6">
			<form
				action={formAction}
				className="grid gap-4"
				noValidate
				onSubmit={handleSubmit}
			>
				<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
					Title
					<input
						aria-describedby={errors.title ? "hero-title-error" : undefined}
						aria-invalid={errors.title ? true : undefined}
						className={cn(
							"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
							errors.title ? "border-destructive" : null
						)}
						defaultValue={initialValues.title}
						name="title"
						required
						type="text"
					/>
					{errors.title ? (
						<span
							className="font-normal text-destructive text-xs normal-case tracking-normal"
							id="hero-title-error"
						>
							{errors.title}
						</span>
					) : null}
				</label>

				<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
					Subtitle
					<input
						aria-describedby={
							errors.subtitle ? "hero-subtitle-error" : undefined
						}
						aria-invalid={errors.subtitle ? true : undefined}
						className={cn(
							"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
							errors.subtitle ? "border-destructive" : null
						)}
						defaultValue={initialValues.subtitle}
						name="subtitle"
						required
						type="text"
					/>
					{errors.subtitle ? (
						<span
							className="font-normal text-destructive text-xs normal-case tracking-normal"
							id="hero-subtitle-error"
						>
							{errors.subtitle}
						</span>
					) : null}
				</label>

				<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
					Description
					<textarea
						aria-describedby={
							errors.description ? "hero-description-error" : undefined
						}
						aria-invalid={errors.description ? true : undefined}
						className={cn(
							"min-h-30 rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
							errors.description ? "border-destructive" : null
						)}
						defaultValue={initialValues.description}
						name="description"
						required
					/>
					{errors.description ? (
						<span
							className="font-normal text-destructive text-xs normal-case tracking-normal"
							id="hero-description-error"
						>
							{errors.description}
						</span>
					) : null}
				</label>

				<div className="grid gap-4 sm:grid-cols-2">
					<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Location
						<input
							aria-describedby={
								errors.location ? "hero-location-error" : undefined
							}
							aria-invalid={errors.location ? true : undefined}
							className={cn(
								"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
								errors.location ? "border-destructive" : null
							)}
							defaultValue={initialValues.location}
							name="location"
							required
							type="text"
						/>
						{errors.location ? (
							<span
								className="font-normal text-destructive text-xs normal-case tracking-normal"
								id="hero-location-error"
							>
								{errors.location}
							</span>
						) : null}
					</label>

					<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Availability
						<input
							aria-describedby={
								errors.availability ? "hero-availability-error" : undefined
							}
							aria-invalid={errors.availability ? true : undefined}
							className={cn(
								"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
								errors.availability ? "border-destructive" : null
							)}
							defaultValue={initialValues.availability}
							name="availability"
							required
							type="text"
						/>
						{errors.availability ? (
							<span
								className="font-normal text-destructive text-xs normal-case tracking-normal"
								id="hero-availability-error"
							>
								{errors.availability}
							</span>
						) : null}
					</label>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<label className="grid gap-2 text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Image URL
						<input
							aria-describedby={
								errors.imageSrc ? "hero-image-src-error" : undefined
							}
							aria-invalid={errors.imageSrc ? true : undefined}
							className={cn(
								"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
								errors.imageSrc ? "border-destructive" : null
							)}
							defaultValue={initialValues.imageSrc}
							name="imageSrc"
							ref={imageSrcRef}
							required
							type="text"
						/>
						{errors.imageSrc ? (
							<span
								className="font-normal text-destructive text-xs normal-case tracking-normal"
								id="hero-image-src-error"
							>
								{errors.imageSrc}
							</span>
						) : null}
						<div className="mt-2">
							<ImageKitUpload
								existingImageAlt={initialValues.imageAlt}
								existingImageUrl={initialValues.imageSrc}
								folder="hero"
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
								errors.imageAlt ? "hero-image-alt-error" : undefined
							}
							aria-invalid={errors.imageAlt ? true : undefined}
							className={cn(
								"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
								errors.imageAlt ? "border-destructive" : null
							)}
							defaultValue={initialValues.imageAlt}
							name="imageAlt"
							required
							type="text"
						/>
						{errors.imageAlt ? (
							<span
								className="font-normal text-destructive text-xs normal-case tracking-normal"
								id="hero-image-alt-error"
							>
								{errors.imageAlt}
							</span>
						) : null}
					</label>
				</div>

				<div className="space-y-3 rounded-3xl border border-border/70 bg-card p-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
								Metrics
							</p>
							<p className="text-muted-foreground text-sm">
								Update the quick stats shown beneath the hero headline.
							</p>
						</div>
						<Button
							className="rounded-full border border-border px-4 py-2 font-semibold text-xs uppercase tracking-[0.2em]"
							onClick={handleAddMetric}
							type="button"
							variant="outline"
						>
							Add metric
						</Button>
					</div>

					<div className="space-y-3">
						{metrics.map((metric, index) => {
							const metricInvalid =
								Boolean(errors.metrics) &&
								(metric.label.trim().length === 0 ||
									metric.value.trim().length === 0);

							return (
								<div
									className="grid gap-3 sm:grid-cols-[1.2fr_1fr_auto]"
									key={metric.id}
								>
									<input
										className={cn(
											"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
											metricInvalid ? "border-destructive" : null
										)}
										onChange={(event): void =>
											updateMetric(index, "label", event.target.value)
										}
										placeholder="Label"
										type="text"
										value={metric.label}
									/>
									<input
										className={cn(
											"rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm",
											metricInvalid ? "border-destructive" : null
										)}
										onChange={(event): void =>
											updateMetric(index, "value", event.target.value)
										}
										placeholder="Value"
										type="text"
										value={metric.value}
									/>
									<Button
										className="rounded-full border border-border px-4 py-2 font-semibold text-xs uppercase tracking-[0.2em]"
										disabled={metrics.length <= 1}
										onClick={(): void => handleRemoveMetric(index)}
										type="button"
										variant="outline"
									>
										Remove
									</Button>
								</div>
							);
						})}
					</div>

					{errors.metrics ? (
						<p className="font-normal text-destructive text-xs normal-case tracking-normal">
							{errors.metrics}
						</p>
					) : null}
				</div>

				<input name="metrics" type="hidden" value={metricsJson} />

				<div className="flex flex-wrap items-center gap-3">
					<Button
						className="rounded-full bg-foreground px-5 py-3 font-semibold text-background text-xs uppercase tracking-[0.3em]"
						type="submit"
					>
						Save hero
					</Button>
				</div>
			</form>

			<div className="rounded-3xl border border-border/70 bg-card p-5">
				<div className="space-y-3">
					<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Danger zone
					</p>
					<p className="text-muted-foreground text-sm">
						Removing the hero entry will fall back to the default placeholder
						content.
					</p>
					<AlertDialog onOpenChange={setDeleteOpen} open={deleteOpen}>
						<AlertDialogTrigger asChild>
							<Button
								className="rounded-full border border-destructive/60 px-4 py-2 font-semibold text-destructive text-xs uppercase tracking-[0.2em]"
								type="button"
								variant="outline"
							>
								Delete hero data
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete hero content?</AlertDialogTitle>
								<AlertDialogDescription>
									This will remove the stored hero data and restore the fallback
									copy.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button
										className="rounded-full bg-destructive px-4 py-2 font-semibold text-destructive-foreground text-xs uppercase tracking-[0.2em]"
										disabled={deletePending}
										onClick={handleDelete}
										type="button"
									>
										{deletePending ? "Deleting..." : "Delete"}
									</Button>
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	);
};
