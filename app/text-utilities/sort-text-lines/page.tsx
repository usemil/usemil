import { Metadata } from "next";
import { tools } from "@/data/tools";
import SortLinesClient from "./SortLinesClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/sort-text-lines");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Sort Text Lines | Alphabetize & Organize | UseMil",
  description: toolData?.metaDescription || "Instantly alphabetize lists, sort by natural number, organize by line length, or randomize text online.",
  keywords: toolData?.keywords?.join(", ") || "sort text lines, alphabetize list, sort by length, randomize list",
  openGraph: {
    title: toolData?.metaTitle || "Sort Text Lines | Alphabetize & Organize | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function SortLinesPage() {
  return <SortLinesClient />;
}