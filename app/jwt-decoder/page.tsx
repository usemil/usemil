import { Metadata } from "next";
import { tools } from "@/data/tools";
import JwtClient from "./JwtClient";

const toolData = tools.find((t) => t.slug === "/jwt-decoder");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "JWT Decoder | Parse JSON Web Tokens | UseMil",
  description: toolData?.metaDescription || "Safely decode and inspect JSON Web Tokens locally without sending data to a server.",
  keywords: toolData?.keywords?.join(", ") || "jwt decoder, json web token, jwt parser, decode jwt online",
  openGraph: {
    title: toolData?.metaTitle || "JWT Decoder | Parse JSON Web Tokens | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function JwtPage() {
  return <JwtClient />;
}