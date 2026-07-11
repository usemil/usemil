import { Metadata } from "next";
import { tools } from "@/data/tools";
import PassphraseClient from "./PassphraseClient";

const toolData = tools.find((t) => t.slug === "/passphrase-generator");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Secure Passphrase Generator | UseMil",
  description: toolData?.metaDescription || "Generate highly secure, memorable passphrases using randomized dictionary words locally in your browser.",
  keywords: toolData?.keywords?.join(", ") || "passphrase generator, diceware generator, correct horse battery staple",
  openGraph: {
    title: toolData?.metaTitle || "Secure Passphrase Generator | UseMil",
    description: toolData?.metaDescription,
    type: "website",
  },
};

export default function PassphrasePage() {
  return <PassphraseClient />;
}