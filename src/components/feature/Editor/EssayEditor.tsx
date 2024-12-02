import 'reactjs-tiptap-editor/style.css'
import './EditorCustom.scss'

import { memo } from 'react'
import RichTextEditor, {
  BaseKit,
  Bold,
  Clear,
  Emoji,
  ExportWord,
  Heading,
  Highlight,
  History,
  Link,
  SlashCommand,
  TextAlign,
  Underline,
  useEditorState
} from 'reactjs-tiptap-editor'

import BubbleMenuAction from '~/components/feature/BubbleMenuAction'

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
      limit: 10_000
    }
  }),
  // Format plugins
  Heading,
  History,
  Bold,
  Highlight,
  Underline,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Clear,
  // insert and feature plugins
  SlashCommand,
  Link,
  Emoji,
  ExportWord
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
