"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { BookOpen, User, LogOut } from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">StoryChain</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/nasil-calisir" className="text-gray-700 hover:text-primary transition-colors">
              Nasıl Çalışır
            </Link>
            <Link href="/hikayeler" className="text-gray-700 hover:text-primary transition-colors">
              Hikayeler
            </Link>
            <Link href="/liderlik" className="text-gray-700 hover:text-primary transition-colors">
              Liderlik
            </Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-primary transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-gray-700 hover:text-primary transition-colors">
              İletişim
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Merhaba, <span className="font-semibold">{session.user.nickname}</span>!
                </span>
                <Link href="/hikaye-yaz">
                  <Button size="sm" className="rounded-2xl">
                    Hikaye Yaz
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="rounded-2xl"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/giris">
                  <Button variant="outline" size="sm" className="rounded-2xl">
                    <User className="h-4 w-4 mr-2" />
                    Giriş
                  </Button>
                </Link>
                <Link href="/kayit">
                  <Button size="sm" className="rounded-2xl">
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
