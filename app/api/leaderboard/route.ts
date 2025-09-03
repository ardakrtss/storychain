import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const leaderboard = await db.user.findMany({
      select: {
        nickname: true,
        _count: {
          select: {
            stories: true
          }
        }
      },
      where: {
        stories: {
          some: {
            moderated: true
          }
        }
      },
      orderBy: {
        stories: {
          _count: "desc"
        }
      },
      take: 20
    })

    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      nickname: user.nickname,
      storyCount: user._count.stories
    }))

    return NextResponse.json({
      leaderboard: formattedLeaderboard
    })
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
