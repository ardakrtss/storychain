import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "StoryChain",
  description: "Birlikte hikâye yazma platformu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-gradient-to-b from-white to-violet-50/40 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
