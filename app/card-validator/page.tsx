import { Metadata } from "next";
import { tools } from "@/data/tools";
import CardClient from "./CardClient";

const toolData = tools.find((t) => t.slug === "/card-validator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Credit Card Validator & Generator | UseMil",
  description: toolData?.metaDescription || "Validate credit card structures using the Luhn algorithm and generate valid mock card numbers for testing.",
  keywords: toolData?.keywords?.join(", ") || "credit card validator, luhn algorithm, test credit card generator, dummy card data",
  openGraph: {
    title: toolData?.metaTitle || "Credit Card Validator & Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function CardPage() {
  return <CardClient />;
}