"use client";

import type { ReactElement } from "react";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import type { createProject } from "@/app/dashboard/projects/actions";
import type { ActionResult } from "@/lib/portfolio/types";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";

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
}

interface SubmitButtonProps {
  label: string;
  onConfirm: () => void;
}

const SubmitButton = ({ label, onConfirm }: SubmitButtonProps): ReactElement => {
  const { pending } = useFormStatus();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          type="button"
          disabled={pending}
        >
          {pending ? "Saving..." : label}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm {label.toLowerCase()}</AlertDialogTitle>
          <AlertDialogDescription>
            This will {label.toLowerCase()} the project changes. You can update it again later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? "Saving..." : label}
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
}: ProjectFormProps): ReactElement => {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

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
      return;
    }

    toast.error(state.error ?? "Unable to save project.");
  }, [state, submitLabel]);

  const handleConfirmSubmit = (): void => {
    formRef.current?.requestSubmit();
  };

  return (
    <form action={formAction} className="grid gap-4" ref={formRef}>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Name
        <input
          className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          defaultValue={defaultValues?.name ?? ""}
          name="name"
          required
          type="text"
        />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Description
        <textarea
          className="min-h-[120px] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          defaultValue={defaultValues?.description ?? ""}
          name="description"
          required
        />
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
          className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          defaultValue={defaultValues?.imageSrc ?? ""}
          name="imageSrc"
          required
          type="url"
        />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Image alt text
        <input
          className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          defaultValue={defaultValues?.imageAlt ?? ""}
          name="imageAlt"
          required
          type="text"
        />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Project URL
        <input
          className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          defaultValue={defaultValues?.href ?? ""}
          name="href"
          required
          type="url"
        />
      </label>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <SubmitButton label={submitLabel} onConfirm={handleConfirmSubmit} />
    </form>
  );
};
