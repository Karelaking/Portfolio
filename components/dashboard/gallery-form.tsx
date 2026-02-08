"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { createGalleryImage } from "@/app/dashboard/gallery/actions";
import type { ActionResult } from "@/types/portfolio";

export interface GalleryFormValues {
  src: string;
  alt: string;
}

type GalleryFormAction = typeof createGalleryImage;

export interface GalleryFormProps {
  action: GalleryFormAction;
  submitLabel: string;
  defaultValues?: Partial<GalleryFormValues>;
  redirectTo?: string;
}

interface GalleryFormErrors {
  src?: string;
  alt?: string;
}

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps): ReactElement => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background"
      type="submit"
      disabled={pending}
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
    null,
  );
  const [errors, setErrors] = useState<GalleryFormErrors>({});
  const [uploadPending, setUploadPending] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const targetUrl = redirectTo ?? "/dashboard/gallery";
  const uploadInputId = useId();
  const imageSrcRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <form action={formAction} className="grid gap-4" noValidate onSubmit={handleSubmit}>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Image URL
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.src ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.src ?? ""}
          name="src"
          required
          aria-invalid={errors.src ? true : undefined}
          aria-describedby={errors.src ? "gallery-src-error" : undefined}
          type="text"
          ref={imageSrcRef}
        />
        {errors.src ? (
          <span className="text-xs font-normal normal-case tracking-normal text-destructive" id="gallery-src-error">
            {errors.src}
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
        Alt text
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.alt ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.alt ?? ""}
          name="alt"
          required
          aria-invalid={errors.alt ? true : undefined}
          aria-describedby={errors.alt ? "gallery-alt-error" : undefined}
          type="text"
        />
        {errors.alt ? (
          <span className="text-xs font-normal normal-case tracking-normal text-destructive" id="gallery-alt-error">
            {errors.alt}
          </span>
        ) : null}
      </label>

      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <SubmitButton label={submitLabel} />
    </form>
  );
};
