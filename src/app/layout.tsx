import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import PageTransition from "@/components/common/PageTransition";

export const metadata: Metadata = {
  title: "Melody — Farm-to-Consumer Marketplace",
  description:
    "Fresh organic produce directly from verified farms to your doorstep. Zero middlemen, 100% transparent supply chain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background">
        <StoreProvider>
          <main className="flex-1 flex flex-col relative overflow-x-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
