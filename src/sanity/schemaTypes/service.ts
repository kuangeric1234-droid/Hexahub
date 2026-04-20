import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Operational Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Lucide icon name — e.g. Boxes, Truck, Layers, PackageCheck, Send, Lock, Wrench, Building2, Zap",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "string",
      description: 'Free text — e.g. "POA", "$120/hour", "Included", "$25–$45 per pallet"',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Logistics & Handling", value: "logistics" },
          { title: "Shipping", value: "shipping" },
          { title: "Site Operations", value: "site-ops" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", pricing: "pricing", active: "active" },
    prepare({ title, pricing, active }) {
      return {
        title,
        subtitle: `${pricing ?? "No pricing"} · ${active ? "Active" : "Hidden"}`,
      };
    },
  },
});
