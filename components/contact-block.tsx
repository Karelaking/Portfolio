"use client";

import { RiMailSendLine, RiMapPin2Line, RiPhoneLine } from "@remixicon/react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

const TOPICS = ["General inquiry", "Sales", "Support", "Partnership", "Other"];

const OFFICES = [
	{
		city: "San Francisco",
		address: "548 Market St, Suite 200, CA 94104",
		phone: "+1 (415) 555-0188",
	},
	{
		city: "Berlin",
		address: "Torstraße 35, 10119 Berlin, Germany",
		phone: "+49 30 555 0142",
	},
	{
		city: "Singapore",
		address: "12 Marina Blvd, #18-01, 018982",
		phone: "+65 6555 0117",
	},
];

export default function ContactBlock() {
	return (
		<section className="flex min-h-svh w-full items-center justify-center bg-muted/30 px-6 py-16 text-foreground">
			<Toaster />
			<div className="mx-auto w-full max-w-5xl">
				<div className="mb-10 max-w-2xl">
					<Badge variant="secondary">
						<RiMailSendLine data-icon="inline-start" />
						Contact
					</Badge>
					<h2 className="mt-4 font-semibold text-2xl tracking-tight sm:text-3xl">
						Let&apos;s talk about your project
					</h2>
					<p className="mt-2 text-muted-foreground text-sm">
						Send the Acme team a message or drop by one of our offices. We reply
						within one business day.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<Card className="w-full">
						<form
							className="flex flex-col gap-(--card-spacing)"
							onSubmit={(event) => {
								event.preventDefault();
								toast.success(
									"Message sent. We'll reply within one business day."
								);
							}}
						>
							<CardHeader>
								<CardTitle className="font-semibold text-sm">
									Send a message
								</CardTitle>
								<CardDescription>
									Tell us a bit about what you need.
								</CardDescription>
							</CardHeader>

							<Separator />

							<CardContent>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="name">Full name</FieldLabel>
										<Input id="name" placeholder="Jane Doe" type="text" />
									</Field>

									<Field>
										<FieldLabel htmlFor="email">Work email</FieldLabel>
										<Input
											id="email"
											placeholder="jane@company.com"
											type="email"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="topic">Topic</FieldLabel>
										<Select name="topic">
											<SelectTrigger className="w-full" id="topic">
												<SelectValue placeholder="Select a topic…" />
											</SelectTrigger>
											<SelectContent>
												{TOPICS.map((topic) => (
													<SelectItem key={topic} value={topic}>
														{topic}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</Field>

									<Field>
										<FieldLabel htmlFor="message">Message</FieldLabel>
										<Textarea
											className="min-h-32 resize-none"
											id="message"
											placeholder="How can we help?"
											rows={6}
										/>
									</Field>
								</FieldGroup>
							</CardContent>

							<CardFooter className="flex flex-col items-stretch gap-4">
								<div className="flex items-center gap-2.5">
									<Checkbox id="consent" name="consent" required />
									<label
										className="font-normal text-muted-foreground text-xs leading-snug"
										htmlFor="consent"
									>
										I agree to the{" "}
										<a
											className="underline underline-offset-4 hover:text-foreground"
											href="#"
										>
											Privacy Policy
										</a>
										.
									</label>
								</div>
								<Button className="w-full" type="submit">
									<RiMailSendLine data-icon="inline-start" />
									Send Message
								</Button>
							</CardFooter>
						</form>
					</Card>

					<div className="flex flex-col gap-6">
						<div
							aria-hidden="true"
							className="relative h-52 w-full overflow-hidden border border-border bg-muted/40"
						>
							<div className="absolute inset-0 grid grid-cols-6">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										className="border-border/40 border-r last:border-r-0"
										key={i}
									/>
								))}
							</div>
							<div className="absolute inset-0 grid grid-rows-3">
								{Array.from({ length: 3 }).map((_, i) => (
									<div
										className="border-border/40 border-b last:border-b-0"
										key={i}
									/>
								))}
							</div>

							{/* location radius */}
							<div className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15 bg-primary/[0.03]" />
							<div className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/[0.04]" />

							{/* marker */}
							<span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-background/70">
								<RiMapPin2Line className="size-5" />
							</span>
						</div>

						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
							{OFFICES.map((office) => (
								<Card key={office.city}>
									<CardContent className="flex items-start gap-3">
										<span className="flex size-8 shrink-0 items-center justify-center border border-border bg-muted">
											<RiMapPin2Line
												aria-hidden="true"
												className="size-4 text-muted-foreground"
											/>
										</span>
										<div className="min-w-0">
											<p className="font-medium text-sm">{office.city}</p>
											<p className="mt-0.5 text-muted-foreground text-xs">
												{office.address}
											</p>
											<p className="mt-1.5 flex items-center gap-1.5 text-muted-foreground text-xs">
												<RiPhoneLine aria-hidden="true" className="size-3.5" />
												{office.phone}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
