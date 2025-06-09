import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "ImageGenAI",
  description: "ImageGenAI - Generate a photo using AI technology.",
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
      </body>
    </html>
    </ClerkProvider>
  );
}
