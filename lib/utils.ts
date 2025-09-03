import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getThemeColor(theme: string): string {
  const themeColors: Record<string, string> = {
    'FANTASTIK': 'bg-theme-fantastik',
    'GIZEM': 'bg-theme-gizem',
    'BILIM_KURGU': 'bg-theme-bilim',
    'MACERA': 'bg-theme-macera',
    'SIFIR_ATIK': 'bg-theme-sifir',
    'IKLIM_DEGISIKLIGI': 'bg-theme-iklim'
  }
  return themeColors[theme] || 'bg-gray-500'
}

export function getThemeName(theme: string): string {
  const themeNames: Record<string, string> = {
    'FANTASTIK': 'Fantastik',
    'GIZEM': 'Gizem',
    'BILIM_KURGU': 'Bilim Kurgu',
    'MACERA': 'Macera',
    'SIFIR_ATIK': 'Sıfır Atık',
    'IKLIM_DEGISIKLIGI': 'İklim Değişikliği'
  }
  return themeNames[theme] || theme
}
