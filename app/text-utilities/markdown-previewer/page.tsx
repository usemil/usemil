import { Metadata } from "next";
import { tools } from "@/data/tools";
import MarkdownClient from "./MarkdownClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/markdown-previewer");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Markdown Previewer | Convert MD to HTML | UseMil",
  description: toolData?.metaDescription || "Instantly draft, visualize, and convert Markdown text into clean, styled HTML code directly in your browser. Zero dependencies required.",
  keywords: toolData?.keywords?.join(", ") || "markdown previewer, convert md to html, live markdown editor",
  openGraph: {
    title: toolData?.metaTitle || "Markdown Previewer | Convert MD to HTML | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function MarkdownPage() {
  return <MarkdownClient />;
}