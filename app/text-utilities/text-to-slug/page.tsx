import { Metadata } from "next";
import { tools } from "@/data/tools";
import TextSlugClient from "./TextSlugClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/text-to-slug");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Text to Slug | URL Generator | UseMil",
  description: toolData?.metaDescription || "Convert titles and text strings into clean, SEO-friendly URL slugs instantly. Supports bulk line-by-line processing and stop-word removal.",
  keywords: toolData?.keywords?.join(", ") || "text to slug, url generator, seo slug creator, slugify string",
  openGraph: {
    title: toolData?.metaTitle || "Text to Slug | URL Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function TextSlugPage() {
  return <TextSlugClient />;
}