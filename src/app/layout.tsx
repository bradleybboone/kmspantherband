import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KMS Panther Band",
  description: "C.E. King Middle School Band - Excellence From Within",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header is rendered inside each page component for variant control */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      </body>
    </html>
  );
}
