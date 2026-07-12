import { Metadata } from "next";
import { tools } from "@/data/tools";
import LoremClient from "./LoremClient";

const toolData = tools.find((t) => t.slug === "/text-utilities/lorem-ipsum-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Lorem Ipsum Generator | UseMil",
  description: toolData?.metaDescription || "Generate organic, randomized Latin placeholder text for your mockups, designs, and web projects locally in your browser.",
  keywords: toolData?.keywords?.join(", ") || "lorem ipsum, placeholder text generator, dummy text",
  openGraph: {
    title: toolData?.metaTitle || "Lorem Ipsum Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function LoremPage() {
  return <LoremClient />;
}