"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Lock } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const sessionData = useSession()
  const { data: session, status } = sessionData || { data: null, status: "loading" }
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/giris")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erişim Kısıtlı</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/giris")} 
              className="w-full rounded-2xl"
            >
              Giriş Yap
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push("/kayit")} 
              className="w-full rounded-2xl"
            >
              Kayıt Ol
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
