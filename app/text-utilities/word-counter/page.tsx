import { Metadata } from "next";
import { tools } from "@/data/tools";
import WordCounterClient from "./WordCounterClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/word-counter");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Word & Character Counter | UseMil",
  description: toolData?.metaDescription || "Instantly count words, characters, sentences, and calculate reading time locally in your browser.",
  keywords: toolData?.keywords?.join(", ") || "word counter, character counter, letter count, word count online",
  openGraph: {
    title: toolData?.metaTitle || "Word & Character Counter | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}