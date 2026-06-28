import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans", // optional
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ai Content Writer",
    default: "Ai Content Writer | Generate Ai Content",
  },
  description:
    "Direct from the orchards of Rajshahi. Formalin-free, naturally ripened premium mangoes delivered to your door.",
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
        className={`${openSans.className} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
