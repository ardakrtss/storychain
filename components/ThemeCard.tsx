import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getThemeColor, getThemeName } from "@/lib/utils"
import { Sparkles, Ghost, Rocket, Mountain, Leaf, Cloud } from "lucide-react"

interface ThemeCardProps {
  theme: string
  description: string
  icon: React.ReactNode
  onClick?: () => void
  className?: string
}

const themeIcons: Record<string, React.ReactNode> = {
  'FANTASTIK': <Sparkles className="h-8 w-8" />,
  'GIZEM': <Ghost className="h-8 w-8" />,
  'BILIM_KURGU': <Rocket className="h-8 w-8" />,
  'MACERA': <Mountain className="h-8 w-8" />,
  'SIFIR_ATIK': <Leaf className="h-8 w-8" />,
  'IKLIM_DEGISIKLIGI': <Cloud className="h-8 w-8" />
}

export function ThemeCard({ theme, description, onClick, className }: ThemeCardProps) {
  const themeColor = getThemeColor(theme)
  const themeName = getThemeName(theme)
  const icon = themeIcons[theme] || <Sparkles className="h-8 w-8" />

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      <CardHeader className={`${themeColor} text-white rounded-t-2xl`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{themeName}</CardTitle>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="text-gray-600 text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
