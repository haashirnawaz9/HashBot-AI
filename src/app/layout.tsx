import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "HashBot AI",
  description: "HashBot AI - Use AI technology to generate images or chat to AI for help.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
