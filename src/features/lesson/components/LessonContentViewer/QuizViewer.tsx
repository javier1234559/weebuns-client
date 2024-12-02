import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { QuestionContent, QuizContent } from '~/features/lesson/lesson.type'

interface QuizViewerProps {
  content: QuizContent
}

interface QuestionState {
  selectedOption: string | null
  isSubmitted: boolean
}

interface QuizQuestionProps {
  question: QuestionContent
  questionNumber: number
  questionState: QuestionState
  onAnswerSelect: (optionId: string) => void
}

function QuizQuestion({ question, questionNumber, questionState, onAnswerSelect }: QuizQuestionProps) {
  const correctOption = question.options.find((opt) => opt.isCorrect)

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='subtitle1' gutterBottom fontWeight={500}>
        {questionNumber}. {question.question}
      </Typography>

      <FormControl component='fieldset' sx={{ width: '100%' }}>
        <RadioGroup value={questionState.selectedOption || ''} onChange={(e) => onAnswerSelect(e.target.value)}>
          {question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              disabled={questionState.isSubmitted}
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    color: questionState.isSubmitted
                      ? option.isCorrect
                        ? 'success.main'
                        : questionState.selectedOption === option.id
                          ? 'error.main'
                          : 'text.primary'
                      : 'text.primary'
                  }}
                >
                  {option.text}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {questionState.isSubmitted && (
        <Box sx={{ mt: 2 }}>
          {questionState.selectedOption &&
          question.options.find((opt) => opt.id === questionState.selectedOption)?.isCorrect ? (
            <Alert severity='success'>Correct!</Alert>
          ) : (
            <Alert severity='error'>
              <Typography paragraph>Incorrect. The correct answer is: {correctOption?.text}</Typography>
              {question.explanation && <Typography>Explanation: {question.explanation}</Typography>}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  )
}

function QuizViewer({ content }: QuizViewerProps) {
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>(() =>
    content.questions.reduce(
      (acc, q) => ({
        ...acc,
        [q.id]: { selectedOption: null, isSubmitted: false }
      }),
      {}
    )
  )

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], selectedOption: optionId }
    }))
  }

  const handleSubmit = (questionId: string) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], isSubmitted: true }
    }))
  }

  const isAllSubmitted = Object.values(questionStates).every((state) => state.isSubmitted)
  const correctAnswers = content.questions.reduce((count, question) => {
    const state = questionStates[question.id]
    if (!state.selectedOption) return count
    const selectedOption = question.options.find((opt) => opt.id === state.selectedOption)
    return selectedOption?.isCorrect ? count + 1 : count
  }, 0)

  return (
    <Box>
      {content.title && (
        <Typography variant='h6' gutterBottom>
          {content.title}
        </Typography>
      )}

      {content.questions.map((question, index) => (
        <Box key={question.id}>
          <QuizQuestion
            question={question}
            questionNumber={index + 1}
            questionState={questionStates[question.id]}
            onAnswerSelect={(optionId) => handleAnswerSelect(question.id, optionId)}
          />

          {!questionStates[question.id].isSubmitted && questionStates[question.id].selectedOption && (
            <Button variant='contained' onClick={() => handleSubmit(question.id)} sx={{ mb: 3 }}>
              Submit Answer
            </Button>
          )}
        </Box>
      ))}

      {isAllSubmitted && (
        <Alert severity={correctAnswers === content.questions.length ? 'success' : 'info'} sx={{ mt: 2 }}>
          Final Score: {correctAnswers} out of {content.questions.length}(
          {((correctAnswers / content.questions.length) * 100).toFixed(0)}%)
        </Alert>
      )}
    </Box>
  )
}

export default QuizViewer
