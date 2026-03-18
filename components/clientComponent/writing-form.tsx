"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ImageKitUpload } from "./imagekit-upload";
import { NovelTextEditor } from "./novel-text-editor";
import type { ActionResult } from "@/types/action-result.interface";

export interface WritingFormValues {
  title: string;
  coverImageSrc: string;
  coverImageAlt: string;
  content: string;
  tags: string;
  publishedAt: string;
}

export interface WritingFormProps {
  action: (
    prevState: ActionResult | null,
    formData: FormData,
  ) => Promise<ActionResult>;
  submitLabel: string;
  defaultValues?: Partial<WritingFormValues>;
  redirectTo?: string;
}

interface WritingFormErrors {
  title?: string;
  coverImageSrc?: string;
  coverImageAlt?: string;
  content?: string;
  tags?: string;
  publishedAt?: string;
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

const stripHtml = (value: string): string => {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

export const WritingForm = ({
  action,
  submitLabel,
  defaultValues,
  redirectTo,
}: WritingFormProps): ReactElement => {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );
  const [errors, setErrors] = useState<WritingFormErrors>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [contentHtml, setContentHtml] = useState<string>(
    defaultValues?.content ?? "",
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

    if (!coverImageSrc || !isValidUrlOrPath(coverImageSrc)) {
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

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Title
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.title ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.title ?? ""}
          name="title"
          required
          type="text"
        />
        {errors.title ? (
          <span className="text-destructive text-xs font-normal tracking-normal normal-case">
            {errors.title}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Cover image URL
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.coverImageSrc ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.coverImageSrc ?? ""}
          name="coverImageSrc"
          required
          type="text"
          ref={coverImageRef}
        />
        {errors.coverImageSrc ? (
          <span className="text-destructive text-xs font-normal tracking-normal normal-case">
            {errors.coverImageSrc}
          </span>
        ) : null}
        <div className="mt-2">
          <ImageKitUpload
            folder="writing"
            existingImageUrl={defaultValues?.coverImageSrc ?? undefined}
            existingImageAlt={defaultValues?.coverImageAlt ?? undefined}
            onUploadSuccess={(url) => {
              if (coverImageRef.current) {
                coverImageRef.current.value = url;
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
        Cover image alt text
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.coverImageAlt ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.coverImageAlt ?? ""}
          name="coverImageAlt"
          required
          type="text"
        />
        {errors.coverImageAlt ? (
          <span className="text-destructive text-xs font-normal tracking-normal normal-case">
            {errors.coverImageAlt}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Content
        <NovelTextEditor
          initialValue={defaultValues?.content ?? ""}
          onChange={(html) => {
            setContentHtml(html);
          }}
          placeholder="Write your shayari, poem, or story here..."
        />
        {errors.content ? (
          <span className="text-destructive text-xs font-normal tracking-normal normal-case">
            {errors.content}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Tags (comma separated)
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.tags ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.tags ?? ""}
          name="tags"
          placeholder="shayari, hindi, late-night"
          required
          type="text"
        />
        {errors.tags ? (
          <span className="text-destructive text-xs font-normal tracking-normal normal-case">
            {errors.tags}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Published at
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.publishedAt ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.publishedAt ?? ""}
          name="publishedAt"
          placeholder="Mar 2026"
          required
          type="text"
        />
        {errors.publishedAt ? (
          <span className="text-destructive text-xs font-normal tracking-normal normal-case">
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
