import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import BackToTop from "@/components/BackToTop"; // 1. Import the component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UseMil | Fast, Free Online Tools",
  description: "Fast, free online tools that run directly in your browser. Privacy first, no accounts required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-[#F2F3F3] text-gray-900 antialiased`}>
        <Header />
        <main className="flex-grow">
          {children}
          <GoogleAnalytics gaId="G-LJE2QSGKRE" />
        </main>
        <Footer />
        <BackToTop /> {/* 2. Add it here */}
      </body>
    </html>
  );
}