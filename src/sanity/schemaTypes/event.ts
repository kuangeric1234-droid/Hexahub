import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "overview", title: "Event Overview" },
    { name: "details", title: "Details" },
    { name: "people", title: "People" },
    { name: "rsvp", title: "RSVP" },
    { name: "archive", title: "Archive (Post-event)" },
    { name: "legacy", title: "Legacy" },
  ],
  fields: [
    // ── BASICS ────────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basics",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "basics",
      description: "1–2 sentence subtitle shown in the event hero. Optional but recommended.",
    }),
    defineField({
      name: "date",
      title: "Event Date & Time",
      type: "datetime",
      group: "basics",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
      group: "basics",
      description: "Optional — leave blank for single-day events.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "basics",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Describe the image for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      group: "basics",
      description: "One-line description shown on the events listing page cards.",
    }),

    // ── OVERVIEW ──────────────────────────────────────────────────────────────
    defineField({
      name: "description",
      title: "Event Overview",
      type: "array",
      group: "overview",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
      ],
      description:
        "Full event details and agenda shown on the event detail page. Supports headings, bold, italic, lists, links, and blockquotes.",
    }),

    // ── DETAILS ───────────────────────────────────────────────────────────────
    defineField({
      name: "location",
      title: "Location (short label)",
      type: "string",
      group: "details",
      description:
        `Short human-readable label used on listing cards and the detail sidebar, e.g. "The Hub, Huntingdale".`,
      placeholder: "The Hub, Hexa Hub Huntingdale",
    }),
    defineField({
      name: "locationAddress",
      title: "Full Street Address",
      type: "string",
      group: "details",
      description:
        `Shown in the detail-page sidebar and above the map, e.g. "7 Distribution Circuit, Huntingdale VIC 3166".`,
    }),
    defineField({
      name: "locationLatitude",
      title: "Latitude",
      type: "number",
      group: "details",
      description: "Used to embed a Google Map. e.g. -37.911",
    }),
    defineField({
      name: "locationLongitude",
      title: "Longitude",
      type: "number",
      group: "details",
      description: "Used to embed a Google Map. e.g. 145.114",
    }),
    defineField({
      name: "locationMapEmbedUrl",
      title: "Map Embed URL (optional override)",
      type: "url",
      group: "details",
      description:
        "Paste a Google Maps embed URL here to override the lat/lng map. Leave blank to auto-generate from coordinates.",
    }),
    defineField({
      name: "organiserName",
      title: "Organiser Name",
      type: "string",
      group: "details",
      description: 'e.g. "Hexa Hub"',
    }),
    defineField({
      name: "organiserInstagramUrl",
      title: "Organiser Instagram URL",
      type: "url",
      group: "details",
      description: "Populates the Follow button next to the organiser name.",
    }),

    // ── PEOPLE ────────────────────────────────────────────────────────────────
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      group: "people",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      description: "People presenting or speaking at this event.",
    }),
    defineField({
      name: "organisers",
      title: "Organisers",
      type: "array",
      group: "people",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      description: "People organising this event (separate from speakers).",
    }),

    // ── RSVP ─────────────────────────────────────────────────────────────────
    defineField({
      name: "rsvpEnabled",
      title: "Enable RSVP Form",
      type: "boolean",
      group: "rsvp",
      initialValue: false,
      description:
        "When on, an embedded HubSpot RSVP form appears on the event page. Turn off after the event.",
    }),
    defineField({
      name: "rsvpCapacity",
      title: "Capacity",
      type: "number",
      group: "rsvp",
      description: "Displayed as informational text only — e.g. 60. Leave blank if unlimited.",
    }),
    defineField({
      name: "rsvpClosingDate",
      title: "RSVP Closing Date & Time",
      type: "datetime",
      group: "rsvp",
      description:
        `After this date and time, the RSVP form is replaced with a "RSVPs are now closed" message.`,
    }),
    defineField({
      name: "rsvpFormOverride",
      title: "Custom HubSpot Form ID (escape hatch)",
      type: "string",
      group: "rsvp",
      description:
        "Leave blank to use the master HubSpot form configured in the site settings. Paste a different HubSpot form ID here only if this specific event needs its own form.",
    }),

    // ── ARCHIVE ───────────────────────────────────────────────────────────────
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "archive",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
          ],
        },
      ],
      description: "Event photos — upload after the event happens.",
    }),
    defineField({
      name: "recap",
      title: "Recap",
      type: "array",
      group: "archive",
      of: [{ type: "block" }],
      description: "Post-event write-up shown on the event detail page for past events.",
    }),

    // ── LEGACY ────────────────────────────────────────────────────────────────
    defineField({
      name: "rsvpLink",
      title: "External RSVP Link (deprecated)",
      type: "url",
      group: "legacy",
      description:
        "Legacy field — use the RSVP embed form settings above for new events. Kept to support existing event documents that had an external Eventbrite / registration URL.",
    }),
  ],
  orderings: [
    {
      title: "Event Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Event Date (upcoming first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", media: "coverImage" },
    prepare({ title, date, media }) {
      const isPast = date ? new Date(date) < new Date() : false;
      return {
        title,
        subtitle: `${isPast ? "Past" : "Upcoming"} · ${
          date
            ? new Date(date).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "No date"
        }`,
        media,
      };
    },
  },
});
