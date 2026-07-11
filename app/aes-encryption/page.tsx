import { Metadata } from "next";
import { tools } from "@/data/tools";
import AesClient from "./AesClient";

const toolData = tools.find((t) => t.slug === "/aes-encryption");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "AES Encryption & Decryption | UseMil",
  description: toolData?.metaDescription || "Securely encrypt and decrypt text using the Advanced Encryption Standard directly in your browser.",
  keywords: toolData?.keywords?.join(", ") || "aes encryption, aes decrypt, encrypt text online, secure messaging",
  openGraph: {
    title: toolData?.metaTitle || "AES Encryption & Decryption | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function AesPage() {
  return <AesClient />;
}