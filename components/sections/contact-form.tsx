"use client";

import type { ReactElement } from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/actions/contact";
import type { ContactMessageInput } from "@/types/portfolio";

interface ContactFormStatus {
  state: "idle" | "success" | "error";
  message: string;
}

const initialStatus: ContactFormStatus = {
  state: "idle",
  message: "",
};

export const ContactForm = (): ReactElement => {
  const [status, setStatus] = useState<ContactFormStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageInput>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: ContactMessageInput): void => {
    setStatus(initialStatus);
    startTransition(async (): Promise<void> => {
      const result = await submitContact(values);
      if (result.ok) {
        setStatus({
          state: "success",
          message: "Message sent. I will reply soon.",
        });
        reset();
        return;
      }
      setStatus({
        state: "error",
        message: result.error ?? "Unable to send message.",
      });
    });
  };

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          htmlFor="contact-name"
        >
          Name
        </label>
        <input
          aria-invalid={Boolean(errors.name)}
          className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm"
          id="contact-name"
          {...register("name", { required: "Name is required." })}
          type="text"
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          htmlFor="contact-email"
        >
          Email
        </label>
        <input
          aria-invalid={Boolean(errors.email)}
          className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm"
          id="contact-email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email.",
            },
          })}
          type="email"
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          htmlFor="contact-message"
        >
          Project details
        </label>
        <textarea
          aria-invalid={Boolean(errors.message)}
          className="min-h-[140px] rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm"
          id="contact-message"
          {...register("message", {
            required: "Tell me a bit about your project.",
          })}
        />
        {errors.message ? (
          <p className="text-xs text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>
      <button
        className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>
      {status.state !== "idle" ? (
        <p
          className={
            status.state === "success"
              ? "text-xs text-foreground"
              : "text-xs text-destructive"
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
};
