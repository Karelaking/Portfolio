"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { createExpertise } from "@/actions/dashboard/expertise/create-expertise.action";
import type { ActionResult } from "@/types/action-result.interface";

export interface ExpertiseFormValues {
  title: string;
  description: string;
  icon: "strategy" | "system" | "frontend" | "direction";
}

type ExpertiseFormAction = typeof createExpertise;

export interface ExpertiseFormProps {
  action: ExpertiseFormAction;
  submitLabel: string;
  defaultValues?: Partial<ExpertiseFormValues>;
  redirectTo?: string;
}

interface ExpertiseFormErrors {
  title?: string;
  description?: string;
  icon?: string;
}

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps): ReactElement => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="bg-foreground text-background rounded-full px-5 py-3 text-xs font-semibold tracking-[0.3em] uppercase"
      disabled={pending}
      type="submit"
    >
      {pending ? "Saving..." : label}
    </Button>
  );
};

const iconOptions: ExpertiseFormValues["icon"][] = [
  "strategy",
  "system",
  "frontend",
  "direction",
];

export const ExpertiseForm = ({
  action,
  submitLabel,
  defaultValues,
  redirectTo,
}: ExpertiseFormProps): ReactElement => {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );
  const [errors, setErrors] = useState<ExpertiseFormErrors>({});
  const router = useRouter();
  const targetUrl = redirectTo ?? "/dashboard/expertise";

  useEffect((): void => {
    if (!state) {
      return;
    }

    if (state.ok) {
      toast.success("Expertise saved.");
      router.push(targetUrl);
      return;
    }

    toast.error(state.error ?? "Unable to save expertise.");
  }, [router, state, targetUrl]);

  const validateFormData = (formData: FormData): ExpertiseFormErrors => {
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const icon = String(formData.get("icon") ?? "").trim();

    const nextErrors: ExpertiseFormErrors = {};

    if (!title) {
      nextErrors.title = "Title is required.";
    }
    if (!description) {
      nextErrors.description = "Description is required.";
    }
    if (!iconOptions.includes(icon as ExpertiseFormValues["icon"])) {
      nextErrors.icon = "Select a valid icon.";
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
        Title
        <input
          aria-describedby={errors.title ? "expertise-title-error" : undefined}
          aria-invalid={errors.title ? true : undefined}
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
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="expertise-title-error"
          >
            {errors.title}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Description
        <textarea
          aria-describedby={
            errors.description ? "expertise-description-error" : undefined
          }
          aria-invalid={errors.description ? true : undefined}
          className={cn(
            "border-border bg-background text-foreground min-h-35 rounded-2xl border px-4 py-3 text-sm",
            errors.description ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.description ?? ""}
          name="description"
          required
        />
        {errors.description ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="expertise-description-error"
          >
            {errors.description}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Icon
        <select
          aria-describedby={errors.icon ? "expertise-icon-error" : undefined}
          aria-invalid={errors.icon ? true : undefined}
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.icon ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.icon ?? "strategy"}
          name="icon"
          required
        >
          <option value="strategy">Strategy</option>
          <option value="system">System</option>
          <option value="frontend">Frontend</option>
          <option value="direction">Direction</option>
        </select>
        {errors.icon ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="expertise-icon-error"
          >
            {errors.icon}
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
