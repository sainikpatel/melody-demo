import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import DemoRoleBar from "@/components/common/DemoRoleBar";
import PageTransition from "@/components/common/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melody - Farm-to-Consumer Demo",
  description: "Interactive demo for Melody marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pt-14 bg-slate-50">
        <StoreProvider>
          <DemoRoleBar />
          <main className="flex-1 flex flex-col relative overflow-x-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}

