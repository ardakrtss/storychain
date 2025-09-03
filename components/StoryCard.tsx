import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getThemeColor, getThemeName, formatDate, truncateText } from "@/lib/utils"
import { User, Calendar, MessageSquare } from "lucide-react"

interface StoryCardProps {
  story: {
    id: string
    content: string
    theme: string
    createdAt: Date
    user: {
      nickname: string
    }
  }
  onClick?: () => void
  className?: string
}

export function StoryCard({ story, onClick, className }: StoryCardProps) {
  const themeColor = getThemeColor(story.theme)
  const themeName = getThemeName(story.theme)

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      <CardHeader className={`${themeColor} text-white rounded-t-2xl`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{themeName}</CardTitle>
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4" />
            <span>{story.user.nickname}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="text-gray-700 text-base leading-relaxed mb-4">
          {truncateText(story.content, 200)}
        </CardDescription>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(story.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Hikaye</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
