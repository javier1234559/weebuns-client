import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { Book, Coffee, GitBranch, Smile } from 'lucide-react'
import { memo, useState } from 'react'
import { BubbleMenu, Editor } from 'reactjs-tiptap-editor'

import { AppInput } from '~/components/common/AppInput'
import { Select, SelectItem } from '~/components/ui/select'

interface Material {
  type: 'Phrasal Verb' | 'Idiom' | 'Slang' | 'Vocabulary'
  expression: string
  definition: string
  example_sentence: string
  category: string
  date_learned: string
  next_review_date: string
}

interface BubbleMenuActionProps {
  editor: Editor
  onSaveMaterial?: (material: Material) => void
}

const CATEGORIES = [
  { value: 'Workplace', label: 'Workplace' },
  { value: 'Everyday Conversation', label: 'Everyday Conversation' },
  { value: 'Informal Speech', label: 'Informal Speech' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Business', label: 'Business' }
]

function BubbleMenuAction({ editor, onSaveMaterial }: BubbleMenuActionProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedType, setSelectedType] = useState<Material['type'] | ''>('')
  const [materialData, setMaterialData] = useState<Partial<Material>>({})

  const getContainingSentence = (text: string, parentText: string): string => {
    const sentenceRegex = /[^.!?]+[.!?]+/g
    const sentences = parentText.match(sentenceRegex) || [parentText]
    return sentences.find((sentence) => sentence.includes(text))?.trim() || text
  }

  const handleVocabTypeSelect = (type: Material['type']) => {
    const { from, to } = editor.state.selection
    const selectedText = editor.state.doc.textBetween(from, to)

    // Get containing sentence
    const $from = editor.state.selection.$from
    const parentNode = $from.node($from.depth)
    const parentText = parentNode.textContent
    const containingSentence = getContainingSentence(selectedText, parentText)

    setSelectedType(type)
    setMaterialData({
      type,
      expression: selectedText,
      example_sentence: containingSentence,
      date_learned: new Date().toISOString().split('T')[0],
      next_review_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    setShowDialog(true)
  }

  const handleSave = () => {
    if (!materialData.type || !materialData.expression || !materialData.definition) {
      return // Add error handling as needed
    }

    const material = {
      ...materialData,
      type: materialData.type,
      expression: materialData.expression,
      definition: materialData.definition,
      example_sentence: materialData.example_sentence || '',
      category: materialData.category || 'Uncategorized',
      date_learned: materialData.date_learned!,
      next_review_date: materialData.next_review_date!
    } as Material

    onSaveMaterial?.(material)
    setShowDialog(false)
    setMaterialData({})
    setSelectedType('')
  }

  if (!editor) return null

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          zIndex: 1000 // This ensures it's below the dialog
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            p: 1
          }}
        >
          <Tooltip title='Save as Vocabulary'>
            <IconButton size='small' onClick={() => handleVocabTypeSelect('Vocabulary')}>
              <Book size={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Save as Phrasal Verb'>
            <IconButton size='small' onClick={() => handleVocabTypeSelect('Phrasal Verb')}>
              <GitBranch size={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Save as Idiom'>
            <IconButton size='small' onClick={() => handleVocabTypeSelect('Idiom')}>
              <Coffee size={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Save as Slang'>
            <IconButton size='small' onClick={() => handleVocabTypeSelect('Slang')}>
              <Smile size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </BubbleMenu>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        maxWidth='sm'
        fullWidth
        sx={{
          zIndex: 2000,
          '& .MuiDialog-container': {
            zIndex: 2001
          },
          '& .MuiDialog-paper': {
            zIndex: 2002
          },
          '& .MuiBackdrop-root': {
            zIndex: 2000
          }
        }}
      >
        <DialogTitle>Save {selectedType}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <AppInput
              placeholder='Expression'
              value={materialData.expression || ''}
              onChange={(e) =>
                setMaterialData((prev) => ({
                  ...prev,
                  expression: e.target.value
                }))
              }
            />

            <AppInput
              rows={2}
              placeholder='Definition'
              value={materialData.definition || ''}
              onChange={(e) =>
                setMaterialData((prev) => ({
                  ...prev,
                  definition: e.target.value
                }))
              }
            />

            <AppInput
              rows={2}
              placeholder='Example sentence'
              value={materialData.example_sentence || ''}
              onChange={(e) =>
                setMaterialData((prev) => ({
                  ...prev,
                  example_sentence: e.target.value
                }))
              }
            />

            <Select
              name='category'
              placeholder='Category'
              value={materialData.category || ''}
              onChange={(e) =>
                setMaterialData((prev) => ({
                  ...prev,
                  category: e.target.value
                }))
              }
            >
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(BubbleMenuAction)
