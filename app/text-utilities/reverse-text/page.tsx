import { Metadata } from "next";
import { tools } from "@/data/tools";
import ReverseTextClient from "./ReverseTextClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/reverse-text");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Reverse Text | Backwards Text Generator | UseMil",
  description: toolData?.metaDescription || "Instantly reverse text, word order, and line sequences. Fast, secure, and runs locally.",
  keywords: toolData?.keywords?.join(", ") || "reverse text, backwards text generator, flip text, mirror text",
  openGraph: {
    title: toolData?.metaTitle || "Reverse Text | Backwards Text Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function ReverseTextPage() {
  return <ReverseTextClient />;
}