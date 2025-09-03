# StoryChain - Çocuklar için Hikaye Yazma Platformu

StoryChain, 8-12 yaş arası çocukların hayal gücünü serbest bırakarak yaratıcı hikayeler yazabileceği güvenli ve eğitici bir web uygulamasıdır.

## 🚀 Özellikler

- **6 Farklı Tema**: Fantastik, Gizem, Bilim Kurgu, Macera, Sıfır Atık, İklim Değişikliği
- **Güvenli Kimlik Doğrulama**: Rumuz + PIN sistemi (Argon2 hash)
- **İçerik Filtresi**: Otomatik uygunsuz içerik filtreleme
- **Rate Limiting**: Redis tabanlı hikaye paylaşım sınırlaması
- **Liderlik Tablosu**: En çok hikaye yazan yazarlar
- **Çocuk Dostu UI**: Pastel renkler, büyük butonlar, yuvarlak köşeler
- **Türkçe Arayüz**: Tamamen Türkçe kullanıcı deneyimi

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js v5 (Credentials Provider)
- **Caching & Rate Limiting**: Redis
- **Password Hashing**: Argon2
- **Content Filtering**: Custom Turkish/English filter

## 📋 Gereksinimler

- Node.js 18+ 
- PostgreSQL 12+
- Redis 6+
- npm veya yarn

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd StoryChain
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env` dosyasını oluşturun:

```bash
cp env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/storychain"

# Redis
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Argon2 Configuration
ARGON2_MEMORY=512
ARGON2_ITERATIONS=2
ARGON2_PARALLELISM=1

# PIN Configuration
PIN_MIN=4
PIN_MAX=6

# App Configuration
APP_NAME="StoryChain"

# Rate Limiting
RATE_LIMIT_WINDOW=10
RATE_LIMIT_MAX=3
```

### 4. Veritabanını Hazırlayın

```bash
# Prisma client'ı oluşturun
npm run prisma:generate

# Veritabanı migration'larını çalıştırın
npm run prisma:migrate

# (Opsiyonel) Prisma Studio'yu açın
npm run prisma:studio
```

### 5. Uygulamayı Çalıştırın

```bash
# Geliştirme modunda çalıştırın
npm run dev

# veya production build
npm run build
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 📁 Proje Yapısı

```
StoryChain/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer
│   ├── ThemeCard.tsx      # Theme selection card
│   ├── StoryCard.tsx      # Story display card
│   └── ProtectedRoute.tsx # Authentication guard
├── lib/                    # Utility functions
│   ├── auth.ts            # NextAuth configuration
│   ├── db.ts              # Prisma client
│   ├── rateLimit.ts       # Redis rate limiting
│   ├── filter.ts          # Content filtering
│   └── utils.ts           # Helper functions
├── hooks/                  # Custom React hooks
├── prisma/                 # Database schema
└── public/                 # Static assets
```

## 🔐 Kimlik Doğrulama

- **Kayıt**: Benzersiz rumuz + 4-6 haneli PIN
- **Giriş**: Rumuz + PIN
- **Güvenlik**: Argon2 ile PIN hash'leme
- **Session**: JWT tabanlı oturum yönetimi

## 📊 API Endpoints

- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/stories` - Hikaye oluşturma (rate limited)
- `GET /api/stories` - Hikaye listesi (pagination + filtering)
- `GET /api/leaderboard` - Liderlik tablosu

## 🎨 Tasarım Sistemi

- **Renkler**: Pastel tonlar, tema bazlı renkler
- **Tipografi**: Inter font ailesi
- **Bileşenler**: shadcn/ui + custom components
- **Responsive**: Mobile-first tasarım
- **Erişilebilirlik**: ARIA labels, focus states

## 🚀 Production Deployment

### Docker (Önerilen)

```bash
# Docker image oluşturun
docker build -t storychain .

# Container çalıştırın
docker run -p 3000:3000 storychain
```

### Manuel Deployment

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🔧 Geliştirme

### Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run prisma:generate  # Prisma client
npm run prisma:migrate   # Database migrations
npm run prisma:studio    # Database GUI
```

### Code Style

- TypeScript strict mode
- ESLint + Next.js config
- Prettier formatting
- Component-based architecture

## 📝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 İletişim

- **Proje**: StoryChain
- **Hedef Kitle**: 8-12 yaş arası çocuklar
- **Dil**: Türkçe
- **Platform**: Web (responsive)

## 🙏 Teşekkürler

- Next.js ekibine
- shadcn/ui topluluğuna
- Prisma ekibine
- Tüm açık kaynak katkıda bulunanlara

---

**Not**: Bu uygulama çocuklar için tasarlanmıştır. Güvenlik ve içerik filtreleme öncelikli konulardır.
