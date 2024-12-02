import 'reactjs-tiptap-editor/style.css'
import './EditorCustom.scss'

import { memo } from 'react'
import RichTextEditor, {
  BaseKit,
  Bold,
  BulletList,
  Clear,
  Heading,
  Highlight,
  History,
  SlashCommand,
  TextAlign
} from 'reactjs-tiptap-editor'

interface MinimalEditorProps {
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
  Bold,
  BulletList,
  Highlight,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Clear,
  SlashCommand
]

function MinimalEditor({ isDark, content, onChangeContent }: MinimalEditorProps) {
  return (
    <div>
      <RichTextEditor
        output='html'
        dark={isDark}
        content={content}
        onChangeContent={onChangeContent}
        extensions={extensions}
        hideBubble
      />
    </div>
  )
}

MinimalEditor.displayName = 'MinimalEditor'
export default memo(MinimalEditor)
