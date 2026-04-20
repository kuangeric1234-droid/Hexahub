import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "targetCustomers", title: "Target Customers", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "startingFromPrice", title: "Starting From (per year, AUD)", type: "number" }),
    defineField({ name: "unitType", title: "Linked Unit Type", type: "string", options: { list: [{ title: "Warehouse", value: "warehouse" }, { title: "Storage", value: "storage" }, { title: "Office + Warehouse", value: "office-warehouse" }, { title: "Office", value: "office" }] } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", media: "coverImage" } },
});
