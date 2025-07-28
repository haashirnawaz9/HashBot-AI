import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutWrapper from "@/components/ui/layout-wrapper";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
