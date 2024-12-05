import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Book, Coffee, GitBranch, Smile } from 'lucide-react'
import { memo, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { BubbleMenu, Editor } from 'reactjs-tiptap-editor'

import { VocabularyForm, VocabularyFormData } from '~/features/vocabulary/components/VocabularyForm'
import calculateNextReview from '~/features/vocabulary/helper/calculateSRS'
import { useCreateVocabulary } from '~/features/vocabulary/hooks/useVocabularyQueries'
import { RootState } from '~/store/store'

interface BubbleMenuActionProps {
  editor: Editor
}

type VocabType = 'Vocabulary' | 'Phrasal Verb' | 'Idiom' | 'Slang'

const BubbleMenuAction = ({ editor }: BubbleMenuActionProps) => {
  const spaceId = useSelector((state: RootState) => state.space.currentSpace?.id)

  const [showDialog, setShowDialog] = useState(false)
  const [selectedType, setSelectedType] = useState<VocabType | null>(null)
  const createVocabulary = useCreateVocabulary()

  const getContainingSentence = (text: string, parentText: string): string => {
    const sentenceRegex = /[^.!?]+[.!?]+/g
    const sentences = parentText.match(sentenceRegex) || [parentText]
    return sentences.find((sentence) => sentence.includes(text))?.trim() || text
  }

  const getInitialData = (type: VocabType) => {
    const { from, to } = editor.state.selection
    const selectedText = editor.state.doc.textBetween(from, to)

    const $from = editor.state.selection.$from
    const parentNode = $from.node($from.depth)
    const parentText = parentNode.textContent
    const containingSentence = getContainingSentence(selectedText, parentText)

    return {
      term: selectedText,
      exampleSentence: containingSentence,
      tags: [type]
    }
  }

  const handleVocabTypeSelect = (type: VocabType) => {
    setSelectedType(type)
    setShowDialog(true)
  }

  const handleSave = async (formData: VocabularyFormData) => {
    try {
      await createVocabulary.mutateAsync({
        term: formData.term,
        meaning: formData.meaning?.filter(Boolean) as string[],
        exampleSentence: formData.exampleSentence,
        imageUrl: formData.imageUrl,
        referenceLink: formData.referenceLink,
        referenceName: formData.referenceName,
        repetitionLevel: 0,
        nextReview: calculateNextReview(0),
        tags: (formData?.tags?.filter(Boolean) as string[]) || [],
        spaceId: spaceId || ''
      })
      toast.success('Vocabulary saved successfully')
      setShowDialog(false)
      setSelectedType(null)
    } catch (error) {
      toast.error('Failed to save vocabulary')
      console.error(error)
    }
  }

  const handleClose = () => {
    setShowDialog(false)
    setSelectedType(null)
  }

  if (!editor) return null

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          zIndex: 1000
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
        onClose={handleClose}
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
        <Box p={3}>
          <Typography variant='h6' mb={2} component='h2'>
            Save as {selectedType}
          </Typography>
          {selectedType && (
            <VocabularyForm initialData={getInitialData(selectedType)} onSuccess={handleSave} onCancel={handleClose} />
          )}
        </Box>
      </Dialog>
    </>
  )
}

export default memo(BubbleMenuAction)
