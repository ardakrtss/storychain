import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeCard } from "@/components/ThemeCard"
import { StoryCard } from "@/components/StoryCard"
import { BookOpen, Sparkles, Ghost, Rocket, Mountain, Leaf, Cloud, ArrowRight } from "lucide-react"

const themes = [
  {
    theme: "FANTASTIK",
    description: "Sihirli dünyalar, büyülü yaratıklar ve olağanüstü maceralar. Hayal gücünün sınırlarını zorla!",
    icon: <Sparkles className="h-8 w-8" />
  },
  {
    theme: "GIZEM",
    description: "Gizemli olaylar, şifreli mesajlar ve çözülmeyi bekleyen sırlar. Dedektif ol ve gizemi çöz!",
    icon: <Ghost className="h-8 w-8" />
  },
  {
    theme: "BILIM_KURGU",
    description: "Gelecekteki teknolojiler, uzay yolculukları ve bilimsel keşifler. Geleceği hayal et!",
    icon: <Rocket className="h-8 w-8" />
  },
  {
    theme: "MACERA",
    description: "Tehlikeli yolculuklar, cesur kahramanlar ve heyecan dolu anlar. Maceraya atıl!",
    icon: <Mountain className="h-8 w-8" />
  },
  {
    theme: "SIFIR_ATIK",
    description: "Çevre dostu çözümler, sürdürülebilir yaşam ve doğayı koruma. Gezegeni kurtar!",
    icon: <Leaf className="h-8 w-8" />
  },
  {
    theme: "IKLIM_DEGISIKLIGI",
    description: "İklim sorunları, çevre bilinci ve gelecek için umut. Dünyayı değiştir!",
    icon: <Cloud className="h-8 w-8" />
  }
]

// Mock data for recent stories - in real app, this would come from API
const recentStories = [
  {
    id: "1",
    content: "Bir zamanlar, uzak bir galakside yaşayan küçük bir robot vardı. Bu robot, insanlar gibi duygulara sahip olmak istiyordu...",
    theme: "BILIM_KURGU",
    createdAt: new Date("2024-01-15"),
    user: { nickname: "YıldızAvcısı" }
  },
  {
    id: "2",
    content: "Ormanın derinliklerinde, hiç kimsenin gitmediği bir yerde, gizli bir hazine saklanıyordu. Bu hazineyi bulmak için...",
    theme: "MACERA",
    createdAt: new Date("2024-01-14"),
    user: { nickname: "MaceraPerest" }
  },
  {
    id: "3",
    content: "Küçük bir kasabada, her gece yarısı garip sesler duyuluyordu. Kimse bu seslerin nereden geldiğini bilmiyordu...",
    theme: "GIZEM",
    createdAt: new Date("2024-01-13"),
    user: { nickname: "GizemAvcısı" }
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <BookOpen className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hayal Gücünü Serbest Bırak
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              StoryChain ile kendi hikayelerini yaz, diğer çocukların hikayelerini oku ve 
              yaratıcılığını geliştir. Güvenli ve eğitici bir platformda hayallerini paylaş!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kayit">
                <Button size="xl" className="rounded-2xl">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/nasil-calisir">
                <Button variant="outline" size="xl" className="rounded-2xl">
                  Nasıl Çalışır?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hikaye Temaları
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İstediğin temayı seç ve hayal gücünü kullanarak harika hikayeler yaz!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.theme}
                theme={theme.theme}
                description={theme.description}
                icon={theme.icon}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Son Hikayeler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diğer çocukların yazdığı harika hikayeleri oku ve ilham al!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                className="h-full"
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/hikayeler">
              <Button size="lg" className="rounded-2xl">
                Tüm Hikayeleri Gör
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Hikaye Yazmaya Hazır mısın?
          </h2>
          <p className="text-xl text-primary-foreground mb-8">
            Hemen ücretsiz hesap oluştur ve hayal gücünü kullanarak harika hikayeler yazmaya başla!
          </p>
          <Link href="/kayit">
            <Button size="xl" variant="secondary" className="rounded-2xl">
              Ücretsiz Kayıt Ol
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
