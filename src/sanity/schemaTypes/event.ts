import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "eventType", title: "Event Type", type: "string", options: { list: [{ title: "Upcoming", value: "upcoming" }, { title: "Past", value: "past" }] }, initialValue: "upcoming" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })] }),
    defineField({ name: "photos", title: "Photos", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "rsvpLink", title: "RSVP Link", type: "url" }),
  ],
  preview: { select: { title: "title", date: "date", media: "coverImage" }, prepare({ title, date, media }) { return { title, subtitle: date ? new Date(date).toLocaleDateString("en-AU") : "", media }; } },
});
