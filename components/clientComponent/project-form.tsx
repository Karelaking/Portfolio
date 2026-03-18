"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { createProject } from "@/actions/dashboard/projects/create-project.action";
import type { ActionResult } from "@/types/action-result.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ImageKitUpload } from "./imagekit-upload";
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
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button
          className="bg-foreground text-background inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-semibold tracking-[0.3em] uppercase transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
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
            This will {label.toLowerCase()} the project changes. You can update
            it again later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-foreground text-background inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-semibold tracking-[0.3em] uppercase transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
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
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Name
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
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
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="project-name-error"
          >
            {errors.name}
          </span>
        ) : null}
      </label>
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Description
        <textarea
          className={cn(
            "border-border bg-background text-foreground min-h-30 rounded-2xl border px-4 py-3 text-sm",
            errors.description ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.description ?? ""}
          name="description"
          required
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={
            errors.description ? "project-description-error" : undefined
          }
        />
        {errors.description ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="project-description-error"
          >
            {errors.description}
          </span>
        ) : null}
      </label>
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Tags (comma separated)
        <input
          className="border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm"
          defaultValue={defaultValues?.tags ?? ""}
          name="tags"
          placeholder="Design System, Next.js"
          type="text"
        />
      </label>
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Image URL
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.imageSrc ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.imageSrc ?? ""}
          name="imageSrc"
          required
          aria-invalid={errors.imageSrc ? true : undefined}
          aria-describedby={
            errors.imageSrc ? "project-image-src-error" : undefined
          }
          type="text"
          ref={imageSrcRef}
        />
        {errors.imageSrc ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="project-image-src-error"
          >
            {errors.imageSrc}
          </span>
        ) : null}
        <div className="mt-2">
          <ImageKitUpload
            folder="projects"
            existingImageUrl={defaultValues?.imageSrc ?? undefined}
            existingImageAlt={defaultValues?.imageAlt ?? undefined}
            onUploadSuccess={(url) => {
              if (imageSrcRef.current) {
                imageSrcRef.current.value = url;
              }
              setUploadError(null);
              toast.success("Image uploaded.");
            }}
            onUploadError={(error) => {
              setUploadError(error);
              toast.error("Image upload failed.");
            }}
          />
        </div>
        {uploadError ? (
          <p className="text-destructive text-xs font-normal tracking-normal normal-case">
            {uploadError}
          </p>
        ) : null}
      </label>
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Image alt text
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.imageAlt ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.imageAlt ?? ""}
          name="imageAlt"
          required
          aria-invalid={errors.imageAlt ? true : undefined}
          aria-describedby={
            errors.imageAlt ? "project-image-alt-error" : undefined
          }
          type="text"
        />
        {errors.imageAlt ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="project-image-alt-error"
          >
            {errors.imageAlt}
          </span>
        ) : null}
      </label>
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Project URL
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
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
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
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
        label={submitLabel}
        formId={formId}
        onValidate={handleValidateBeforeConfirm}
      />
    </form>
  );
};
