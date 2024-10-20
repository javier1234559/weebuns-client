import 'reactjs-tiptap-editor/style.css'
import './EditorCustom.scss'

import { memo } from 'react'
import RichTextEditor, {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Emoji,
  ExportWord,
  Heading,
  Highlight,
  History,
  ImageGif,
  Indent,
  Link,
  SlashCommand,
  TextAlign,
  TextDirection,
  Underline
  // ImportWord,
  // HorizontalRule,
} from 'reactjs-tiptap-editor'

import { globalConfig } from '~/config'

interface ContentEditorProps {
  isDark: boolean
  content: string
  onChangeContent: (content: string) => void
}

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true
    },
    // Character count
    characterCount: {
      limit: 50_000
    }
  }),
  // Format plugins
  Heading,
  History,
  Indent,
  Bold,
  BulletList,
  Blockquote,
  Highlight,
  Underline,
  TextDirection,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Clear,
  // insert and feature plugins
  // ImportWord,
  SlashCommand,
  Link,
  Emoji,
  ExportWord,
  // HorizontalRule,
  ImageGif.configure({
    // Giphy API key
    GIPHY_API_KEY: globalConfig.GIPHY_API_KEY
  })
]

function ContentEditor({ isDark, content, onChangeContent }: ContentEditorProps) {
  return (
    <RichTextEditor
      output='html'
      dark={isDark}
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  )
}

ContentEditor.displayName = 'ContentEditor'
export default memo(ContentEditor)
