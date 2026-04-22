"use server";

import { Resend } from "resend";
import { client } from "@/lib/sanity/client";
import { createOrUpdateContact } from "@/lib/hubspot/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export type EnquiryState = {
  success: boolean;
  error?: string;
};

export async function submitEnquiry(
  prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const phone = (formData.get("phone") as string | null)?.trim();
  const businessName = (formData.get("businessName") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();
  const unitId = (formData.get("unitId") as string | null)?.trim();
  const spaceType = (formData.get("spaceType") as string | null)?.trim();
  const source = (formData.get("source") as string | null)?.trim();
  const honeypot = formData.get("website") as string | null;

  // Spam guard
  if (honeypot) return { success: true };

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const submittedAt = new Date().toISOString();

  try {
    await client.create({
      _type: "enquiry",
      name,
      email,
      phone: phone || undefined,
      businessName: businessName || undefined,
      message,
      unitIdText: unitId || spaceType || undefined,
      submittedAt,
      status: "new",
      source: source || "website",
    });
  } catch {
    // Don't block the user if Sanity write fails — still attempt email
  }

  try {
    const recipient = process.env.ENQUIRY_EMAIL ?? "marketing@hexa.com.au";
    const interestLabel = unitId || spaceType || "General";
    await resend.emails.send({
      from: "Hexa Hub Enquiries <enquiries@hexahub.com.au>",
      to: recipient,
      replyTo: email,
      subject: unitId ? `New Enquiry — ${unitId}` : `New Enquiry — ${interestLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#111;margin-bottom:8px">New Enquiry${unitId ? ` — Unit ${unitId}` : ""}</h2>
          <p style="color:#555;margin-bottom:24px;font-size:13px">Received ${new Date(submittedAt).toLocaleString("en-AU", { timeZone: "Australia/Melbourne" })} AEST</p>
          <table style="width:100%;border-collapse:collapse">
            ${[
              ["Name", name],
              ["Email", email],
              ["Phone", phone || "—"],
              ["Business", businessName || "—"],
              ["Interested in", interestLabel],
              ["Message", message],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:10px 16px;background:#f9f9f9;font-weight:600;font-size:13px;color:#333;width:140px;border-bottom:1px solid #eee">${label}</td>
                <td style="padding:10px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;white-space:pre-wrap">${value}</td>
              </tr>`
              )
              .join("")}
          </table>
          <p style="margin-top:24px;font-size:12px;color:#999">Sent via Hexa Hub website contact form</p>
        </div>
      `,
    });
  } catch {
    // Email failed — enquiry still saved to Sanity
  }

  // HubSpot — last, most likely to fail due to external API
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ") || undefined;
  await createOrUpdateContact({
    email,
    firstName: firstName || undefined,
    lastName,
    phone: phone || undefined,
    company: businessName || undefined,
    leadSource: "Website Contact Form",
    message: message || undefined,
  });
  // Failures are already logged with [HUBSPOT_ERROR] prefix inside createOrUpdateContact

  return { success: true };
}
