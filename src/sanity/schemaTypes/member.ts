import { defineField, defineType } from "sanity";

export const memberSchema = defineType({
  name: "member",
  title: "Member Business",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Business Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "SVG or PNG with transparent background. Assets to be supplied by client.",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      description: "e.g. E-Commerce, Finance, Logistics — used for alt text and filtering only.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls position in the member logo grid. Lower = earlier.",
      initialValue: 99,
    }),
    defineField({
      name: "active",
      title: "Display on Site",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide without deleting.",
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
    select: { title: "name", subtitle: "industry", media: "logo" },
  },
});
