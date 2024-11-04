import nlp from 'compromise'
import DOMPurify from 'dompurify'

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
    const cleanText = textUtils.parseHtmlContent(text)

    console.log('cleanText:', cleanText)
    const doc = nlp(cleanText)
    const sentences = doc.sentences().out('array')

    return sentences
      .map((sentence: string) => sentence.trim().replace(/\.$/, '').replace(/\s+/g, ' ').trim())
      .filter((sentence: string) => {
        // Lọc bỏ câu rỗng hoặc chỉ có dấu chấm
        const cleaned = sentence.replace(/[.,\s]/g, '')
        return cleaned.length > 0
      })
  },

  // Hàm xử lý HTML thành plain text có cấu trúc
  parseHtmlContent: (html: string): string => {
    const div = document.createElement('div')
    div.innerHTML = DOMPurify.sanitize(html)

    // Xóa images
    const images = div.querySelectorAll('img')
    images.forEach((img) => img.remove())

    // Xử lý từng paragraph riêng biệt
    const paragraphs = div.querySelectorAll('p')
    paragraphs.forEach((p) => {
      let text = p.textContent || ''
      // Đảm bảo kết thúc bằng dấu chấm
      if (!text.trim().endsWith('.')) {
        text = text.trim() + '. '
      }
      p.textContent = text
    })

    // Xử lý blockquotes đặc biệt
    const blockquotes = div.querySelectorAll('blockquote')
    blockquotes.forEach((quote) => {
      const text = quote.textContent || ''
      // Loại bỏ dấu chấm thừa trước khi thêm định dạng
      const cleanText = text.trim().replace(/\.+$/, '')
      quote.textContent = cleanText + '.'
    })

    // Lấy text và cleanup
    let text = div.textContent || div.innerText

    // Cleanup các ký tự đặc biệt
    text = text
      // Xử lý nhiều dấu chấm liên tiếp
      .replace(/\.+/g, '.')
      // Xử lý khoảng trắng thừa
      .replace(/\s+/g, ' ')
      // Xử lý emoji
      .replace(/([^\s])([\u{1F600}-\u{1F64F}])/gu, '$1. $2')
      .replace(/([\u{1F600}-\u{1F64F}])([^\s])/gu, '$1. $2')
      // Xử lý dấu chấm và khoảng trắng
      .replace(/\.\s*\./g, '.')
      .replace(/\s+\./g, '.')
      .replace(/\.\s+/g, '. ')
      .trim()

    return text
  }
}
