import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "authorName", title: "Author Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "authorCompany", title: "Company", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Show on Homepage", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "authorName", subtitle: "authorCompany", media: "photo" } },
});
