import { Metadata } from "next";
import { tools } from "@/data/tools";
import RsaClient from "./RsaClient";

const toolData = tools.find((t) => t.slug === "/rsa-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "RSA Key Generator | UseMil",
  description: toolData?.metaDescription || "Generate secure 1024, 2048, or 4096-bit asymmetric RSA key pairs in PEM format directly in your browser.",
  keywords: toolData?.keywords?.join(", ") || "rsa generator, rsa key pair, generate rsa key online, public private key",
  openGraph: {
    title: toolData?.metaTitle || "RSA Key Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function RsaPage() {
  return <RsaClient />;
}