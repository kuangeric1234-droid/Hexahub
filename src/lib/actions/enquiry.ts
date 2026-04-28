"use server";

import { createOrUpdateContact } from "@/lib/hubspot/client";

export type EnquiryState = {
  success: boolean;
  error?: string;
};

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const phone = (formData.get("phone") as string | null)?.trim();
  const businessName = (formData.get("businessName") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();
  const unitId = (formData.get("unitId") as string | null)?.trim();
  const spaceType = (formData.get("spaceType") as string | null)?.trim();
  const honeypot = formData.get("website") as string | null;

  // Spam guard
  if (honeypot) return { success: true };

  // Validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ") || undefined;

  // If no unitId but spaceType exists, prepend context to message
  const fullMessage =
    !unitId && spaceType
      ? `Interested in: ${spaceType}\n\n${message}`
      : message;

  const result = await createOrUpdateContact({
    email,
    firstName: firstName || undefined,
    lastName,
    phone: phone || undefined,
    company: businessName || undefined,
    leadSource: "Website Contact Form",
    unitOfInterest: unitId || undefined,
    message: fullMessage,
  });

  if (!result.success) {
    return {
      success: false,
      error:
        "Something went wrong. Please try again or email us directly at info@hexahub.com.au.",
    };
  }

  return { success: true };
}
