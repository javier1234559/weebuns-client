import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Check, Trash2 } from 'lucide-react'
import { memo } from 'react'

import AppButton from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'
import { QuestionContent, QuizContent } from '~/features/lesson/lesson.type'
import { generateId } from '~/utils/generateId'

interface QuizEditorProps {
  content: QuizContent
  onChange: (content: QuizContent) => void
}

function QuizEditor({ content, onChange }: QuizEditorProps) {
  console.log('QuizEditor', JSON.stringify(content, null, 2))

  const handleTitleChange = (title: string) => {
    onChange({ ...content, title })
  }

  const handleAddQuestion = () => {
    const newQuestion: QuestionContent = {
      id: generateId('q-'),
      question: '',
      options: [
        { id: generateId('opt-'), text: '', isCorrect: false },
        { id: generateId('opt-'), text: '', isCorrect: false }
      ]
    }

    onChange({
      ...content,
      questions: [...content.questions, newQuestion]
    })
  }

  const handleQuestionChange = (questionId: string, updatedQuestion: QuestionContent) => {
    const newQuestions = content.questions.map((q) => (q.id === questionId ? updatedQuestion : q))
    onChange({ ...content, questions: newQuestions })
  }

  const handleDeleteQuestion = (questionId: string) => {
    onChange({
      ...content,
      questions: content.questions.filter((q) => q.id !== questionId)
    })
  }

  return (
    <Stack spacing={2}>
      {/* Quiz Title Section */}
      <Paper elevation={0} variant='outlined' sx={{ p: 3 }}>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          Quiz Information
        </Typography>
        <TextField
          fullWidth
          label='Quiz Title'
          value={content.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </Paper>

      {/* Questions Section */}
      <Paper elevation={0} variant='outlined' sx={{ p: 3 }}>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          Questions
        </Typography>

        <Stack spacing={3}>
          {content.questions.map((question, index) => (
            <QuestionEditor
              key={question.id}
              question={question}
              questionNumber={index + 1}
              onChange={(updatedQuestion) => handleQuestionChange(question.id, updatedQuestion)}
              onDelete={() => handleDeleteQuestion(question.id)}
            />
          ))}

          <Box>
            <AppButton startIcon={<AddIcon />} onClick={handleAddQuestion} variant='outlined'>
              Add Question
            </AppButton>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}

interface QuestionEditorProps {
  question: QuestionContent
  questionNumber: number
  onChange: (question: QuestionContent) => void
  onDelete: () => void
}

function QuestionEditor({ question, questionNumber, onChange, onDelete }: QuestionEditorProps) {
  const handleOptionChange = (optionId: string, text: string) => {
    const newOptions = question.options.map((opt) => (opt.id === optionId ? { ...opt, text } : opt))
    onChange({ ...question, options: newOptions })
  }

  const handleCorrectOptionChange = (optionId: string) => {
    const newOptions = question.options.map((opt) => ({
      ...opt,
      isCorrect: opt.id === optionId
    }))
    onChange({ ...question, options: newOptions })
  }

  const handleAddOption = () => {
    onChange({
      ...question,
      options: [...question.options, { id: generateId('opt-'), text: '', isCorrect: false }]
    })
  }

  const handleDeleteOption = (optionId: string) => {
    onChange({
      ...question,
      options: question.options.filter((opt) => opt.id !== optionId)
    })
  }

  return (
    <Box sx={{ mb: 4, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Stack direction='row' justifyContent='space-between' alignItems='start' mb={2}>
        <Typography variant='h6'>Question {questionNumber}</Typography>

        <IconButton
          size='small'
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          sx={{
            ml: 1,
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <Trash2 fontSize='small' />
        </IconButton>
      </Stack>

      <AppInput
        fullWidth
        placeholder='Question'
        size='small'
        value={question.question}
        onChange={(e) => onChange({ ...question, question: e.target.value })}
        sx={{ mb: 2 }}
      />

      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        Options:
      </Typography>
      {question.options.map((option, index) => (
        <Stack key={option.id} direction='row' spacing={2} sx={{ mb: 1 }}>
          <AppInput
            fullWidth
            size='small'
            value={option.text}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <IconButton
            size='small'
            onClick={() => handleCorrectOptionChange(option.id)}
            sx={{
              ml: 1,
              bgcolor: option.isCorrect ? 'success.light' : 'transparent',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Check fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => handleDeleteOption(option.id)}
            disabled={question.options.length <= 1}
            sx={{
              ml: 1,
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Trash2 fontSize='small' />
          </IconButton>
        </Stack>
      ))}

      <AppButton startIcon={<AddIcon />} onClick={handleAddOption} size='small' sx={{ mt: 1 }}>
        Add Option
      </AppButton>

      <TextField
        fullWidth
        multiline
        rows={2}
        label='Explanation (Optional)'
        value={question.explanation || ''}
        onChange={(e) => onChange({ ...question, explanation: e.target.value })}
        sx={{ mt: 2 }}
      />
    </Box>
  )
}

QuizEditor.displayName = 'QuizEditor'
export default memo(QuizEditor)
