import { defineField, defineType } from "sanity";

export const unitSchema = defineType({
  name: "unit",
  title: "Unit",
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
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "unitId",
      title: "Unit ID",
      type: "string",
      description: 'e.g. "61W", "O5", "42S"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Warehouse", value: "warehouse" },
          { title: "Storage", value: "storage" },
          { title: "Office + Warehouse", value: "office-warehouse" },
          { title: "Showroom + Warehouse", value: "showroom-warehouse" },
          { title: "Office", value: "office" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "listingType",
      title: "Listing Type",
      type: "string",
      options: {
        list: [
          { title: "For Lease", value: "for-lease" },
          { title: "For Sale", value: "for-sale" },
        ],
        layout: "radio",
      },
      initialValue: "for-lease",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Under Offer", value: "under-offer" },
          { title: "Coming Soon", value: "coming-soon" },
          { title: "Leased", value: "leased" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      description: "e.g. 15 Logistic Court, Huntingdale VIC 3166",
    }),
    defineField({
      name: "block",
      title: "Block",
      type: "string",
      description: "e.g. Block B, Block G, Block H, Store",
    }),
    defineField({
      name: "sizeSquareMetres",
      title: "Total Size (m²)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "groundFloorM2",
      title: "Ground Floor (m²)",
      type: "number",
    }),
    defineField({
      name: "firstFloorM2",
      title: "First Floor / Mezzanine (m²)",
      type: "number",
    }),
    defineField({
      name: "secondFloorM2",
      title: "Second Floor (m²)",
      type: "number",
    }),
    defineField({
      name: "monthlyPrice",
      title: "Monthly Price (AUD, ex GST)",
      type: "number",
      description: "Monthly rent excluding GST and outgoings. Leave blank to show 'Contact for Pricing'.",
    }),
    defineField({
      name: "annualPrice",
      title: "Annual Price (AUD, ex GST) — legacy",
      type: "number",
      description: "Kept for reference only. Use Monthly Price going forward.",
    }),
    defineField({
      name: "bondAmount",
      title: "Bond Amount (AUD)",
      type: "number",
    }),
    defineField({
      name: "minimumTerm",
      title: "Minimum Lease Term",
      type: "string",
      initialValue: "12 months",
    }),
    defineField({
      name: "parkingSpaces",
      title: "Car Spaces",
      type: "number",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Roller door access", value: "Roller door access" },
          { title: "Tilt door access", value: "Tilt door access" },
          { title: "24/7 secure access", value: "24/7 secure access" },
          { title: "3-phase power", value: "3-phase power" },
          { title: "Single-phase power", value: "Single-phase power" },
          { title: "Mezzanine office", value: "Mezzanine office" },
          { title: "Balcony", value: "Balcony" },
          { title: "Full floor office", value: "Full floor office" },
          { title: "Kitchenette", value: "Kitchenette" },
          { title: "Private bathroom", value: "Private bathroom" },
          { title: "LED high-bay lighting", value: "LED high-bay lighting" },
          { title: "Polished concrete floors", value: "Polished concrete floors" },
          { title: "NBN provision", value: "NBN provision" },
          { title: "24hr CCTV", value: "24hr CCTV" },
          { title: "Drive through", value: "Drive through" },
          { title: "Street frontage", value: "Street frontage" },
          { title: "The Hub access", value: "The Hub access" },
          { title: "Wireless keypad", value: "Wireless keypad" },
          { title: "Split system A/C", value: "Split system A/C" },
          { title: "District views", value: "District views" },
        ],
      },
    }),
    defineField({
      name: "rollerDoorDimensions",
      title: "Roller Door Dimensions",
      type: "string",
      description: "e.g. 3.6m wide × 4.2m high",
    }),
    defineField({
      name: "powerSupply",
      title: "Power Supply",
      type: "string",
    }),
    defineField({
      name: "accessHours",
      title: "Access Hours",
      type: "string",
      initialValue: "24/7",
    }),
    defineField({
      name: "hasLoadingZone",
      title: "Loading Zone",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hasMezzanine",
      title: "Has Mezzanine",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "attributes",
      title: "Key Attributes",
      type: "string",
      description: "Short selling point shown on listing card",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "floorPlan",
      title: "Floor Plan",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Feature on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "availableFrom",
      title: "Available From",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      unitId: "unitId",
      status: "status",
      media: "photos.0",
    },
    prepare({ title, unitId, status, media }) {
      return {
        title: `${unitId} — ${title}`,
        subtitle: status,
        media,
      };
    },
  },
});
