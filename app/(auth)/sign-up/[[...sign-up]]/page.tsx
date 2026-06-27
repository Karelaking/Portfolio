"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import type { ReactElement } from "react";

const SignUpPage = (): ReactElement => (
	<main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-12">
		<div className="mx-auto w-full max-w-2xl text-center">
			<section className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
				<p className="text-muted-foreground text-xs uppercase tracking-[0.4em]">
					Create account
				</p>
				<h1 className="mt-3 font-semibold text-3xl">Sign up</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Create your account to access the dashboard.
				</p>

				<SignUp.Root path="/sign-up" routing="path">
					<Clerk.GlobalError className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 text-xs" />

					<SignUp.Step className="mt-6 space-y-4" name="start">
						<div className="grid gap-3">
							<Clerk.Connection
								className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-medium text-foreground text-sm transition hover:border-foreground"
								name="google"
							>
								<Clerk.Icon className="size-4" />
								Google
							</Clerk.Connection>
						</div>

						<div className="flex items-center gap-4 text-muted-foreground text-xs uppercase tracking-[0.3em]">
							<span className="h-px flex-1 bg-border" />
							or
							<span className="h-px flex-1 bg-border" />
						</div>

						<Clerk.Field className="space-y-2" name="emailAddress">
							<Clerk.Label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
								Email
							</Clerk.Label>
							<Clerk.Input
								className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm"
								type="email"
							/>
							<Clerk.FieldError className="text-red-500 text-xs" />
						</Clerk.Field>

						<Clerk.Field className="space-y-2" name="password">
							<Clerk.Label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
								Password
							</Clerk.Label>
							<Clerk.Input
								className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm"
								type="password"
							/>
							<Clerk.FieldError className="text-red-500 text-xs" />
						</Clerk.Field>

						<SignUp.Captcha />

						<SignUp.Action
							className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 font-medium text-background text-sm transition hover:opacity-90"
							submit
						>
							Create account
						</SignUp.Action>

						<Clerk.Link
							className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
							navigate="sign-in"
						>
							Already have an account? Sign in
						</Clerk.Link>
					</SignUp.Step>

					<SignUp.Step className="mt-6 space-y-4" name="continue">
						<p className="text-muted-foreground text-sm">
							Finish setting up your account.
						</p>
						<Clerk.Field className="space-y-2" name="username">
							<Clerk.Label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
								Username
							</Clerk.Label>
							<Clerk.Input className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm" />
							<Clerk.FieldError className="text-red-500 text-xs" />
						</Clerk.Field>
						<SignUp.Action
							className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 font-medium text-background text-sm transition hover:opacity-90"
							submit
						>
							Continue
						</SignUp.Action>
						<SignUp.Action
							className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
							navigate="start"
						>
							Go back
						</SignUp.Action>
					</SignUp.Step>

					<SignUp.Step className="mt-6 space-y-4" name="verifications">
						<SignUp.Strategy name="email_code">
							<p className="text-muted-foreground text-sm">
								We sent a verification code to your email.
							</p>
							<Clerk.Field className="space-y-2" name="code">
								<Clerk.Label className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
									Email code
								</Clerk.Label>
								<Clerk.Input
									className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-center text-foreground text-sm tracking-[0.4em]"
									type="otp"
								/>
								<Clerk.FieldError className="text-red-500 text-xs" />
							</Clerk.Field>
							<SignUp.Action
								className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 font-medium text-background text-sm transition hover:opacity-90"
								submit
							>
								Verify
							</SignUp.Action>
							<SignUp.Action
								className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
								fallback={({ resendableAfter }) => (
									<span>Resend in {resendableAfter}s</span>
								)}
								resend
							>
								Resend code
							</SignUp.Action>
						</SignUp.Strategy>
					</SignUp.Step>
				</SignUp.Root>

				<p className="mt-6 text-muted-foreground text-xs">
					Back to the portfolio?{" "}
					<Link className="underline underline-offset-4" href="/">
						Go home
					</Link>
				</p>
			</section>
		</div>
	</main>
);

export default SignUpPage;
