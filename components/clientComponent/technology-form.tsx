"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useActionState, useEffect, useState } from "react";
import type { ProjectItem } from "@/types/project-item.interface";
import type { ActionResult } from "@/types/action-result.interface";
import type { createTechnology } from "@/actions/dashboard/technologies/create-technology.action";

export interface TechnologyFormValues {
  name: string;
  description: string;
  websiteUrl: string;
  logoKey: string;
  projectIds: string[];
}

export interface TechnologyFormProps {
  action: TechnologyFormAction;
  projects: ProjectItem[];
  submitLabel: string;
  defaultValues?: Partial<TechnologyFormValues>;
  redirectTo?: string;
}

type TechnologyFormAction = typeof createTechnology;

type TechnologyFormErrors = Partial<
  Record<"name" | "description" | "websiteUrl" | "logoKey", string>
>;

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

export const TechnologyForm = ({
  action,
  projects,
  submitLabel,
  defaultValues,
  redirectTo,
}: TechnologyFormProps): ReactElement => {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );
  const [errors, setErrors] = useState<TechnologyFormErrors>({});
  const router = useRouter();
  const targetUrl = redirectTo ?? "/dashboard/technologies";

  useEffect((): void => {
    if (!state) {
      return;
    }

    if (state.ok) {
      toast.success("Technology saved.");
      router.push(targetUrl);
      return;
    }

    toast.error(state.error ?? "Unable to save technology.");
  }, [router, state, targetUrl]);

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const validateFormData = (formData: FormData): TechnologyFormErrors => {
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const websiteUrl = String(formData.get("websiteUrl") ?? "").trim();
    const logoKey = String(formData.get("logoKey") ?? "").trim();

    const nextErrors: TechnologyFormErrors = {};

    if (!name) {
      nextErrors.name = "Technology name is required.";
    }

    if (!description) {
      nextErrors.description = "Description is required.";
    }

    if (!websiteUrl) {
      nextErrors.websiteUrl = "Website URL is required.";
    } else if (!validateUrl(websiteUrl)) {
      nextErrors.websiteUrl = "Enter a valid website URL.";
    }

    if (!logoKey) {
      nextErrors.logoKey = "Logo key is required.";
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

  const selectedProjectIds = new Set(defaultValues?.projectIds ?? []);

  return (
    <form
      action={formAction}
      className="grid gap-4"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Technology name
        <input
          aria-describedby={errors.name ? "technology-name-error" : undefined}
          aria-invalid={errors.name ? true : undefined}
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.name ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.name ?? ""}
          name="name"
          required
          type="text"
        />
        {errors.name ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="technology-name-error"
          >
            {errors.name}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Description
        <textarea
          aria-describedby={
            errors.description ? "technology-description-error" : undefined
          }
          aria-invalid={errors.description ? true : undefined}
          className={cn(
            "border-border bg-background text-foreground min-h-30 rounded-2xl border px-4 py-3 text-sm",
            errors.description ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.description ?? ""}
          name="description"
          required
        />
        {errors.description ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="technology-description-error"
          >
            {errors.description}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Website URL
        <input
          aria-describedby={
            errors.websiteUrl ? "technology-website-error" : undefined
          }
          aria-invalid={errors.websiteUrl ? true : undefined}
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.websiteUrl ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.websiteUrl ?? ""}
          name="websiteUrl"
          placeholder="https://example.dev"
          required
          type="url"
        />
        {errors.websiteUrl ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="technology-website-error"
          >
            {errors.websiteUrl}
          </span>
        ) : null}
      </label>

      <label className="text-muted-foreground grid gap-2 text-xs tracking-[0.3em] uppercase">
        Logo key
        <input
          aria-describedby={
            errors.logoKey ? "technology-logo-key-error" : undefined
          }
          aria-invalid={errors.logoKey ? true : undefined}
          className={cn(
            "border-border bg-background text-foreground rounded-2xl border px-4 py-3 text-sm",
            errors.logoKey ? "border-destructive" : null,
          )}
          defaultValue={defaultValues?.logoKey ?? ""}
          name="logoKey"
          placeholder="react, nestjs, tailwindcss"
          required
          type="text"
        />
        {errors.logoKey ? (
          <span
            className="text-destructive text-xs font-normal tracking-normal normal-case"
            id="technology-logo-key-error"
          >
            {errors.logoKey}
          </span>
        ) : null}
      </label>

      <fieldset className="border-border rounded-2xl border p-4">
        <legend className="text-muted-foreground px-2 text-xs tracking-[0.3em] uppercase">
          Connected projects
        </legend>

        {projects.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No projects available yet.
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {projects.map((project) => (
              <label
                className="border-border bg-background flex items-start gap-2 rounded-xl border px-3 py-2 text-sm"
                key={project.id}
              >
                <input
                  className="mt-1"
                  defaultChecked={selectedProjectIds.has(project.id)}
                  name="projectIds"
                  type="checkbox"
                  value={project.id}
                />
                <span>
                  <span className="text-foreground block font-medium">
                    {project.name}
                  </span>
                  <span className="text-muted-foreground block text-xs">
                    {project.href}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {state?.error ? (
        <p className="text-destructive text-sm">{state.error}</p>
      ) : null}

      <SubmitButton label={submitLabel} />
    </form>
  );
};
