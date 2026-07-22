import { Metadata } from "next";
import { tools } from "@/data/tools";
import WhitespaceCleanerClient from "./WhitespaceCleanerClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/whitespace-cleaner");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Whitespace Cleaner | Remove Extra Spaces | UseMil",
  description: toolData?.metaDescription || "Instantly remove extra spaces, empty lines, and tabs from your text. Fast, secure, and runs locally.",
  keywords: toolData?.keywords?.join(", ") || "whitespace cleaner, remove extra spaces, trim text, clean text",
  openGraph: {
    title: toolData?.metaTitle || "Whitespace Cleaner | Remove Extra Spaces | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function WhitespaceCleanerPage() {
  return <WhitespaceCleanerClient />;
}