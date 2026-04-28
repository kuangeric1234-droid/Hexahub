import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone", type: "string", initialValue: "+61 406 016 666" }),
    defineField({ name: "email", title: "Email", type: "string", initialValue: "info@hexahub.com.au", description: "Primary contact email — note this is @hexa.com.au (parent group domain), not @hexahub.com.au." }),
    defineField({ name: "address", title: "Address", type: "string", initialValue: "7 Distribution Circuit, Huntingdale VIC 3166" }),
    defineField({ name: "businessHours", title: "Business Hours", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", initialValue: "Your business needs space. We have it." }),
    defineField({ name: "heroSubheadline", title: "Hero Subheadline", type: "string", initialValue: "Warehouse units, storage lots, and office-warehouse spaces available now at Huntingdale, Melbourne." }),
    defineField({ name: "googleMapsEmbedUrl", title: "Google Maps Embed URL", type: "url" }),
  ],
  preview: { prepare() { return { title: "Site Settings" }; } },
});
