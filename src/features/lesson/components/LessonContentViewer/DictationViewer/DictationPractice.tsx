import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { Change, diffWords } from 'diff'
import { useState } from 'react'

import ComparisonResultView from './ComparisonResultView'

export interface ComparisonResult {
  differences: {
    text: string
    type: 'correct' | 'added' | 'removed'
  }[]
  totalErrors: number
  accuracy: number
}

export const compareTexts = (originalText: string, inputText: string): ComparisonResult => {
  const differences = diffWords(originalText, inputText)

  const formattedDifferences = differences.map((part: Change) => ({
    text: part.value,
    type: part.added ? ('added' as const) : part.removed ? ('removed' as const) : ('correct' as const)
  }))

  const totalWords = originalText.split(/\s+/).length
  const errors = differences.filter((part) => part.added || part.removed).length
  const accuracy = ((totalWords - errors) / totalWords) * 100

  return {
    differences: formattedDifferences,
    totalErrors: errors,
    accuracy: Math.max(0, accuracy)
  }
}

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
