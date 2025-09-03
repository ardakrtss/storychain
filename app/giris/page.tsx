"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, User, Lock, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    pin: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Rumuz gereklidir"
    }

    if (!formData.pin) {
      newErrors.pin = "PIN gereklidir"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        nickname: formData.nickname.trim(),
        pin: formData.pin,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Giriş Başarısız",
          description: "Rumuz veya PIN hatalı. Lütfen tekrar deneyin.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Hoş Geldin!",
          description: "Başarıyla giriş yaptınız.",
        })
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">StoryChain'e Hoş Geldin</h1>
          <p className="text-gray-600 mt-2">Hesabına giriş yap ve hikaye yazmaya devam et!</p>
        </div>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            <CardDescription>
              Rumuz ve PIN ile hesabına giriş yap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-base">
                  <User className="h-4 w-4 inline mr-2" />
                  Rumuz
                </Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Rumuzunu girin"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange("nickname", e.target.value)}
                  className={errors.nickname ? "border-red-500" : ""}
                />
                {errors.nickname && (
                  <p className="text-sm text-red-500">{errors.nickname}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin" className="text-base">
                  <Lock className="h-4 w-4 inline mr-2" />
                  PIN
                </Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="PIN'ini girin"
                  value={formData.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value)}
                  className={errors.pin ? "border-red-500" : ""}
                />
                {errors.pin && (
                  <p className="text-sm text-red-500">{errors.pin}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-2xl h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Henüz hesabın yok mu?{" "}
                <Link href="/kayit" className="text-primary hover:underline font-medium">
                  Kayıt ol
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
