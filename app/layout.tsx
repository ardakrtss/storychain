import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/SessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StoryChain - Hayal Gücünü Serbest Bırak",
  description: "Çocukların yaratıcı hikayeler yazabileceği güvenli ve eğitici platform. Fantastik, gizem, bilim kurgu, macera, sıfır atık ve iklim değişikliği temalarında hikayeler yazın.",
  keywords: ["hikaye", "çocuk", "yaratıcılık", "eğitim", "yazma", "fantastik", "macera"],
  authors: [{ name: "StoryChain Team" }],
  openGraph: {
    title: "StoryChain - Hayal Gücünü Serbest Bırak",
    description: "Çocukların yaratıcı hikayeler yazabileceği güvenli ve eğitici platform.",
    type: "website",
    locale: "tr_TR",
    siteName: "StoryChain",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoryChain - Hayal Gücünü Serbest Bırak",
    description: "Çocukların yaratıcı hikayeler yazabileceği güvenli ve eğitici platform.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
