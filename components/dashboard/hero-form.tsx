"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
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
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/action-result.interface";
import type { HeroData } from "@/types/hero-data.interface";
import type { HeroMetric } from "@/types/hero-metric.interface";
import { deleteHeroAction } from "@/actions/dashboard/hero/delete-hero.action";
import { upsertHeroAction } from "@/actions/dashboard/hero/upsert-hero.action";

interface HeroFormProps {
  initialValues: HeroData;
}

interface HeroFormErrors {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  availability?: string;
  imageSrc?: string;
  imageAlt?: string;
  metrics?: string;
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
    null,
  );
  const [errors, setErrors] = useState<HeroFormErrors>({});
  const [uploadPending, setUploadPending] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
  const uploadInputId = useId();
  const imageSrcRef = useRef<HTMLInputElement | null>(null);

  const metricsJson = useMemo<string>(() => {
    return JSON.stringify(
      metrics.map((metric) => ({ label: metric.label, value: metric.value })),
    );
  }, [metrics]);

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

  const updateMetric = (index: number, key: keyof HeroMetric, value: string): void => {
    setMetrics((current) =>
      current.map((metric, metricIndex) =>
        metricIndex === index ? { ...metric, [key]: value } : metric,
      ),
    );
  };

  const handleAddMetric = (): void => {
    setMetrics((current) => [...current, { label: "", value: "", id: createMetricId() }]);
  };

  const handleRemoveMetric = (index: number): void => {
    setMetrics((current) => current.filter((_, metricIndex) => metricIndex !== index));
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
      nextErrors.imageSrc = "Enter a valid URL or path (e.g. /images/hero.svg).";
    }
    if (!imageAlt) {
      nextErrors.imageAlt = "Image alt text is required.";
    }

    const hasInvalidMetric = metrics.some(
      (metric) => metric.label.trim().length === 0 || metric.value.trim().length === 0,
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

  const handleImageUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setUploadError("Select an image to upload.");
      return;
    }

    setUploadPending(true);
    setUploadError(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", selectedFile);
      uploadData.append("folder", "assets");

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: uploadData,
      });

      const result = (await response.json()) as { ok: boolean; url?: string; error?: string };
      if (!response.ok || !result.ok || !result.url) {
        throw new Error(result.error ?? "Upload failed.");
      }

      if (imageSrcRef.current) {
        imageSrcRef.current.value = result.url;
      }

      toast.success("Image uploaded.");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
      toast.error("Image upload failed.");
    } finally {
      setUploadPending(false);
    }
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
      toast.error(error instanceof Error ? error.message : "Unable to delete hero.");
    } finally {
      setDeletePending(false);
    }
  };

  return (
    <div className="space-y-6">
      <form action={formAction} className="grid gap-4" noValidate onSubmit={handleSubmit}>
        <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Title
          <input
            className={cn(
              "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
              errors.title ? "border-destructive" : null,
            )}
            defaultValue={initialValues.title}
            name="title"
            required
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "hero-title-error" : undefined}
            type="text"
          />
          {errors.title ? (
            <span className="text-xs font-normal normal-case tracking-normal text-destructive" id="hero-title-error">
              {errors.title}
            </span>
          ) : null}
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Subtitle
          <input
            className={cn(
              "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
              errors.subtitle ? "border-destructive" : null,
            )}
            defaultValue={initialValues.subtitle}
            name="subtitle"
            required
            aria-invalid={errors.subtitle ? true : undefined}
            aria-describedby={errors.subtitle ? "hero-subtitle-error" : undefined}
            type="text"
          />
          {errors.subtitle ? (
            <span
              className="text-xs font-normal normal-case tracking-normal text-destructive"
              id="hero-subtitle-error"
            >
              {errors.subtitle}
            </span>
          ) : null}
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Description
          <textarea
            className={cn(
              "min-h-[120px] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
              errors.description ? "border-destructive" : null,
            )}
            defaultValue={initialValues.description}
            name="description"
            required
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? "hero-description-error" : undefined}
          />
          {errors.description ? (
            <span
              className="text-xs font-normal normal-case tracking-normal text-destructive"
              id="hero-description-error"
            >
              {errors.description}
            </span>
          ) : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Location
            <input
              className={cn(
                "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                errors.location ? "border-destructive" : null,
              )}
              defaultValue={initialValues.location}
              name="location"
              required
              aria-invalid={errors.location ? true : undefined}
              aria-describedby={errors.location ? "hero-location-error" : undefined}
              type="text"
            />
            {errors.location ? (
              <span
                className="text-xs font-normal normal-case tracking-normal text-destructive"
                id="hero-location-error"
              >
                {errors.location}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Availability
            <input
              className={cn(
                "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                errors.availability ? "border-destructive" : null,
              )}
              defaultValue={initialValues.availability}
              name="availability"
              required
              aria-invalid={errors.availability ? true : undefined}
              aria-describedby={errors.availability ? "hero-availability-error" : undefined}
              type="text"
            />
            {errors.availability ? (
              <span
                className="text-xs font-normal normal-case tracking-normal text-destructive"
                id="hero-availability-error"
              >
                {errors.availability}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Image URL
            <input
              className={cn(
                "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                errors.imageSrc ? "border-destructive" : null,
              )}
              defaultValue={initialValues.imageSrc}
              name="imageSrc"
              required
              aria-invalid={errors.imageSrc ? true : undefined}
              aria-describedby={errors.imageSrc ? "hero-image-src-error" : undefined}
              type="text"
              ref={imageSrcRef}
            />
            {errors.imageSrc ? (
              <span
                className="text-xs font-normal normal-case tracking-normal text-destructive"
                id="hero-image-src-error"
              >
                {errors.imageSrc}
              </span>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-normal normal-case tracking-normal text-muted-foreground">
              <label className="inline-flex items-center gap-2" htmlFor={uploadInputId}>
                <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-foreground">
                  Choose file
                </span>
                <input
                  accept="image/*"
                  className="sr-only"
                  id={uploadInputId}
                  onChange={(event): void => {
                    const file = event.currentTarget.files?.[0] ?? null;
                    setSelectedFile(file);
                  }}
                  type="file"
                />
              </label>
              <span>{selectedFile ? selectedFile.name : "No file selected"}</span>
              <Button
                className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                type="button"
                variant="outline"
                onClick={handleImageUpload}
                disabled={uploadPending || !selectedFile}
              >
                {uploadPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
            {uploadError ? (
              <p className="text-xs font-normal normal-case tracking-normal text-destructive">
                {uploadError}
              </p>
            ) : null}
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Image alt text
            <input
              className={cn(
                "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                errors.imageAlt ? "border-destructive" : null,
              )}
              defaultValue={initialValues.imageAlt}
              name="imageAlt"
              required
              aria-invalid={errors.imageAlt ? true : undefined}
              aria-describedby={errors.imageAlt ? "hero-image-alt-error" : undefined}
              type="text"
            />
            {errors.imageAlt ? (
              <span
                className="text-xs font-normal normal-case tracking-normal text-destructive"
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
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Metrics</p>
              <p className="text-sm text-muted-foreground">
                Update the quick stats shown beneath the hero headline.
              </p>
            </div>
            <Button
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              type="button"
              variant="outline"
              onClick={handleAddMetric}
            >
              Add metric
            </Button>
          </div>

          <div className="space-y-3">
            {metrics.map((metric, index) => {
              const metricInvalid =
                Boolean(errors.metrics) &&
                (metric.label.trim().length === 0 || metric.value.trim().length === 0);

              return (
                <div className="grid gap-3 sm:grid-cols-[1.2fr_1fr_auto]" key={metric.id}>
                  <input
                    className={cn(
                      "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                      metricInvalid ? "border-destructive" : null,
                    )}
                    placeholder="Label"
                    value={metric.label}
                    onChange={(event): void => updateMetric(index, "label", event.target.value)}
                    type="text"
                  />
                  <input
                    className={cn(
                      "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                      metricInvalid ? "border-destructive" : null,
                    )}
                    placeholder="Value"
                    value={metric.value}
                    onChange={(event): void => updateMetric(index, "value", event.target.value)}
                    type="text"
                  />
                  <Button
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                    type="button"
                    variant="outline"
                    onClick={(): void => handleRemoveMetric(index)}
                    disabled={metrics.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>

          {errors.metrics ? (
            <p className="text-xs font-normal normal-case tracking-normal text-destructive">
              {errors.metrics}
            </p>
          ) : null}
        </div>

        <input name="metrics" type="hidden" value={metricsJson} />

        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background"
            type="submit"
          >
            Save hero
          </Button>
        </div>
      </form>

      <div className="rounded-3xl border border-border/70 bg-card p-5">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Danger zone</p>
          <p className="text-sm text-muted-foreground">
            Removing the hero entry will fall back to the default placeholder content.
          </p>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="rounded-full border border-destructive/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-destructive"
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
                  This will remove the stored hero data and restore the fallback copy.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    className="rounded-full bg-destructive px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-destructive-foreground"
                    type="button"
                    onClick={handleDelete}
                    disabled={deletePending}
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
