import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "E-commerce & Retail", value: "ecommerce-retail" },
  { title: "Logistics & Fulfilment", value: "logistics-fulfilment" },
  { title: "Technology & Digital", value: "technology-digital" },
  { title: "Health & Beauty", value: "health-beauty" },
  { title: "Food & Beverage", value: "food-beverage" },
  { title: "Home & Lifestyle", value: "home-lifestyle" },
  { title: "Fashion & Apparel", value: "fashion-apparel" },
  { title: "Professional Services", value: "professional-services" },
  { title: "Other", value: "other" },
];

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
      description: "SVG or PNG with transparent background.",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORIES,
        layout: "dropdown",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Member",
      type: "boolean",
      initialValue: false,
      description: "Featured members appear in the spotlight section with a photo and story.",
    }),
    defineField({
      name: "featuredPersonName",
      title: "Featured Person Name",
      type: "string",
      description: "Name of the founder or key person to feature.",
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "featuredPersonRole",
      title: "Featured Person Role",
      type: "string",
      description: "e.g. Founder & CEO, Head of Operations",
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "featuredPersonPhoto",
      title: "Featured Person Photo",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "featuredStory",
      title: "Featured Story",
      type: "text",
      rows: 4,
      description: "2–3 sentences about this member's story at Hexa Hub.",
      hidden: ({ document }) => !document?.featured,
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
    select: { title: "name", subtitle: "category", media: "logo" },
  },
});
