import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

import { compareTexts, ComparisonResult } from '~/utils/text-utils'

import ComparisonResultView from './ComparisonResultView'

interface DictationPracticeProps {
  originalText: string
}

export default function DictationPractice({ originalText }: DictationPracticeProps) {
  const [userInput, setUserInput] = useState('')
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null)

  const handleCompare = () => {
    const normalizedOriginal = originalText.replace(/<[^>]*>/g, '').trim()
    const normalizedInput = userInput.trim()

    const result = compareTexts(normalizedOriginal, normalizedInput)
    setComparisonResult(result)
  }

  return (
    <Stack spacing={2}>
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder='Type what you hear...'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        variant='outlined'
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={handleCompare} disabled={!userInput.trim()}>
          Check Answer
        </Button>
      </Box>

      {comparisonResult && <ComparisonResultView result={comparisonResult} />}
    </Stack>
  )
}
