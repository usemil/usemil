import { Metadata } from "next";
import { tools } from "@/data/tools";
import ShaClient from "./ShaClient";

const toolData = tools.find((t) => t.slug === "/sha-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "SHA Hash Generator | SHA-256, SHA-512 | UseMil",
  description: toolData?.metaDescription || "Instantly compute SHA-1, SHA-256, and SHA-512 cryptographic hashes simultaneously.",
  keywords: toolData?.keywords?.join(", ") || "sha generator, sha256 generator, sha512 generator, local hash tool",
  openGraph: {
    title: toolData?.metaTitle || "SHA Hash Generator | SHA-256, SHA-512 | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function ShaPage() {
  return <ShaClient />;
}