const HUBSPOT_API_BASE = "https://api.hubapi.com";

export type HubSpotContactParams = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  leadSource?: string;
  unitOfInterest?: string;
  eventName?: string;
  message?: string;
};

type HubSpotResult =
  | { success: true; contactId: string }
  | { success: false; error: string };

function authHeaders(): HeadersInit {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error("HUBSPOT_ACCESS_TOKEN env var is not set");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function buildProperties(params: HubSpotContactParams): Record<string, string> {
  const props: Record<string, string> = {};
  if (params.firstName) props.firstname = params.firstName;
  if (params.lastName) props.lastname = params.lastName;
  if (params.phone) props.phone = params.phone;
  if (params.company) props.company = params.company;
  if (params.leadSource) props.lead_source_website = params.leadSource;
  if (params.unitOfInterest) props.unit_of_interest = params.unitOfInterest;
  if (params.eventName) props.event_name = params.eventName;
  if (params.message) props.enquiry_message = params.message;
  return props;
}

async function findContactByEmail(email: string): Promise<string | null> {
  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [{ propertyName: "email", operator: "EQ", value: email }],
        },
      ],
      properties: ["email"],
      limit: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Search failed ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { results: { id: string }[] };
  return data.results[0]?.id ?? null;
}

async function createContact(
  email: string,
  properties: Record<string, string>
): Promise<string> {
  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ properties: { email, ...properties } }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Create failed ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { id: string };
  return data.id;
}

async function updateContact(
  contactId: string,
  properties: Record<string, string>
): Promise<void> {
  const res = await fetch(
    `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ properties }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Update failed ${res.status}: ${body}`);
  }
}

export async function createOrUpdateContact(
  params: HubSpotContactParams
): Promise<HubSpotResult> {
  const { email } = params;

  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.warn("[HUBSPOT_ERROR] HUBSPOT_ACCESS_TOKEN is not set — skipping CRM sync");
      return { success: false, error: "HUBSPOT_ACCESS_TOKEN not configured" };
    }

    const properties = buildProperties(params);
    const existingId = await findContactByEmail(email);

    if (existingId) {
      await updateContact(existingId, properties);
      return { success: true, contactId: existingId };
    } else {
      const newId = await createContact(email, properties);
      return { success: true, contactId: newId };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);

    // Classify common errors for easier log grepping
    if (message.includes("401")) {
      console.error(
        `[HUBSPOT_ERROR] Unauthorized — token invalid or expired. Check HUBSPOT_ACCESS_TOKEN. email=[redacted]`
      );
    } else if (message.includes("429")) {
      console.error(
        `[HUBSPOT_ERROR] Rate limit exceeded. email=[redacted]: ${message}`
      );
    } else if (message.includes("400")) {
      console.error(
        `[HUBSPOT_ERROR] Bad request — likely a missing or invalid property. email=[redacted]: ${message}`
      );
    } else {
      console.error(
        `[HUBSPOT_ERROR] Failed to create/update contact for email=[redacted]: ${message}`
      );
    }

    return { success: false, error: message };
  }
}
