import { defineField, defineType } from "sanity";

export const enquirySchema = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "businessName", title: "Business Name", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "unitOfInterest", title: "Unit of Interest", type: "reference", to: [{ type: "unit" }], options: { disableNew: true } }),
    defineField({ name: "unitIdText", title: "Unit ID (text fallback)", type: "string" }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [{ title: "New", value: "new" }, { title: "Contacted", value: "contacted" }, { title: "Closed", value: "closed" }] },
      initialValue: "new",
    }),
    defineField({ name: "source", title: "Source Page", type: "string" }),
  ],
  preview: {
    select: { name: "name", email: "email", unit: "unitIdText", status: "status", submittedAt: "submittedAt" },
    prepare({ name, email, unit, status, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString("en-AU") : "";
      return { title: `${name || email || "Unknown"}${unit ? ` — ${unit}` : ""}`, subtitle: `${status?.toUpperCase()} · ${date}` };
    },
  },
});
