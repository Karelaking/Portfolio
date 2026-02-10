"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

const LoginPage = (): ReactElement => {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto w-full max-w-2xl h-dvh">
        <section className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Admin access
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use your email or a social provider to access the dashboard.
          </p>
          <SignIn.Root path="/login" routing="path">
            <Clerk.GlobalError className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400" />

            <SignIn.Step name="start" className="mt-6 space-y-4">
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

              <Clerk.Field name="identifier" className="space-y-2">
                <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                  type="email"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <SignIn.Action
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                submit
              >
                Continue
              </SignIn.Action>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <SignIn.Action
                  className="uppercase tracking-[0.3em] hover:text-foreground"
                  navigate="forgot-password"
                >
                  Forgot password?
                </SignIn.Action>
                <Clerk.Link
                  className="uppercase tracking-[0.3em] hover:text-foreground"
                  navigate="sign-up"
                >
                  Create account
                </Clerk.Link>
              </div>
            </SignIn.Step>

            <SignIn.Step name="verifications" className="mt-6 space-y-4">
              <SignIn.Strategy name="password">
                <p className="text-sm text-muted-foreground">
                  Welcome back, <SignIn.Salutation />. Enter your password to
                  continue.
                </p>
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
                <SignIn.Action
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  submit
                >
                  Sign in
                </SignIn.Action>
                <SignIn.Action
                  className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                  navigate="forgot-password"
                >
                  Forgot password?
                </SignIn.Action>
              </SignIn.Strategy>

              <SignIn.Strategy name="email_code">
                <p className="text-sm text-muted-foreground">
                  We sent a code to <SignIn.SafeIdentifier />.
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
                <SignIn.Action
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  submit
                >
                  Verify
                </SignIn.Action>
                <SignIn.Action
                  className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                  resend
                  fallback={({ resendableAfter }) => (
                    <span>Resend in {resendableAfter}s</span>
                  )}
                >
                  Resend code
                </SignIn.Action>
              </SignIn.Strategy>

              <SignIn.Strategy name="reset_password_email_code">
                <p className="text-sm text-muted-foreground">
                  Reset code sent to <SignIn.SafeIdentifier />.
                </p>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Reset code
                  </Clerk.Label>
                  <Clerk.Input
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-center text-sm text-foreground tracking-[0.4em]"
                    type="otp"
                  />
                  <Clerk.FieldError className="text-xs text-red-500" />
                </Clerk.Field>
                <SignIn.Action
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  submit
                >
                  Continue
                </SignIn.Action>
              </SignIn.Strategy>
            </SignIn.Step>

            <SignIn.Step name="forgot-password" className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose a reset method to recover your account.
              </p>
              <SignIn.SupportedStrategy
                className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground"
                name="reset_password_email_code"
              >
                Reset via email code
              </SignIn.SupportedStrategy>
              <SignIn.Action
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                navigate="previous"
              >
                Go back
              </SignIn.Action>
            </SignIn.Step>

            <SignIn.Step name="reset-password" className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Set a new password to finish resetting your account.
              </p>
              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  New password
                </Clerk.Label>
                <Clerk.Input
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                  type="password"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>
              <Clerk.Field name="confirmPassword" className="space-y-2">
                <Clerk.Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Confirm password
                </Clerk.Label>
                <Clerk.Input
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                  type="password"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>
              <SignIn.Action
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                submit
              >
                Update password
              </SignIn.Action>
            </SignIn.Step>
          </SignIn.Root>

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

export default LoginPage;
