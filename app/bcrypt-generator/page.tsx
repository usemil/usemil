import { Metadata } from "next";
import { tools } from "@/data/tools";
import BcryptClient from "./BcryptClient";

const toolData = tools.find((t) => t.slug === "/bcrypt-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Bcrypt Hash Generator & Verifier | UseMil",
  description: toolData?.metaDescription || "Securely generate and verify bcrypt hashes completely locally in your browser.",
  keywords: toolData?.keywords?.join(", ") || "bcrypt generator, bcrypt verifier, local hash generator, bcrypt online",
  openGraph: {
    title: toolData?.metaTitle || "Bcrypt Hash Generator & Verifier | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function BcryptPage() {
  return <BcryptClient />;
}