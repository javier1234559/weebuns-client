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
  Underline,
  useEditorState
  // ImportWord,
  // HorizontalRule,
} from 'reactjs-tiptap-editor'

import BubbleMenuAction from '~/components/feature/BubbleMenuAction'
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
  const { isReady, editor, editorRef } = useEditorState()

  return (
    <div>
      <RichTextEditor
        ref={editorRef}
        output='html'
        dark={isDark}
        content={content}
        onChangeContent={onChangeContent}
        extensions={extensions}
        hideBubble
      />
      {isReady && editor && <BubbleMenuAction editor={editor} />}
    </div>
  )
}

ContentEditor.displayName = 'ContentEditor'
export default memo(ContentEditor)
