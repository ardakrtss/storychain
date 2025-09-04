export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server"
import { hash } from "argon2"
import { db } from "@/lib/db"
import { z } from "zod"

const registerSchema = z.object({
  nickname: z.string().min(3).max(20),
  pin: z.string().min(4).max(6).regex(/^\d+$/, "PIN sadece rakamlardan oluşmalıdır")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nickname, pin } = registerSchema.parse(body)

    // Check if nickname already exists
    const existingUser = await db.user.findUnique({
      where: { nickname }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu rumuz zaten kullanılıyor. Lütfen başka bir rumuz seçin." },
        { status: 400 }
      )
    }

    // Hash PIN with Argon2
    const pinHash = await hash(pin, {
      memoryCost: parseInt(process.env.ARGON2_MEMORY || "512"),
      timeCost: parseInt(process.env.ARGON2_ITERATIONS || "2"),
      parallelism: parseInt(process.env.ARGON2_PARALLELISM || "1")
    })

    // Create user
    const user = await db.user.create({
      data: {
        nickname,
        pinHash
      }
    })

    return NextResponse.json(
      { 
        message: "Kullanıcı başarıyla oluşturuldu",
        userId: user.id 
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

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
