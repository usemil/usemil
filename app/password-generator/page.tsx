import { Metadata } from "next";
import { tools } from "@/data/tools";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

// 1. Fetch the data dynamically from your tools array
const toolData = tools.find((t) => t.slug === "/password-generator");

// 2. Export the Server-Side SEO Metadata
export const metadata: Metadata = {
  title: toolData?.metaTitle || "Password Generator | UseMil",
  description: toolData?.metaDescription || "Generate strong, random character strings securely on your browser instance.",
  keywords: toolData?.keywords?.join(", ") || "password generator, free tools, usemil",
  openGraph: {
    title: toolData?.metaTitle || "Password Generator | UseMil",
    description: toolData?.metaDescription || "Generate strong, random character strings securely on your browser instance.",
    type: "website",
  },
};

// 3. Render the Client App
export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}