import nlp from 'compromise'
import DOMPurify from 'dompurify'
import diff from 'fast-diff'

/**
 * Truncates text to a specified length
 * @param text - Input text to truncate
 * @param maxLength - Maximum length before truncation
 */
export const truncate = (text: string, maxLength: number): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Removes HTML tags from a string
 * @param html - HTML string to sanitize
 */
export const sanitize = (html: string): string => {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Processes HTML content into structured plain text
 * Handles images, paragraphs, blockquotes, and special characters
 * @param html - HTML content to process
 */
export const parseHtmlContent = (html: string): string => {
  const div = document.createElement('div')
  div.innerHTML = DOMPurify.sanitize(html)

  // Remove images
  div.querySelectorAll('img').forEach((img) => img.remove())

  // Process paragraphs
  div.querySelectorAll('p').forEach((p) => {
    let text = p.textContent || ''
    if (!text.trim().endsWith('.')) {
      text = text.trim() + '. '
    }
    p.textContent = text
  })

  // Process blockquotes
  div.querySelectorAll('blockquote').forEach((quote) => {
    const text = quote.textContent || ''
    const cleanText = text.trim().replace(/\.+$/, '')
    quote.textContent = cleanText + '.'
  })

  const text = div.textContent || div.innerText
  return cleanupText(text)
}

/**
 * Cleans up text by handling punctuation, whitespace, and emoji
 * @param text - Text to clean up
 */
const cleanupText = (text: string): string => {
  return text
    .replace(/\.+/g, '.') // Handle multiple periods
    .replace(/\s+/g, ' ') // Handle extra whitespace
    .replace(/([^\s])([\u{1F600}-\u{1F64F}])/gu, '$1. $2') // Space before emoji
    .replace(/([\u{1F600}-\u{1F64F}])([^\s])/gu, '$1. $2') // Space after emoji
    .replace(/\.\s*\./g, '.') // Handle multiple periods with spaces
    .replace(/\s+\./g, '.') // Handle space before period
    .replace(/\.\s+/g, '. ') // Handle space after period
    .trim()
}

/**
 * Splits text into cleaned sentences
 * @param text - Text to split into sentences
 * @returns Array of cleaned sentences
 */
export const splitIntoSentences = (text: string): string[] => {
  const cleanText = parseHtmlContent(text)
  const doc = nlp(cleanText)
  return doc
    .sentences()
    .out('array')
    .map((sentence: string) => sentence.trim().replace(/\.$/, '').replace(/\s+/g, ' ').trim())
    .filter((sentence: string) => {
      const cleaned = sentence.replace(/[.,\s]/g, '')
      return cleaned.length > 0
    })
}

export interface ComparisonResult {
  differences: {
    text: string
    type: 'correct' | 'added' | 'removed'
  }[]
  totalErrors: number
  accuracy: number
}

/**
 * Compares two texts and returns detailed comparison results
 * @param originalText - The reference text to compare against
 * @param inputText - The text being compared
 * @returns ComparisonResult containing differences, error count, and accuracy
 */
export const compareTexts = (originalText: string, inputText: string): ComparisonResult => {
  // Use fast-diff's built-in constants for better readability
  const { INSERT, DELETE, EQUAL } = diff

  // Get differences
  const diffs = diff(originalText, inputText)

  // Map diff results to our format
  const formattedDifferences = diffs.map(
    ([diffType, text]): { text: string; type: 'correct' | 'added' | 'removed' } => {
      switch (diffType) {
        case EQUAL:
          return { text, type: 'correct' }
        case INSERT:
          return { text, type: 'added' }
        case DELETE:
          return { text, type: 'removed' }
        default:
          return { text, type: 'correct' } // fallback case
      }
    }
  )

  // Calculate total words in original text
  const originalWords = originalText.split(/\s+/).filter((word) => word.length > 0)
  const totalWords = originalWords.length

  // Count errors (insertions and deletions)
  const errors = diffs.reduce((count, [diffType]) => {
    return diffType !== EQUAL ? count + 1 : count
  }, 0)

  // Calculate accuracy
  const accuracy = totalWords > 0 ? ((totalWords - errors) / totalWords) * 100 : 100

  return {
    differences: formattedDifferences,
    totalErrors: errors,
    accuracy: Math.max(0, Math.min(100, accuracy))
  }
}
