import { Metadata } from "next";
import { tools } from "@/data/tools";
import FindReplaceClient from "./FindReplaceClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/find-and-replace");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Advanced Find & Replace | Batch Text Editor | UseMil",
  description: toolData?.metaDescription || "Instantly execute multiple find and replace rules across massive text documents. Features regex support, whole-word matching, and live match counting.",
  keywords: toolData?.keywords?.join(", ") || "find and replace online, batch text replace, regex find and replace, edit text online",
  openGraph: {
    title: toolData?.metaTitle || "Advanced Find & Replace | Batch Text Editor | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function FindReplacePage() {
  return <FindReplaceClient />;
}