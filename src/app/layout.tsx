import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HeaderSlot from "@/components/HeaderSlot";

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
          <HeaderSlot />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        {/*
          Stagewise dev toolbar removed from the deployed bundle: a
          NODE_ENV guard still bundled it, producing a 708 KB client chunk --
          larger than the entire rest of the site. The packages remain in
          devDependencies. To use it locally, restore these two imports
          and render <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
          here, then remove them again before committing:
            import { StagewiseToolbar } from "@stagewise/toolbar-next";
            import ReactPlugin from "@stagewise-plugins/react";
        */}
      </body>
    </html>
  );
}
