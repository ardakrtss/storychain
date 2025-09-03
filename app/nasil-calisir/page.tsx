import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, UserPlus, PenTool, BookOpenCheck, Trophy, Users, Shield, Heart } from "lucide-react"

const steps = [
  {
    icon: <UserPlus className="h-12 w-12 text-primary" />,
    title: "1. Hesap Oluştur",
    description: "Ücretsiz hesap oluştur ve benzersiz bir rumuz seç. 4-6 haneli PIN ile güvenli giriş yap.",
    color: "from-blue-100 to-blue-200"
  },
  {
    icon: <PenTool className="h-12 w-12 text-green-600" />,
    title: "2. Tema Seç ve Yaz",
    description: "6 farklı temadan birini seç: Fantastik, Gizem, Bilim Kurgu, Macera, Sıfır Atık veya İklim Değişikliği.",
    color: "from-green-100 to-green-200"
  },
  {
    icon: <BookOpenCheck className="h-12 w-12 text-purple-600" />,
    title: "3. Hikayeni Paylaş",
    description: "Hayal gücünü kullanarak hikayeni yaz ve güvenli bir şekilde paylaş. İçerik filtresi ile uygun olmayan kelimeler otomatik olarak filtrelenir.",
    color: "from-purple-100 to-purple-200"
  },
  {
    icon: <Users className="h-12 w-12 text-orange-600" />,
    title: "4. Diğer Hikayeleri Oku",
    description: "Diğer çocukların yazdığı harika hikayeleri oku, ilham al ve yeni arkadaşlar edin.",
    color: "from-orange-100 to-orange-200"
  },
  {
    icon: <Trophy className="h-12 w-12 text-yellow-600" />,
    title: "5. Liderlik Tablosuna Gir",
    description: "Ne kadar çok hikaye yazarsan, liderlik tablosunda o kadar yükseğe çıkarsın. Diğer yazarlarla yarış!",
    color: "from-yellow-100 to-yellow-200"
  }
]

const features = [
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: "Güvenli Platform",
    description: "Çocuklar için özel olarak tasarlanmış güvenli ortam. İçerik filtresi ve moderasyon sistemi ile korunuyor."
  },
  {
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: "Çocuk Dostu",
    description: "8-12 yaş arası çocuklar için özel olarak tasarlanmış arayüz ve kullanım deneyimi."
  },
  {
    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
    title: "Eğitici İçerik",
    description: "Farklı temalar ile çocukların yaratıcılığını geliştirir ve okuma-yazma becerilerini artırır."
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            StoryChain Nasıl Çalışır?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            StoryChain, çocukların hayal gücünü serbest bırakarak yaratıcı hikayeler yazabileceği 
            güvenli ve eğitici bir platformdur. İşte nasıl kullanacağın:
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className={`bg-gradient-to-br ${step.color} rounded-t-2xl text-center`}>
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl text-gray-800">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Neden StoryChain?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Theme Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Hikaye Temaları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="bg-theme-fantastik text-white rounded-t-2xl">
                <CardTitle className="text-lg">Fantastik</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">Sihirli dünyalar, büyülü yaratıklar ve olağanüstü maceralar</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="bg-theme-gizem text-white rounded-t-2xl">
                <CardTitle className="text-lg">Gizem</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">Gizemli olaylar, şifreli mesajlar ve çözülmeyi bekleyen sırlar</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="bg-theme-bilim text-white rounded-t-2xl">
                <CardTitle className="text-lg">Bilim Kurgu</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">Gelecekteki teknolojiler, uzay yolculukları ve bilimsel keşifler</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="bg-theme-macera text-white rounded-t-2xl">
                <CardTitle className="text-lg">Macera</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">Tehlikeli yolculuklar, cesur kahramanlar ve heyecan dolu anlar</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="bg-theme-sifir text-white rounded-t-2xl">
                <CardTitle className="text-lg">Sıfır Atık</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">Çevre dostu çözümler, sürdürülebilir yaşam ve doğayı koruma</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="bg-theme-iklim text-white rounded-t-2xl">
                <CardTitle className="text-lg">İklim Değişikliği</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">İklim sorunları, çevre bilinci ve gelecek için umut</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Hikaye Yazmaya Hazır mısın?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Hemen ücretsiz hesap oluştur ve hayal gücünü kullanarak harika hikayeler yazmaya başla!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kayit">
                <Button size="lg" variant="secondary" className="rounded-2xl">
                  Ücretsiz Kayıt Ol
                </Button>
              </Link>
              <Link href="/hikayeler">
                <Button size="lg" variant="outline" className="rounded-2xl border-white text-white hover:bg-white hover:text-primary">
                  Hikayeleri Görüntüle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
