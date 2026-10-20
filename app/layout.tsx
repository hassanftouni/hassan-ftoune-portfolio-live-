import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code" });

const description =
  "Hassan Ftouni is a software engineer in Beirut building web apps with Laravel, Django and React, and AI applications with RAG.";

export const metadata: Metadata = {
  title: "Hassan Ftouni — Software engineer",
  description,
  authors: [{ name: "Hassan Ftouni" }],
  creator: "Hassan Ftouni",
  metadataBase: new URL("https://hassanftouni.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hassanftouni.me",
    siteName: "Hassan Ftouni",
    title: "Hassan Ftouni — Software engineer",
    description,
    images: [{ url: "/hassanpro.jpeg", width: 1254, height: 1254, alt: "Hassan Ftouni" }],
  },
  twitter: {
    card: "summary",
    title: "Hassan Ftouni — Software engineer",
    description,
    images: ["/hassanpro.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
