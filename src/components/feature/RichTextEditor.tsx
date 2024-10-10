import 'react-quill/dist/quill.snow.css' // Import styles

import { memo } from 'react'
import ReactQuill from 'react-quill'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    // [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean']
  ]
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
]

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return <ReactQuill theme='snow' value={value} onChange={onChange} modules={modules} formats={formats} />
}

RichTextEditor.displayName = 'RichTextEditor'

export default memo(RichTextEditor)
