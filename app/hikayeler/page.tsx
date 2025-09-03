"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StoryCard } from "@/components/StoryCard"
import { getThemeName } from "@/lib/utils"
import { BookOpen, Filter, ChevronLeft, ChevronRight, Sparkles, Ghost, Rocket, Mountain, Leaf, Cloud } from "lucide-react"

const themes = [
  { value: "all", label: "Tüm Temalar", icon: <BookOpen className="h-5 w-5" /> },
  { value: "FANTASTIK", label: "Fantastik", icon: <Sparkles className="h-5 w-5" /> },
  { value: "GIZEM", label: "Gizem", icon: <Ghost className="h-5 w-5" /> },
  { value: "BILIM_KURGU", label: "Bilim Kurgu", icon: <Rocket className="h-5 w-5" /> },
  { value: "MACERA", label: "Macera", icon: <Mountain className="h-5 w-5" /> },
  { value: "SIFIR_ATIK", label: "Sıfır Atık", icon: <Leaf className="h-5 w-5" /> },
  { value: "IKLIM_DEGISIKLIGI", label: "İklim Değişikliği", icon: <Cloud className="h-5 w-5" /> }
]

interface Story {
  id: string
  content: string
  theme: string
  createdAt: string
  user: {
    nickname: string
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [selectedTheme, setSelectedTheme] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchStories = async (page: number = 1, theme: string = selectedTheme) => {
    setIsLoading(true)
    setError("")
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12"
      })
      
      if (theme !== "all") {
        params.append("theme", theme)
      }
      
      const response = await fetch(`/api/stories?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setStories(data.stories)
        setPagination(data.pagination)
      } else {
        setError(data.error || "Hikayeler yüklenirken bir hata oluştu")
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStories(1, selectedTheme)
  }, [selectedTheme])

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme)
  }

  const handlePageChange = (page: number) => {
    fetchStories(page, selectedTheme)
  }

  if (isLoading && stories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-600">Hikayeler yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hikayeler</h1>
          <p className="text-xl text-gray-600">
            Diğer çocukların yazdığı harika hikayeleri oku ve ilham al!
          </p>
        </div>

        {/* Theme Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Tema Filtresi:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {themes.map((theme) => (
              <Button
                key={theme.value}
                variant={selectedTheme === theme.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange(theme.value)}
                className="rounded-2xl h-10 px-4"
              >
                <span className="mr-2">{theme.icon}</span>
                {theme.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <Button 
              onClick={() => fetchStories(1, selectedTheme)} 
              className="mt-4 rounded-2xl"
            >
              Tekrar Dene
            </Button>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {selectedTheme === "all" 
                ? "Henüz hiç hikaye yok. İlk hikayeyi sen yaz!"
                : `${getThemeName(selectedTheme)} temasında henüz hikaye yok.`
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={{
                    ...story,
                    createdAt: new Date(story.createdAt)
                  }}
                  className="h-full"
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Önceki
                </Button>
                
                <span className="px-4 py-2 text-gray-600">
                  Sayfa {pagination.page} / {pagination.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="rounded-2xl"
                >
                  Sonraki
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Stats */}
        {pagination && (
          <div className="text-center mt-12 text-gray-600">
            <p>
              Toplam <span className="font-semibold">{pagination.total}</span> hikaye bulundu
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
