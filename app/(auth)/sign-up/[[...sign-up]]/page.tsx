"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

const SignUpPage = (): ReactElement => {
  return (
    <main className="bg-background min-h-dvh flex flex-col justify-center items-center px-6 py-12">
      <div className="mx-auto w-full max-w-2xl text-center">
        <section className="border-border/70 bg-card rounded-3xl border p-8 shadow-sm">
          <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
            Create account
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Sign up</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Create your account to access the dashboard.
          </p>

          <SignUp.Root path="/sign-up" routing="path">
            <Clerk.GlobalError className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400" />

            <SignUp.Step name="start" className="mt-6 space-y-4">
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

              <Clerk.Field name="emailAddress" className="space-y-2">
                <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-sm"
                  type="email"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

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

              <SignUp.Captcha />

              <SignUp.Action
                className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                submit
              >
                Create account
              </SignUp.Action>

              <Clerk.Link
                className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
                navigate="sign-in"
              >
                Already have an account? Sign in
              </Clerk.Link>
            </SignUp.Step>

            <SignUp.Step name="continue" className="mt-6 space-y-4">
              <p className="text-muted-foreground text-sm">
                Finish setting up your account.
              </p>
              <Clerk.Field name="username" className="space-y-2">
                <Clerk.Label className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                  Username
                </Clerk.Label>
                <Clerk.Input className="border-border bg-background text-foreground w-full rounded-2xl border px-4 py-3 text-sm" />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>
              <SignUp.Action
                className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                submit
              >
                Continue
              </SignUp.Action>
              <SignUp.Action
                className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
                navigate="start"
              >
                Go back
              </SignUp.Action>
            </SignUp.Step>

            <SignUp.Step name="verifications" className="mt-6 space-y-4">
              <SignUp.Strategy name="email_code">
                <p className="text-muted-foreground text-sm">
                  We sent a verification code to your email.
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
                <SignUp.Action
                  className="bg-foreground text-background inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
                  submit
                >
                  Verify
                </SignUp.Action>
                <SignUp.Action
                  className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
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

export default SignUpPage;
