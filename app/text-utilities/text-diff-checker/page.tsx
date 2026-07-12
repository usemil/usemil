import { Metadata } from "next";
import { tools } from "@/data/tools";
import DiffClient from "./DiffClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/text-diff-checker");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Text Diff Checker | Compare Code & Text | UseMil",
  description: toolData?.metaDescription || "Compare two text documents or code snippets to instantly highlight additions, deletions, and modifications locally in your browser.",
  keywords: toolData?.keywords?.join(", ") || "text diff checker, compare text, code diff tool, find differences in text",
  openGraph: {
    title: toolData?.metaTitle || "Text Diff Checker | Compare Code & Text | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function DiffPage() {
  return <DiffClient />;
}