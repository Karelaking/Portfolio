"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

const LoginPage = (): ReactElement => {
  return (
    <main className="bg-background min-h-screen px-6 py-12">
      <div className="mx-auto h-dvh w-full max-w-2xl">
        <section className="border-border/70 bg-card rounded-3xl border p-8 shadow-sm">
          <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
            Admin access
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Use your email or a social provider to access the dashboard.
          </p>
          <SignIn.Root path="/login" routing="path">
            <Clerk.GlobalError className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400" />

            <SignIn.Step name="start" className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Clerk.Connection
                  className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition"
                  name="google"
                >
                  <Clerk.Icon className="size-4" />
                  Google
                </Clerk.Connection>
                <Clerk.Connection
                  className="border-border text-foreground hover:border-foreground inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition"
                  name="github"
                >
                  <Clerk.Icon className="size-4" />
                  GitHub
                </Clerk.Connection>
              </div>

              <div className="text-muted-foreground flex items-center gap-4 text-xs tracking-[0.3em] uppercase">
                <span className="bg-border h-px flex-1" />
                or
                <span className="bg-border h-px flex-1" />
              </div>

              <Clerk.Field name="identifier" className="space-y-2">
                <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-sm"
                  type="email"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <SignIn.Action
                className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                submit
              >
                Continue
              </SignIn.Action>

              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <SignIn.Action
                  className="hover:text-foreground tracking-[0.3em] uppercase"
                  navigate="forgot-password"
                >
                  Forgot password?
                </SignIn.Action>
                <Clerk.Link
                  className="hover:text-foreground tracking-[0.3em] uppercase"
                  navigate="sign-up"
                >
                  Create account
                </Clerk.Link>
              </div>
            </SignIn.Step>

            <SignIn.Step name="verifications" className="mt-6 space-y-4">
              <SignIn.Strategy name="password">
                <p className="text-muted-foreground text-sm">
                  Welcome back, <SignIn.Salutation />. Enter your password to
                  continue.
                </p>
                <Clerk.Field name="password" className="space-y-2">
                  <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                    Password
                  </Clerk.Label>
                  <Clerk.Input
                    className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-sm"
                    type="password"
                  />
                  <Clerk.FieldError className="text-xs text-red-500" />
                </Clerk.Field>
                <SignIn.Action
                  className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                  submit
                >
                  Sign in
                </SignIn.Action>
                <SignIn.Action
                  className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
                  navigate="forgot-password"
                >
                  Forgot password?
                </SignIn.Action>
              </SignIn.Strategy>

              <SignIn.Strategy name="email_code">
                <p className="text-muted-foreground text-sm">
                  We sent a code to <SignIn.SafeIdentifier />.
                </p>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                    Email code
                  </Clerk.Label>
                  <Clerk.Input
                    className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-center text-sm tracking-[0.4em]"
                    type="otp"
                  />
                  <Clerk.FieldError className="text-xs text-red-500" />
                </Clerk.Field>
                <SignIn.Action
                  className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                  submit
                >
                  Verify
                </SignIn.Action>
                <SignIn.Action
                  className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
                  resend
                  fallback={({ resendableAfter }) => (
                    <span>Resend in {resendableAfter}s</span>
                  )}
                >
                  Resend code
                </SignIn.Action>
              </SignIn.Strategy>

              <SignIn.Strategy name="reset_password_email_code">
                <p className="text-muted-foreground text-sm">
                  Reset code sent to <SignIn.SafeIdentifier />.
                </p>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                    Reset code
                  </Clerk.Label>
                  <Clerk.Input
                    className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-center text-sm tracking-[0.4em]"
                    type="otp"
                  />
                  <Clerk.FieldError className="text-xs text-red-500" />
                </Clerk.Field>
                <SignIn.Action
                  className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                  submit
                >
                  Continue
                </SignIn.Action>
              </SignIn.Strategy>
            </SignIn.Step>

            <SignIn.Step name="forgot-password" className="mt-6 space-y-4">
              <p className="text-muted-foreground text-sm">
                Choose a reset method to recover your account.
              </p>
              <SignIn.SupportedStrategy name="reset_password_email_code">
                Reset via email code
              </SignIn.SupportedStrategy>
              <SignIn.Action
                className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
                navigate="previous"
              >
                Go back
              </SignIn.Action>
            </SignIn.Step>

            <SignIn.Step name="reset-password" className="mt-6 space-y-4">
              <p className="text-muted-foreground text-sm">
                Set a new password to finish resetting your account.
              </p>
              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  New password
                </Clerk.Label>
                <Clerk.Input
                  className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-sm"
                  type="password"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>
              <Clerk.Field name="confirmPassword" className="space-y-2">
                <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  Confirm password
                </Clerk.Label>
                <Clerk.Input
                  className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-sm"
                  type="password"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>
              <SignIn.Action
                className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                submit
              >
                Update password
              </SignIn.Action>
            </SignIn.Step>
          </SignIn.Root>

          <p className="text-muted-foreground mt-6 text-xs">
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
