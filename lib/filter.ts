// Basic content filtering for kids
const badWords = [
  // Turkish
  'kötü', 'çirkin', 'korkunç', 'tehlikeli', 'zararlı', 'yasak',
  // English
  'bad', 'ugly', 'scary', 'dangerous', 'harmful', 'forbidden',
  // Add more as needed
]

export function filterContent(content: string): { isClean: boolean; filteredContent: string } {
  const lowerContent = content.toLowerCase()
  let isClean = true
  let filteredContent = content

  for (const word of badWords) {
    if (lowerContent.includes(word.toLowerCase())) {
      isClean = false
      // Replace with asterisks
      const regex = new RegExp(word, 'gi')
      filteredContent = filteredContent.replace(regex, '*'.repeat(word.length))
    }
  }

  return { isClean, filteredContent }
}

export function validateContent(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!content || content.trim().length === 0) {
    errors.push('Hikaye içeriği boş olamaz')
  }
  
  if (content.length < 10) {
    errors.push('Hikaye en az 10 karakter olmalıdır')
  }
  
  if (content.length > 5000) {
    errors.push('Hikaye en fazla 5000 karakter olabilir')
  }
  
  const { isClean } = filterContent(content)
  if (!isClean) {
    errors.push('Hikaye içeriğinde uygun olmayan kelimeler bulunmaktadır')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
