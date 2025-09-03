"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { getThemeName } from "@/lib/utils"
import { BookOpen, PenTool, Sparkles, Ghost, Rocket, Mountain, Leaf, Cloud, ArrowLeft } from "lucide-react"

const themes = [
  { value: "FANTASTIK", label: "Fantastik", icon: <Sparkles className="h-5 w-5" /> },
  { value: "GIZEM", label: "Gizem", icon: <Ghost className="h-5 w-5" /> },
  { value: "BILIM_KURGU", label: "Bilim Kurgu", icon: <Rocket className="h-5 w-5" /> },
  { value: "MACERA", label: "Macera", icon: <Mountain className="h-5 w-5" /> },
  { value: "SIFIR_ATIK", label: "Sıfır Atık", icon: <Leaf className="h-5 w-5" /> },
  { value: "IKLIM_DEGISIKLIGI", label: "İklim Değişikliği", icon: <Cloud className="h-5 w-5" /> }
]

export default function WriteStoryPage() {
  const [formData, setFormData] = useState({
    theme: "",
    content: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.theme) {
      newErrors.theme = "Lütfen bir tema seçin"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Hikaye içeriği gereklidir"
    } else if (formData.content.length < 10) {
      newErrors.content = "Hikaye en az 10 karakter olmalıdır"
    } else if (formData.content.length > 5000) {
      newErrors.content = "Hikaye en fazla 5000 karakter olabilir"
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
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: formData.theme,
          content: formData.content.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Harika!",
          description: "Hikayen başarıyla paylaşıldı!",
        })
        router.push("/hikayeler")
      } else {
        toast({
          title: "Hata!",
          description: data.error || "Hikaye paylaşılırken bir hata oluştu.",
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

  const selectedTheme = themes.find(t => t.value === formData.theme)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yeni Hikaye Yaz</h1>
            <p className="text-xl text-gray-600">
              Hayal gücünü kullanarak harika bir hikaye yaz!
            </p>
          </div>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <PenTool className="h-6 w-6 mr-2" />
                Hikaye Detayları
              </CardTitle>
              <CardDescription>
                Tema seç ve hikayeni yazmaya başla
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-base font-medium">
                    Hikaye Teması
                  </Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => handleInputChange("theme", value)}
                  >
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue placeholder="Bir tema seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center space-x-2">
                            {theme.icon}
                            <span>{theme.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.theme && (
                    <p className="text-sm text-red-500">{errors.theme}</p>
                  )}
                </div>

                {selectedTheme && (
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      {selectedTheme.icon}
                      <span className="font-medium text-blue-900">
                        {selectedTheme.label} Teması
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Bu tema hakkında düşüncelerini ve hayallerini paylaş!
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base font-medium">
                    Hikaye İçeriği
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Hikayeni buraya yaz... Hayal gücünü serbest bırak!"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className={`min-h-[300px] rounded-2xl text-base ${errors.content ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.content && (
                      <p className="text-sm text-red-500">{errors.content}</p>
                    )}
                    <p className="text-sm text-gray-500 ml-auto">
                      {formData.content.length}/5000 karakter
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="rounded-2xl h-12 flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Geri Dön
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-2xl h-12 flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Paylaşılıyor..." : "Hikayeyi Paylaş"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Diğer çocukların hikayelerini okumak ister misin?{" "}
              <Button
                variant="link"
                onClick={() => router.push("/hikayeler")}
                className="p-0 h-auto text-primary hover:underline font-medium"
              >
                Hikayeleri görüntüle
              </Button>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
