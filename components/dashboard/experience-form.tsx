"use client";

import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { createExperience } from "@/app/dashboard/experience/actions";
import type { ActionResult } from "@/types/portfolio";

export interface ExperienceFormValues {
  role: string;
  company: string;
  period: string;
  summary: string;
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
      className="rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background"
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
    <form action={formAction} className="grid gap-4" noValidate onSubmit={handleSubmit}>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Role
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
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
          <span className="text-xs font-normal normal-case tracking-normal text-destructive" id="experience-role-error">
            {errors.role}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Company
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.company ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.company ?? ""}
          name="company"
          required
          aria-invalid={errors.company ? true : undefined}
          aria-describedby={errors.company ? "experience-company-error" : undefined}
          type="text"
        />
        {errors.company ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="experience-company-error"
          >
            {errors.company}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Period
        <input
          className={cn(
            "rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.period ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.period ?? ""}
          name="period"
          required
          aria-invalid={errors.period ? true : undefined}
          aria-describedby={errors.period ? "experience-period-error" : undefined}
          type="text"
        />
        {errors.period ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="experience-period-error"
          >
            {errors.period}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Summary
        <textarea
          className={cn(
            "min-h-[120px] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.summary ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.summary ?? ""}
          name="summary"
          required
          aria-invalid={errors.summary ? true : undefined}
          aria-describedby={errors.summary ? "experience-summary-error" : undefined}
        />
        {errors.summary ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="experience-summary-error"
          >
            {errors.summary}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Highlights (one per line)
        <textarea
          className={cn(
            "min-h-[140px] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground",
            errors.highlights ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.highlights ?? ""}
          name="highlights"
          required
          aria-invalid={errors.highlights ? true : undefined}
          aria-describedby={errors.highlights ? "experience-highlights-error" : undefined}
        />
        {errors.highlights ? (
          <span
            className="text-xs font-normal normal-case tracking-normal text-destructive"
            id="experience-highlights-error"
          >
            {errors.highlights}
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
