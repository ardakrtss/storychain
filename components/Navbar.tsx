"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/nasil-calisir", label: "Nasıl Çalışır" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500" />
          <span className="text-lg font-semibold">
            <span className="text-pink-600">Story</span>Chain
          </span>
        </Link>

        {/* Middle Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-sm transition-colors",
                pathname === l.href
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
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
  );
}