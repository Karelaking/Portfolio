import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

// Docker-friendly version that handles missing API keys
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST() {
  if (!resend) {
    return Response.json({ 
      message: "Email service not configured (missing RESEND_API_KEY)",
      data: { id: "demo-id", message: "This is a demo response" }
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}