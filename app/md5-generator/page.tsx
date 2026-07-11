import { Metadata } from "next";
import { tools } from "@/data/tools";
import Md5Client from "./Md5Client";

const toolData = tools.find((t) => t.slug === "/md5-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "MD5 Hash Generator | UseMil",
  description: toolData?.metaDescription || "Instantly compute MD5 cryptographic hashes from text strings directly in your browser.",
  keywords: toolData?.keywords?.join(", ") || "md5 generator, md5 hash tool, create md5 hash, local md5 converter",
  openGraph: {
    title: toolData?.metaTitle || "MD5 Hash Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function Md5Page() {
  return <Md5Client />;
}