"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { createProject } from "@/actions/dashboard/projects/create-project.action";
import type { ActionResult } from "@/types/action-result.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
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

export interface ProjectFormValues {
  name: string;
  description: string;
  tags: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

type ProjectFormAction = typeof createProject;

export interface ProjectFormProps {
  action: ProjectFormAction;
  submitLabel: string;
  defaultValues?: Partial<ProjectFormValues>;
  redirectTo?: string;
}

interface SubmitButtonProps {
  label: string;
  formId: string;
  onValidate?: () => boolean;
}

type ProjectFormErrors = Partial<Record<keyof ProjectFormValues, string>>;

const SubmitButton = ({ label, formId, onValidate }: SubmitButtonProps): ReactElement => {
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
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          type="button"
          disabled={pending}
          ref={triggerRef}
          onPointerDown={handleTriggerPointerDown}
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
        >
          {pending ? "Saving..." : label}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onOpenAutoFocus={(event): void => {
          event.preventDefault();
          confirmRef.current?.focus();
        }}
        onCloseAutoFocus={(event): void => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm {label.toLowerCase()}</AlertDialogTitle>
          <AlertDialogDescription>
            This will {label.toLowerCase()} the project changes. You can update it again later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={pending}
              form={formId}
              onClick={(): void => {
                if (onValidate && !onValidate()) {
                  return;
                }
                setOpen(false);
              }}
              type="submit"
              variant="outline"
              ref={confirmRef}
              autoFocus
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
    null,
  );
  const [errors, setErrors] = useState<ProjectFormErrors>({});
  const [uploadPending, setUploadPending] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formId = useId();
  const uploadInputId = useId();
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
    if (!href) {
      nextErrors.href = "Project URL is required.";
    } else {
      try {
        new URL(href);
      } catch {
        nextErrors.href = "Enter a valid project URL.";
      }
    }

    return nextErrors;
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
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Name
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.name ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.name ?? ""}
          name="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "project-name-error" : undefined}
          type="text"
        />
        {errors.name ? (
          <span className="text-xs font-normal normal-case tracking-normal text-destructive" id="project-name-error">
            {errors.name}
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
          defaultValue={defaultValues?.description ?? ""}
          name="description"
          required
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "project-description-error" : undefined}
        />
        {errors.description ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="project-description-error"
          >
            {errors.description}
          </span>
        ) : null}
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Tags (comma separated)
        <input
          className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          defaultValue={defaultValues?.tags ?? ""}
          name="tags"
          placeholder="Design System, Next.js"
          type="text"
        />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Image URL
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.imageSrc ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.imageSrc ?? ""}
          name="imageSrc"
          required
          aria-invalid={errors.imageSrc ? true : undefined}
          aria-describedby={errors.imageSrc ? "project-image-src-error" : undefined}
          type="text"
          ref={imageSrcRef}
        />
        {errors.imageSrc ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="project-image-src-error"
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
          defaultValue={defaultValues?.imageAlt ?? ""}
          name="imageAlt"
          required
          aria-invalid={errors.imageAlt ? true : undefined}
          aria-describedby={errors.imageAlt ? "project-image-alt-error" : undefined}
          type="text"
        />
        {errors.imageAlt ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="project-image-alt-error"
          >
            {errors.imageAlt}
          </span>
        ) : null}
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Project URL
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.href ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.href ?? ""}
          name="href"
          required
          aria-invalid={errors.href ? true : undefined}
          aria-describedby={errors.href ? "project-href-error" : undefined}
          type="url"
        />
        {errors.href ? (
          <span className="text-xs font-normal normal-case tracking-normal text-destructive" id="project-href-error">
            {errors.href}
          </span>
        ) : null}
      </label>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <SubmitButton label={submitLabel} formId={formId} onValidate={handleValidateBeforeConfirm} />
    </form>
  );
};
