"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { createExperience } from "@/actions/dashboard/experience/create-experience.action";
import type { ActionResult } from "@/types/action-result.interface";

export interface ExperienceFormValues {
  role: string;
  company: string;
  period: string;
  summary: string;
  coreTech: string;
  highlights: string;
}

type ExperienceFormAction = typeof createExperience;

export interface ExperienceFormProps {
  action: ExperienceFormAction;
  submitLabel: string;
  defaultValues?: Partial<ExperienceFormValues>;
  redirectTo?: string;
}

interface ExperienceFormErrors {
  role?: string;
  company?: string;
  period?: string;
  summary?: string;
  highlights?: string;
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

const parseHighlights = (value: string): string[] => {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export const ExperienceForm = ({
  action,
  submitLabel,
  defaultValues,
  redirectTo,
}: ExperienceFormProps): ReactElement => {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
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
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Role
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.role ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.role ?? ""}
          name="role"
          required
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={errors.role ? "experience-role-error" : undefined}
          type="text"
        />
        {errors.role ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="experience-role-error"
          >
            {errors.role}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Company
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.company ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.company ?? ""}
          name="company"
          required
          aria-invalid={errors.company ? true : undefined}
          aria-describedby={
            errors.company ? "experience-company-error" : undefined
          }
          type="text"
        />
        {errors.company ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="experience-company-error"
          >
            {errors.company}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Period
        <input
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.period ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.period ?? ""}
          name="period"
          required
          aria-invalid={errors.period ? true : undefined}
          aria-describedby={
            errors.period ? "experience-period-error" : undefined
          }
          type="text"
        />
        {errors.period ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="experience-period-error"
          >
            {errors.period}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Summary
        <textarea
          className={cn(
            "border-border bg-background text-foreground min-h-30 rounded-2xl border px-4 py-3 text-sm",
            errors.summary ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.summary ?? ""}
          name="summary"
          required
          aria-invalid={errors.summary ? true : undefined}
          aria-describedby={
            errors.summary ? "experience-summary-error" : undefined
          }
        />
        {errors.summary ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="experience-summary-error"
          >
            {errors.summary}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Core tech (one per line)
        <textarea
          className="border-border bg-background text-foreground min-h-27.5 rounded-2xl border px-4 py-3 text-sm"
          defaultValue={defaultValues?.coreTech ?? ""}
          name="coreTech"
          placeholder="React\nNext.js\nTypeScript"
        />
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Highlights (one per line)
        <textarea
          className={cn(
            "border-border bg-background text-foreground min-h-35 rounded-2xl border px-4 py-3 text-sm",
            errors.highlights ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.highlights ?? ""}
          name="highlights"
          required
          aria-invalid={errors.highlights ? true : undefined}
          aria-describedby={
            errors.highlights ? "experience-highlights-error" : undefined
          }
        />
        {errors.highlights ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
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
