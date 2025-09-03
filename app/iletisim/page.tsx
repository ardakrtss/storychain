"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "İsim gereklidir"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Konu gereklidir"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj gereklidir"
    } else if (formData.message.length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır"
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

    // Simulate form submission (in real app, this would send to API)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      toast({
        title: "Mesaj Gönderildi!",
        description: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
      })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "E-posta",
      value: "info@storychain.com",
      description: "Genel sorularınız için"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefon",
      value: "+90 (212) 555 0123",
      description: "Acil durumlar için"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adres",
      value: "İstanbul, Türkiye",
      description: "Ana ofis"
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Teşekkürler!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="rounded-2xl"
            >
              Yeni Mesaj Gönder
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin. 
            Size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="h-6 w-6 mr-2" />
                  Mesaj Gönder
                </CardTitle>
                <CardDescription>
                  Aşağıdaki formu doldurarak bizimle iletişime geçin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">İsim</Label>
                      <Input
                        id="name"
                        placeholder="Adınız ve soyadınız"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input
                      id="subject"
                      placeholder="Mesajınızın konusu"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea
                      id="message"
                      placeholder="Mesajınızı buraya yazın..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-2xl h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Gönderiliyor..." : "Mesajı Gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">İletişim Bilgileri</CardTitle>
                <CardDescription>
                  Bizimle iletişime geçmenin farklı yolları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                      <div className="text-primary">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-primary font-medium">{info.value}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Çalışma Saatleri
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Pazartesi - Cuma:</strong> 09:00 - 18:00</p>
                  <p><strong>Cumartesi:</strong> 10:00 - 16:00</p>
                  <p><strong>Pazar:</strong> Kapalı</p>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * Acil durumlar için 7/24 destek hattımız mevcuttur.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Sık Sorulan Sorular
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Q:</strong> Platform ücretsiz mi?</p>
                  <p><strong>A:</strong> Evet, StoryChain tamamen ücretsizdir.</p>
                  
                  <p><strong>Q:</strong> Hangi yaş grubu için uygun?</p>
                  <p><strong>A:</strong> 8-12 yaş arası çocuklar için tasarlanmıştır.</p>
                  
                  <p><strong>Q:</strong> Güvenlik nasıl sağlanıyor?</p>
                  <p><strong>A:</strong> Gelişmiş içerik filtreleme ve moderasyon sistemleri kullanıyoruz.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
