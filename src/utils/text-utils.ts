export const textUtils = {
  truncate: (text: string, maxLength: number) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  },

  sanitize: (html: string) => {
    // Remove HTML tags if content might contain them
    return html.replace(/<[^>]*>/g, '')
  }
}
