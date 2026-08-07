"use client";

import { IconArrowUpRight, IconLoader2 } from "@tabler/icons-react";
import type { ReactElement } from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/actions/contact/submit-contact.action";
import { cn } from "@/lib/utils";
import type { ContactMessageInput } from "@/types/contact-message-input.interface";

interface ContactFormStatus {
	message: string;
	state: "idle" | "success" | "error";
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
					message: "Message sent successfully. I will get back to you soon!",
				});
				reset();
				return;
			}
			setStatus({
				state: "error",
				message: result.error ?? "Unable to send message. Please try again.",
			});
		});
	};

	return (
		<form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<label
					className="font-mono text-xs font-semibold text-neutral-400 tracking-widest uppercase"
					htmlFor="contact-name"
				>
					YOUR NAME *
				</label>
				<input
					aria-invalid={Boolean(errors.name)}
					className="h-12 w-full rounded-none border border-neutral-200 bg-neutral-50 px-4 font-normal text-neutral-900 text-sm outline-none transition focus:border-black focus:bg-white"
					id="contact-name"
					placeholder="e.g. John Doe"
					{...register("name", { required: "Name is required." })}
					type="text"
				/>
				{errors.name ? (
					<p className="font-mono text-xs text-red-600">{errors.name.message}</p>
				) : null}
			</div>

			<div className="grid gap-2">
				<label
					className="font-mono text-xs font-semibold text-neutral-400 tracking-widest uppercase"
					htmlFor="contact-email"
				>
					YOUR EMAIL *
				</label>
				<input
					aria-invalid={Boolean(errors.email)}
					className="h-12 w-full rounded-none border border-neutral-200 bg-neutral-50 px-4 font-normal text-neutral-900 text-sm outline-none transition focus:border-black focus:bg-white"
					id="contact-email"
					placeholder="e.g. john@example.com"
					{...register("email", {
						required: "Email is required.",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Enter a valid email address.",
						},
					})}
					type="email"
				/>
				{errors.email ? (
					<p className="font-mono text-xs text-red-600">{errors.email.message}</p>
				) : null}
			</div>

			<div className="grid gap-2">
				<label
					className="font-mono text-xs font-semibold text-neutral-400 tracking-widest uppercase"
					htmlFor="contact-message"
				>
					PROJECT DETAILS *
				</label>
				<textarea
					aria-invalid={Boolean(errors.message)}
					className="min-h-35 w-full rounded-none border border-neutral-200 bg-neutral-50 px-4 py-3 font-normal text-neutral-900 text-sm outline-none transition focus:border-black focus:bg-white"
					id="contact-message"
					placeholder="Tell me about your project goals, timelines, or key requirements..."
					{...register("message", {
						required: "Please provide a brief message.",
					})}
				/>
				{errors.message ? (
					<p className="font-mono text-xs text-red-600">{errors.message.message}</p>
				) : null}
			</div>

			<div className="pt-2">
				<button
					className="group inline-flex cursor-pointer items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
					disabled={isPending}
					type="submit"
				>
					<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
						<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
							{isPending ? "Sending Message..." : "Send Message"}
						</span>
						<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
							{isPending ? "Sending Message..." : "Send Message"}
						</span>
					</span>
					<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
						{isPending ? (
							<IconLoader2 className="animate-spin" size={16} />
						) : (
							<>
								<span className="inline-flex transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5">
									<IconArrowUpRight size={16} />
								</span>
								<span className="absolute inline-flex -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
									<IconArrowUpRight size={16} />
								</span>
							</>
						)}
					</span>
				</button>
			</div>

			{status.state === "idle" ? null : (
				<p
					className={cn(
						"font-mono text-xs tracking-wider uppercase pt-2",
						status.state === "success" ? "text-emerald-600" : "text-red-600"
					)}
				>
					{status.message}
				</p>
			)}
		</form>
	);
};
