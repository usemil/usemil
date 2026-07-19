import { Metadata } from "next";
import { tools } from "@/data/tools";
import StripHtmlClient from "./StripHtmlClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/strip-html-tags");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Strip HTML Tags | Text Extractor | UseMil",
  description: toolData?.metaDescription || "Instantly remove HTML tags, scripts, and CSS styling to extract clean, readable plain text. Fast, secure, and runs locally.",
  keywords: toolData?.keywords?.join(", ") || "strip html tags, remove html from text, extract text from html, html tag cleaner",
  openGraph: {
    title: toolData?.metaTitle || "Strip HTML Tags | Text Extractor | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function StripHtmlPage() {
  return <StripHtmlClient />;
}