"use server";

import { Resend } from "resend";
import {
  getSupabaseAdminClient,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result.interface";
import type { ContactMessageInput } from "@/types/contact-message-input.interface";

const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

const resolveRecipients = (): { from: string; to: string } | null => {
  const from = process.env.RESEND_FROM ?? "";
  const to = process.env.RESEND_TO ?? "";

  if (!from || !to) {
    return null;
  }

  return { from, to };
};

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const renderContactEmail = (input: ContactMessageInput): string => {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message).replace(/\n/g, "<br />");
  const receivedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New portfolio inquiry</title>
  </head>
  <body style="margin:0;background:#f6f6f6;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#0b0b0b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e4e4;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 12px 32px;">
                <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#6b6b6b;">Portfolio inquiry</div>
                <h1 style="margin:12px 0 8px 0;font-size:24px;line-height:1.3;">New message received</h1>
                <p style="margin:0;font-size:14px;color:#6b6b6b;">Received ${receivedAt}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ededed;border-radius:16px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b6b6b;">From</p>
                      <p style="margin:0;font-size:16px;font-weight:600;">${name}</p>
                      <p style="margin:6px 0 0 0;font-size:14px;color:#2d2d2d;">${email}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0 32px;">
                <div style="border-left:2px solid #0b0b0b;padding-left:16px;">
                  <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b6b6b;">Message</p>
                  <p style="margin:0;font-size:15px;line-height:1.6;color:#1d1d1d;">${message}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <a href="mailto:${email}" style="display:inline-block;background:#0b0b0b;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:999px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Reply to ${name}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px 32px;">
                <p style="margin:16px 0 0 0;font-size:12px;color:#6b6b6b;">You can reply directly to this email and the response will go to ${email}.</p>
              </td>
            </tr>
          </table>
          <p style="margin:18px 0 0 0;font-size:11px;color:#9b9b9b;">Sent by your portfolio contact form.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const sendContactEmail = async (
  input: ContactMessageInput,
): Promise<ActionResult> => {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  if (!apiKey) {
    return { ok: false, error: "Email service not configured." };
  }

  const recipients = resolveRecipients();
  if (!recipients) {
    return { ok: false, error: "Email recipients not configured." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: recipients.from,
    to: recipients.to,
    subject: `New portfolio inquiry from ${input.name}`,
    replyTo: input.email,
    text: `Name: ${input.name}\nEmail: ${input.email}\nReceived: ${new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })}\n\n${input.message}`,
    html: renderContactEmail(input),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
};

const storeContactMessage = async (
  input: ContactMessageInput,
): Promise<ActionResult> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return { ok: true };
  }

  const { error } = await client.from("contact_messages").insert(input);
  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
};

export const submitContact = async (
  input: ContactMessageInput,
): Promise<ActionResult> => {
  if (!input.name || !input.email || !input.message) {
    return { ok: false, error: "Please complete all fields." };
  }

  if (!isValidEmail(input.email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const [emailResult, storeResult] = await Promise.all([
    sendContactEmail(input),
    storeContactMessage(input),
  ]);

  if (!emailResult.ok) {
    return emailResult;
  }

  if (!storeResult.ok) {
    return { ok: true, error: "Message sent, storage pending." };
  }

  return { ok: true };
};
