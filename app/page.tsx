import Image from "next/image";
import Link from "next/link";

function ThemeCard({
  title,
  desc,
  img,
  btn,
}: {
  title: string;
  desc: string;
  img: string;
  btn: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 shadow-sm bg-white overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
        <button
          className={`mt-4 inline-flex items-center gap-2 text-white text-sm px-3 py-1.5 rounded-full ${btn} hover:opacity-95`}
        >
          Keşfet
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500" />
            <span className="text-lg font-semibold">
              <span className="text-pink-600">Story</span>Chain
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-900 font-medium">
              Ana Sayfa
            </Link>
            <Link href="/nasil-calisir" className="text-sm text-gray-600 hover:text-gray-900">
              Nasıl Çalışır
            </Link>
            <Link href="/hakkimizda" className="text-sm text-gray-600 hover:text-gray-900">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-sm text-gray-600 hover:text-gray-900">
              İletişim
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/giris"
              className="px-3.5 h-9 rounded-md text-sm border border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              Giriş Yap
            </Link>
            <Link
              href="/kayit"
              className="px-3.5 h-9 rounded-md text-sm text-white bg-gradient-to-r from-fuchsia-600 to-violet-600 shadow hover:opacity-95"
            >
              Kaydol
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0">
          {/* En sonda gerçek görselle değiştirilecek */}
          <Image src="/hero.jpg" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            Hayal Gücünü
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              Serbest Bırak!
            </span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-white/90">
            Arkadaşlarınla birlikte sürükleyici hikâyeler yaz, kelime sınırını zorla,
            eğlenceli sürprizlerle hikâyeni tamamla!
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/yaz"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-white" />
              Yazmaya Başla
            </Link>
            <Link
              href="/nasil-calisir"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-white/60 text-white/95 hover:bg-white/10"
            >
              ⓘ Nasıl Çalışır?
            </Link>
          </div>
        </div>
      </section>

      {/* TEMA KEŞFET */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Tema Keşfet</h2>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ThemeCard
            img="/theme-1.jpg"
            title="Macera"
            desc="Heyecan verici keşifler ve cesur kahramanlar"
            btn="bg-rose-500"
          />
          <ThemeCard
            img="/theme-2.jpg"
            title="Gizem"
            desc="Sırlarla dolu gizemli dünyalar"
            btn="bg-violet-500"
          />
          <ThemeCard
            img="/theme-3.jpg"
            title="Fantastik"
            desc="Büyülü yaratıklar ve sihirli maceralar"
            btn="bg-green-500"
          />
          <ThemeCard
            img="/theme-4.jpg"
            title="Bilim Kurgu"
            desc="Uzayda dostluklar ve teknolojik maceralar"
            btn="bg-sky-500"
          />
          <ThemeCard
            img="/theme-5.jpg"
            title="Sıfır Atık"
            desc="Çevre dostu yaşam ve geri dönüşüm maceraları"
            btn="bg-emerald-600"
          />
          <ThemeCard
            img="/theme-6.jpg"
            title="İklim Değişikliği"
            desc="Dünyamızı koruma sorumluluğu ve çevre bilinci"
            btn="bg-green-600"
          />
        </div>
      </section>

      {/* EN ÇOK BEĞENİLENLER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-gradient-to-b from-white to-purple-50/60 py-14 text-center shadow-sm">
          <h3 className="text-3xl font-bold text-gray-900">En Çok Beğenilen Hikâyeler</h3>
          <p className="mt-2 text-gray-600">
            Diğer yazarlarımızın birlikte yarattığı harika hikâyeleri keşfet!
          </p>
          <div className="mt-8">
            <Link
              href="/hikayeler"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-white bg-violet-600 hover:bg-violet-700 shadow text-sm"
            >
              Tüm Hikâyeleri Gör →
            </Link>
          </div>
          <Link href="/liderlik" className="mt-4 inline-flex items-center gap-2 text-violet-700 text-sm">
            ♛ Liderlik Tablosunu Gör
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500" />
            <span className="text-base font-semibold">
              <span className="text-pink-600">Story</span>Chain
            </span>
            <span className="text-sm text-gray-500">2025</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">
              Kullanım Şartları
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Gizlilik Politikası
            </Link>
            <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">
              İletişim
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
