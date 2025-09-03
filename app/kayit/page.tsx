"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, User, Lock, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    pin: "",
    confirmPin: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Rumuz gereklidir"
    } else if (formData.nickname.length < 3) {
      newErrors.nickname = "Rumuz en az 3 karakter olmalıdır"
    } else if (formData.nickname.length > 20) {
      newErrors.nickname = "Rumuz en fazla 20 karakter olabilir"
    }

    if (!formData.pin) {
      newErrors.pin = "PIN gereklidir"
    } else if (formData.pin.length < 4) {
      newErrors.pin = "PIN en az 4 haneli olmalıdır"
    } else if (formData.pin.length > 6) {
      newErrors.pin = "PIN en fazla 6 haneli olabilir"
    } else if (!/^\d+$/.test(formData.pin)) {
      newErrors.pin = "PIN sadece rakamlardan oluşmalıdır"
    }

    if (formData.pin !== formData.confirmPin) {
      newErrors.confirmPin = "PIN'ler eşleşmiyor"
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: formData.nickname.trim(),
          pin: formData.pin,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Başarılı!",
          description: "Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.",
        })
        router.push("/giris")
      } else {
        toast({
          title: "Hata!",
          description: data.error || "Kayıt sırasında bir hata oluştu.",
          variant: "destructive",
        })
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
          <h1 className="text-3xl font-bold text-gray-900">StoryChain'e Katıl</h1>
          <p className="text-gray-600 mt-2">Hayal gücünü serbest bırak ve hikayeler yaz!</p>
        </div>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Hesap Oluştur</CardTitle>
            <CardDescription>
              Ücretsiz hesap oluştur ve hikaye yazmaya başla
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
                  placeholder="Benzersiz bir rumuz seç"
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
                  PIN (4-6 haneli)
                </Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="4-6 haneli PIN girin"
                  value={formData.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value)}
                  className={errors.pin ? "border-red-500" : ""}
                />
                {errors.pin && (
                  <p className="text-sm text-red-500">{errors.pin}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPin" className="text-base">
                  <Lock className="h-4 w-4 inline mr-2" />
                  PIN Tekrar
                </Label>
                <Input
                  id="confirmPin"
                  type="password"
                  placeholder="PIN'i tekrar girin"
                  value={formData.confirmPin}
                  onChange={(e) => handleInputChange("confirmPin", e.target.value)}
                  className={errors.confirmPin ? "border-red-500" : ""}
                />
                {errors.confirmPin && (
                  <p className="text-sm text-red-500">{errors.confirmPin}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-2xl h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Oluşturuluyor..." : "Hesap Oluştur"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Zaten hesabın var mı?{" "}
                <Link href="/giris" className="text-primary hover:underline font-medium">
                  Giriş yap
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
