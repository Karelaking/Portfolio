"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

const SignUpPage = (): ReactElement => {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <section className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Create account
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Sign up</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your account to access the dashboard.
          </p>

          <SignUp.Root path="/sign-up" routing="path">
            <Clerk.GlobalError className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400" />

            <SignUp.Step name="start" className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Clerk.Connection
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground"
                  name="google"
                >
                  <Clerk.Icon className="size-4" />
                  Google
                </Clerk.Connection>
                <Clerk.Connection
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground"
                  name="github"
                >
                  <Clerk.Icon className="size-4" />
                  GitHub
                </Clerk.Connection>
              </div>

              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>

              <Clerk.Field name="emailAddress" className="space-y-2">
                <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                  type="email"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                  type="password"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <SignUp.Captcha />

              <SignUp.Action
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                submit
              >
                Create account
              </SignUp.Action>

              <Clerk.Link
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                navigate="sign-in"
              >
                Already have an account? Sign in
              </Clerk.Link>
            </SignUp.Step>

            <SignUp.Step name="continue" className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Finish setting up your account.
              </p>
              <Clerk.Field name="username" className="space-y-2">
                <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Username
                </Clerk.Label>
                <Clerk.Input className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground" />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>
              <SignUp.Action
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                submit
              >
                Continue
              </SignUp.Action>
              <SignUp.Action
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                navigate="start"
              >
                Go back
              </SignUp.Action>
            </SignUp.Step>

            <SignUp.Step name="verifications" className="mt-6 space-y-4">
              <SignUp.Strategy name="email_code">
                <p className="text-sm text-muted-foreground">
                  We sent a verification code to your email.
                </p>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Email code
                  </Clerk.Label>
                  <Clerk.Input
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-center text-sm text-foreground tracking-[0.4em]"
                    type="otp"
                  />
                  <Clerk.FieldError className="text-xs text-red-500" />
                </Clerk.Field>
                <SignUp.Action
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  submit
                >
                  Verify
                </SignUp.Action>
                <SignUp.Action
                  className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                  resend
                  fallback={({ resendableAfter }) => (
                    <span>Resend in {resendableAfter}s</span>
                  )}
                >
                  Resend code
                </SignUp.Action>
              </SignUp.Strategy>
            </SignUp.Step>
          </SignUp.Root>

          <p className="mt-6 text-xs text-muted-foreground">
            Back to the portfolio?{" "}
            <Link className="underline underline-offset-4" href="/">
              Go home
            </Link>
          </p>
        </section>

      </div>
    </main>
  );
};

export default SignUpPage;
