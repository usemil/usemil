import { Metadata } from "next";
import { tools } from "@/data/tools";
import CaseClient from "./CaseClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/case-converter");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Case Converter | camelCase, UPPERCASE | UseMil",
  description: toolData?.metaDescription || "Instantly convert text between lowercase, UPPERCASE, camelCase, snake_case, PascalCase, and more.",
  keywords: toolData?.keywords?.join(", ") || "case converter, uppercase converter, lowercase converter, camelCase generator",
  openGraph: {
    title: toolData?.metaTitle || "Case Converter | camelCase, UPPERCASE | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function CaseConverterPage() {
  return <CaseClient />;
}