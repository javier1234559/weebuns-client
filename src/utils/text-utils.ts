import nlp from 'compromise'

export const textUtils = {
  truncate: (text: string, maxLength: number) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  },

  sanitize: (html: string) => {
    // Remove HTML tags if content might contain them
    return html.replace(/<[^>]*>/g, '')
  },

  splitIntoSentences: (text: string): string[] => {
    // Split on period followed by space or end of string
    // Also handles other sentence endings like ! and ?
    const doc = nlp(text)
    return doc.sentences().out('array')
  }
}
