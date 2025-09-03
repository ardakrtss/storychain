import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">StoryChain</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Çocukların hayal gücünü serbest bırakarak, yaratıcı hikayeler yazmalarını sağlayan 
              güvenli ve eğitici bir platform.
            </p>
            <div className="flex space-x-4">
              <Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-primary transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="text-gray-500 hover:text-primary transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/kvkk" className="text-gray-500 hover:text-primary transition-colors">
                KVKK
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nasil-calisir" className="text-gray-600 hover:text-primary transition-colors">
                  Nasıl Çalışır
                </Link>
              </li>
              <li>
                <Link href="/hikayeler" className="text-gray-600 hover:text-primary transition-colors">
                  Hikayeler
                </Link>
              </li>
              <li>
                <Link href="/liderlik" className="text-gray-600 hover:text-primary transition-colors">
                  Liderlik Tablosu
                </Link>
              </li>
              <li>
                <Link href="/proje-ozeti" className="text-gray-600 hover:text-primary transition-colors">
                  Proje Özeti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-gray-600 hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-600 hover:text-primary transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} StoryChain. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
