import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: "%s | ফলের রাজা",
    default: "ফলের রাজা - অর্গানিক ফলমুলের সমাহার",
  },
  description: "Direct from the orchards of Rajshahi. Formalin-free, naturally ripened premium mangoes delivered to your door.",
  keywords: ["Mango", "Rajshahi Mango", "Himsagar", "Langra", "Fresh Fruit BD"],
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: "/og-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${dmSans.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
