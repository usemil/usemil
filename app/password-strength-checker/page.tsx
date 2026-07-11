import { Metadata } from "next";
import { tools } from "@/data/tools";
import PasswordStrengthClient from "./PasswordStrengthClient";

// Ensure the slug matches what you have in your data/tools.ts array
const toolData = tools.find((t) => t.slug === "/password-strength-checker");

export const metadata: Metadata = {
  title: toolData?.metaTitle || "Password Strength Checker | UseMil",
  description: toolData?.metaDescription || "Instantly evaluate password entropy and complexity without sending data to a server.",
  keywords: toolData?.keywords?.join(", ") || "password strength checker, password tester, secure password check",
  openGraph: {
    title: toolData?.metaTitle || "Password Strength Checker | UseMil",
    description: toolData?.metaDescription || "Instantly evaluate password entropy and complexity without sending data to a server.",
    type: "website",
  },
};

export default function PasswordStrengthPage() {
  return <PasswordStrengthClient />;
}