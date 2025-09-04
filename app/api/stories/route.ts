export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { rateLimit } from "@/lib/rateLimit"
import { validateContent } from "@/lib/filter"
import { z } from "zod"

const createStorySchema = z.object({
  theme: z.enum(["FANTASTIK", "GIZEM", "BILIM_KURGU", "MACERA", "SIFIR_ATIK", "IKLIM_DEGISIKLIGI"]),
  content: z.string().min(10).max(5000)
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.nickname) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekmektedir" },
        { status: 401 }
      )
    }

    // Rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const rateLimitResult = await rateLimit(
      ip,
      parseInt(process.env.RATE_LIMIT_WINDOW || "10"),
      parseInt(process.env.RATE_LIMIT_MAX || "3")
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: `Çok hızlı hikaye paylaşıyorsunuz. Lütfen ${process.env.RATE_LIMIT_WINDOW || 10} saniye bekleyin.`,
          remaining: rateLimitResult.remaining
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { theme, content } = createStorySchema.parse(body)

    // Content validation and filtering
    const validation = validateContent(content)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 422 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { nickname: session.user.nickname }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      )
    }

    // Create story
    const story = await db.story.create({
      data: {
        userId: user.id,
        theme,
        content: content.trim()
      },
      include: {
        user: {
          select: {
            nickname: true
          }
        }
      }
    })

    return NextResponse.json(
      { 
        message: "Hikaye başarıyla oluşturuldu",
        story 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri formatı" },
        { status: 400 }
      )
    }

    console.error("Create story error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const theme = searchParams.get("theme")
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { moderated: true }
    if (theme && theme !== "all") {
      where.theme = theme
    }

    // Get stories with pagination
    const [stories, total] = await Promise.all([
      db.story.findMany({
        where,
        include: {
          user: {
            select: {
              nickname: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        },
        skip,
        take: limit
      }),
      db.story.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      stories,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error("Get stories error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
