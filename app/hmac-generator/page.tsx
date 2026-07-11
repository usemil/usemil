import { Metadata } from "next";
import { tools } from "@/data/tools";
import HmacClient from "./HmacClient";

const toolData = tools.find((t) => t.slug === "/hmac-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "HMAC Generator | SHA256, SHA512, MD5 | UseMil",
  description: toolData?.metaDescription || "Generate secure HMAC signatures using MD5, SHA-1, SHA-256, or SHA-512.",
  keywords: toolData?.keywords?.join(", ") || "hmac generator, hmac-sha256, local hmac tool",
  openGraph: {
    title: toolData?.metaTitle || "HMAC Generator | SHA256, SHA512, MD5 | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function HmacPage() {
  return <HmacClient />;
}