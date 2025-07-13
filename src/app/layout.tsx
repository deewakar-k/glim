import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "glim",
  description: "a minimal screenshot design tool",
  authors: [{ name: "Deewakar Kumar", url: "https://deewakar.info" }],
  creator: "Deewakar Kumar",
  keywords: [
    // Core Tool Features
    "screenshot tool",
    "screenshot editor",
    "image design tool",
    "image editor online",
    "upload and edit image",
    "image customization tool",
    "screenshot background editor",
    "online screenshot editor",

    // Background Options
    "gradient background maker",
    "solid background generator",
    "custom background editor",
    "background design tool",
    "image background changer",

    // Image Styling Features
    "add drop shadow",
    "image drop shadow editor",
    "adjust border radius",
    "rounded corners tool",
    "padding editor",
    "image inset shadow",
    "image styling tool",

    // Export & Output
    "export screenshot",
    "download image design",
    "save custom screenshot",
    "screenshot export tool",

    // Intent & Use Case
    "web-based image tool",
    "design screenshots online",
    "custom screenshot maker",
    "ui mockup screenshot editor",
    "free screenshot design tool",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glim.deewakar.info",
    title: "glim",
    description: "a minimal screenshot design tool",
    siteName: "glim",
    images: ["/opengraph-img.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "glim",
    description: "a minimal screenshot design tool",
    creator: "@deewakar01",
    images: ["/opengraph-img.png"],
  },
  category: "Design Tool",
  applicationName: "glim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
