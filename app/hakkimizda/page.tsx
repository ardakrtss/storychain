import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Heart, Shield, Users, Target, Award } from "lucide-react"

const values = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Çocuk Odaklı",
    description: "Her özellik 8-12 yaş arası çocukların ihtiyaçları göz önünde bulundurularak tasarlandı."
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Güvenlik Öncelikli",
    description: "Çocukların güvenliği için gelişmiş içerik filtreleme ve moderasyon sistemleri kullanıyoruz."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Topluluk Ruhu",
    description: "Çocukların birbirlerinden öğrenmesini ve yaratıcılıklarını paylaşmasını teşvik ediyoruz."
  },
  {
    icon: <Target className="h-8 w-8 text-purple-500" />,
    title: "Eğitici Amaç",
    description: "Hikaye yazma ile okuma-yazma becerilerini ve yaratıcı düşünmeyi geliştiriyoruz."
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    title: "Kalite Odaklı",
    description: "Sürekli iyileştirme ve kullanıcı geri bildirimleri ile platformu geliştiriyoruz."
  }
]

const team = [
  {
    name: "Geliştirici Ekibi",
    role: "Teknik Geliştirme",
    description: "Next.js, TypeScript ve modern web teknolojileri ile güvenli ve hızlı platform geliştirme."
  },
  {
    name: "Tasarım Ekibi",
    role: "UX/UI Tasarım",
    description: "Çocuklar için özel olarak tasarlanmış kullanıcı deneyimi ve arayüz tasarımı."
  },
  {
    name: "İçerik Ekibi",
    role: "Eğitici İçerik",
    description: "Çocukların gelişimine katkı sağlayacak tema ve içerik yönetimi."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            StoryChain, çocukların hayal gücünü serbest bırakarak yaratıcı hikayeler yazabileceği 
            güvenli ve eğitici bir platformdur.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-primary to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Misyonumuz</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Çocukların yaratıcılığını geliştirmek, okuma-yazma becerilerini artırmak ve 
                güvenli bir dijital ortamda hayallerini paylaşmalarını sağlamak.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vision */}
        <div className="mb-16">
          <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Vizyonumuz</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Türkiye'nin en güvenilir ve sevilen çocuk hikaye yazma platformu olmak, 
                geleceğin yaratıcı yazarlarını yetiştirmek.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl mb-3">{value.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Ekibimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                Hikayemiz
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  StoryChain, 2024 yılında çocukların dijital dünyada güvenli ve yaratıcı bir şekilde 
                  vakit geçirebilmeleri için tasarlandı. Modern teknolojiler kullanarak, 
                  çocukların hayal gücünü serbest bırakabilecekleri bir platform oluşturduk.
                </p>
                <p className="mb-4">
                  Platformumuz, çocukların okuma-yazma becerilerini geliştirmelerine, 
                  yaratıcı düşünmelerine ve diğer çocuklarla etkileşim kurmalarına olanak sağlar. 
                  Güvenlik her zaman önceliğimiz olmuştur ve gelişmiş içerik filtreleme sistemleri 
                  kullanarak çocukların güvenliğini garanti altına alıyoruz.
                </p>
                <p>
                  Bugün, StoryChain Türkiye'de binlerce çocuğun hayallerini paylaştığı, 
                  yaratıcılığını geliştirdiği ve yeni arkadaşlar edindiği bir platform haline geldi. 
                  Gelecekte daha da büyümeyi ve daha fazla çocuğa ulaşmayı hedefliyoruz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div className="text-center">
          <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bizimle İletişime Geçin
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="bg-white rounded-2xl p-6 inline-block">
                <p className="text-gray-700">
                  <strong>E-posta:</strong> info@storychain.com
                </p>
                <p className="text-gray-700">
                  <strong>Adres:</strong> İstanbul, Türkiye
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
