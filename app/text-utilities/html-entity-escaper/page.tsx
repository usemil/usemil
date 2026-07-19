import { Metadata } from "next";
import { tools } from "@/data/tools";
import HtmlEscaperClient from "./HtmlEscaperClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/html-entity-escaper");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "HTML Entity Escaper | Encode & Decode | UseMil",
  description: toolData?.metaDescription || "Safely convert raw HTML into string entities, or decode entities back into raw text. A fast, local browser tool for developers.",
  keywords: toolData?.keywords?.join(", ") || "html entity escaper, encode html, decode html, xss prevention tool",
  openGraph: {
    title: toolData?.metaTitle || "HTML Entity Escaper | Encode & Decode | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function HtmlEscaperPage() {
  return <HtmlEscaperClient />;
}