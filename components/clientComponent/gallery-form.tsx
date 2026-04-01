"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ImageKitUpload } from "./imagekit-upload";
import type { createGalleryImage } from "@/actions/dashboard/gallery/create-gallery-image.action";
import type { ActionResult } from "@/types/action-result.interface";

export interface GalleryFormValues {
  src: string;
  alt: string;
  imageFileId?: string;
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
      className="bg-foreground text-background rounded-full px-5 py-3 text-xs font-semibold tracking-[0.3em] uppercase"
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
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Image URL
        <input
          defaultValue={defaultValues?.imageFileId ?? ""}
          name="imageFileId"
          ref={imageFileIdRef}
          type="hidden"
        />
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
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
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="gallery-src-error"
          >
            {errors.src}
          </span>
        ) : null}
        <div className="mt-2">
          <ImageKitUpload
            folder="gallery"
            existingImageUrl={defaultValues?.src ?? undefined}
            existingImageAlt={defaultValues?.alt ?? undefined}
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
        Alt text
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
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
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
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
