import { defineField, defineType } from "sanity";

export const partnerSchema = defineType({
  name: "partner",
  title: "Ecosystem Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Supply Chain & Logistics", value: "supply-chain" },
          { title: "Digital & E-Commerce", value: "digital" },
          { title: "Shipping & Fulfilment", value: "shipping" },
          { title: "Mentorship & Advisory", value: "mentorship" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "SVG or PNG with transparent background preferred.",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the ecosystem section of the homepage.",
    }),
    defineField({
      name: "memberBenefits",
      title: "Member Benefits",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points of what Hexa Hub members get from this partner (2–4 items).",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first. EIZ=1, Digitec=2, AusPost=3, Mentorship=4.",
      initialValue: 99,
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "logo" },
  },
});
