import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 shadow-sm" />
          <span className="text-base font-semibold">
            <span className="text-pink-600">Story</span>Chain
          </span>
          <span className="text-sm text-gray-500">2025</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/terms" className="text-gray-600 hover:text-gray-900">Kullanım Şartları</Link>
          <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Gizlilik Politikası</Link>
          <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">İletişim</Link>
        </nav>
      </div>
    </footer>
  );
}
