"use client"

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Trophy, Medal, Award, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  nickname: string
  storyCount: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()
        
        if (response.ok) {
          setLeaderboard(data.leaderboard)
        } else {
          setError(data.error || "Liderlik tablosu yüklenirken bir hata oluştu")
        }
      } catch (error) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />
    return <TrendingUp className="h-6 w-6 text-blue-500" />
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300"
    if (rank === 2) return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300"
    if (rank === 3) return "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300"
    return "bg-white border-gray-200"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-600">Liderlik tablosu yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Liderlik Tablosu</h1>
          <p className="text-xl text-gray-600">
            En çok hikaye yazan yazarları keşfet ve onlardan ilham al!
          </p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Henüz hiç hikaye yazılmamış. İlk hikayeyi sen yazarak liderlik tablosuna girebilirsin!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry) => (
              <Card 
                key={entry.rank} 
                className={`rounded-2xl shadow-md transition-all duration-300 hover:scale-105 ${getRankColor(entry.rank)}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.rank)}
                        <span className="font-bold text-gray-700">
                          #{entry.rank}
                        </span>
                      </div>
                      <span className="text-gray-800 font-semibold">
                        {entry.nickname}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {entry.storyCount}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.storyCount === 1 ? "hikaye" : "hikaye"}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        {leaderboard.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-md inline-block">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">İstatistikler</h3>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-600">Toplam Yazıcı</p>
                  <p className="text-2xl font-bold text-primary">{leaderboard.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">En Çok Hikaye</p>
                  <p className="text-2xl font-bold text-primary">{leaderboard[0]?.storyCount || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Motivation */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Sen de Liderlik Tablosuna Gir!
            </h3>
            <p className="text-gray-600">
              Hikaye yazarak puanını artır ve diğer yazarlarla yarış. 
              Hayal gücünü kullanarak harika hikayeler yaz!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
