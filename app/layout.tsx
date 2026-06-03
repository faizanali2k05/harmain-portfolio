import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmain Ali | Direct Response Video Editor",
  description:
    "Direct response video editor creating high-converting ads with strategic storytelling, AI-powered workflows, and modern editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
