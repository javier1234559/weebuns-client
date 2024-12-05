import UploadIcon from '@mui/icons-material/CloudUpload'
import TTSIcon from '@mui/icons-material/RecordVoiceOver'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import MinimalEditor from '~/components/feature/Editor/MinimalEditor'
import WaveAudio from '~/components/feature/WaveAudio'
import aiApi from '~/features/ai/services/aiApi'
import { DictationContent } from '~/features/lesson/lesson.type'
import uploadApi from '~/features/upload/services/uploadApi'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { sanitize } from '~/utils/text-utils'

interface DictationEditorProps {
  content: DictationContent
  onChange: (content: DictationContent) => void
}

function DictationEditor({ content, onChange }: DictationEditorProps) {
  const { isDarkMode } = useEventSwitchDarkMode()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle text content changes
  const handleTextChange = useCallback(
    (html: string) => {
      onChange({
        ...content,
        text: html
      })
    },
    [content, onChange]
  )

  // Handle audio file upload
  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Log file info for debugging
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size
      })

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        setError('File size must be less than 5MB')
        return
      }

      try {
        setIsUploading(true)
        setError(null)

        // Create FormData
        const formData = new FormData()
        formData.append('file', file)

        // Upload file using uploadApi
        const response = await uploadApi.uploadFile(file)

        // Log response for debugging
        console.log('Upload response:', response)
        toast.success('Audio file uploaded successfully')

        onChange({
          ...content,
          audioUrl: response.data.url
        })
      } catch (err: any) {
        console.error('Upload error details:', err)
        setError(err.message || 'Failed to upload audio file. Please try again.')
      } finally {
        setIsUploading(false)
      }
    },
    [content, onChange]
  )

  // Handle AI TTS generation
  const handleTTSGenerate = useCallback(async () => {
    if (!content.text) {
      setError('Please enter some text before generating audio')
      return
    }

    const cleanText = sanitize(content.text)

    try {
      setIsUploading(true)
      setError(null)

      // Generate audio using TTS API
      const response = await aiApi.textToSpeech({
        text: cleanText,
        voiceId: 'nPczCjzI2devNBz1zQrb' // id of the voice
      })

      toast.success('Audio file generated successfully')

      onChange({
        ...content,
        audioUrl: response.audioUrl
      })
    } catch (err) {
      setError('Failed to generate audio. Please try again.')
      console.error('TTS error:', err)
    } finally {
      setIsUploading(false)
    }
  }, [content, onChange])

  //Handle delete audio file
  const handleDeleteAudio = useCallback(async () => {
    try {
      if (content.audioUrl) {
        const key = content.audioUrl.split('/').pop()
        if (key) {
          await uploadApi.deleteFile(key)
        }
      }

      toast.success('Audio file removed successfully')
      onChange({ ...content, audioUrl: '' })
    } catch (err) {
      setError('Failed to delete audio file. Please try again.')
      console.error('Delete error:', err)
    }
  }, [content, onChange])

  return (
    <Stack spacing={2}>
      {/* Audio Section */}
      <Paper elevation={0} variant='outlined' sx={{ p: 3 }}>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          Audio Source
        </Typography>

        {!content.audioUrl ? (
          // Initial state - show upload and TTS buttons
          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              startIcon={<UploadIcon />}
              onClick={() => document.getElementById('audio-upload')?.click()}
              disabled={isUploading}
            >
              Upload Audio
            </Button>

            <Button
              variant='outlined'
              startIcon={<TTSIcon />}
              onClick={handleTTSGenerate}
              disabled={isUploading || !content.text}
            >
              Generate with AI
            </Button>

            <input
              id='audio-upload'
              type='file'
              accept='audio/*'
              style={{
                display: 'none'
              }}
              onChange={handleFileUpload}
              multiple={false}
            />

            {isUploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Stack>
        ) : (
          // Audio player state
          <Box sx={{ width: '100%' }}>
            <WaveAudio audioUrl={content.audioUrl} onDelete={handleDeleteAudio} />
          </Box>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity='error' sx={{ mt: 2 }} onClose={() => setError(null)}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </Paper>

      {/* Text Content Editor */}
      <Paper elevation={0} variant='outlined' sx={{ p: 3 }}>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          Dictation Text
        </Typography>

        <MinimalEditor isDark={isDarkMode} content={content.text} onChangeContent={handleTextChange} />
      </Paper>
    </Stack>
  )
}

export default memo(DictationEditor)
