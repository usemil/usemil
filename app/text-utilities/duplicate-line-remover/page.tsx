import { Metadata } from "next";
import { tools } from "@/data/tools";
import DuplicateRemoverClient from "./DuplicateRemoverClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/duplicate-line-remover");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Duplicate Line Remover | Deduplicate Lists | UseMil",
  description: toolData?.metaDescription || "Instantly scan lists and remove duplicate entries locally in your browser. Features advanced whitespace trimming and case controls.",
  keywords: toolData?.keywords?.join(", ") || "duplicate line remover, clean text list, remove unique strings, deduplicate dataset",
  openGraph: {
    title: toolData?.metaTitle || "Duplicate Line Remover | Deduplicate Lists | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function DuplicateRemoverPage() {
  return <DuplicateRemoverClient />;
}