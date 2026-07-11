import { Metadata } from "next";
import { tools } from "@/data/tools";
import UuidGeneratorClient from "./UuidGeneratorClient";

const toolData = tools.find((t) => t.slug === "/uuid-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "UUID & GUID Generator | UseMil",
  description: toolData?.metaDescription || "Generate random, cryptographically secure v4 UUIDs for your applications.",
  keywords: toolData?.keywords?.join(", ") || "uuid generator, guid generator, free uuid tool, bulk uuid",
  openGraph: {
    title: toolData?.metaTitle || "UUID & GUID Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorClient />;
}