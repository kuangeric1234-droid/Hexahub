import { defineField, defineType } from "sanity";

export const personSchema = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title / Role",
      type: "string",
      description: "e.g. Founder & CEO, Head of Operations",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: false },
      description: "SVG or PNG with transparent background preferred.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Short bio — optional, only shown on the event page if needed.",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
        defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
        defineField({ name: "websiteUrl", title: "Website URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
