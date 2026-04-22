import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "HexaHub CMS",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Units").schemaType("unit").child(S.documentTypeList("unit")),
            S.listItem().title("Events").schemaType("event").child(S.documentTypeList("event")),
            S.listItem().title("Members").schemaType("member").child(S.documentTypeList("member")),
            S.listItem().title("Ecosystem Partners").schemaType("partner").child(S.documentTypeList("partner")),
            S.listItem().title("Testimonials").schemaType("testimonial").child(S.documentTypeList("testimonial")),
            S.listItem().title("Services").schemaType("service").child(S.documentTypeList("service")),
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.listItem().title("Enquiries").schemaType("enquiry").child(S.documentTypeList("enquiry")),
          ]),
    }),
    visionTool(),
  ],
});
