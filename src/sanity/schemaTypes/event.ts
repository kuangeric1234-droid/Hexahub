import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date (optional)",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      placeholder: "The Hub, Hexa Hub Huntingdale",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description: "One-line description shown on the events list page",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Full event details — shown on the event detail page",
    }),
    defineField({
      name: "recap",
      title: "Recap",
      type: "array",
      of: [{ type: "block" }],
      description: "Post-event write-up — shown only for past events",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "rsvpLink",
      title: "RSVP / Register Link",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "coverImage" },
    prepare({ title, date, media }) {
      const isPast = date ? new Date(date) < new Date() : false;
      return {
        title,
        subtitle: `${isPast ? "Past" : "Upcoming"} · ${date ? new Date(date).toLocaleDateString("en-AU") : "No date"}`,
        media,
      };
    },
  },
});
