import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HeaderSlot, { HeaderSpacer } from "@/components/HeaderSlot";

// Both faces self-host as single variable woff2 files via next/font — the
// render-blocking fonts.googleapis.com @import is gone (audit P1-7). globals.css
// resolves --font-body / --font-display against these variables.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kmspantherband.org"),
  title: {
    default: "KMS Panther Band",
    template: "%s | KMS Panther Band",
  },
  description:
    "The C.E. King Middle School Panther Band — over 250 students strong, no experience necessary. Excellence From Within.",
  openGraph: {
    siteName: "KMS Panther Band",
    type: "website",
    images: [
      {
        url: "/images/hero-image.jpg",
        width: 1600,
        height: 900,
        alt: "KMS Panther Band students performing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <HeaderSlot />
          <main className="flex-grow">
            {/* Inside <main> on purpose — see the note in HeaderSlot.tsx. */}
            <HeaderSpacer />
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
