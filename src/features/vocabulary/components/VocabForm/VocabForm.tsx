import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'

interface VocabItem {
  id: number
  word: string
  partOfSpeech: string
  audio: string
  example: string
}

const partOfSpeechOptions = [
  { value: 'n', label: 'Noun' },
  { value: 'v', label: 'Verb' },
  { value: 'adj', label: 'Adjective' },
  { value: 'adv', label: 'Adverb' },
  { value: 'prep', label: 'Preposition' }
]

const VocabForm: React.FC = () => {
  const [vocabItems, setVocabItems] = useState<VocabItem[]>([])
  const [currentItem, setCurrentItem] = useState<VocabItem>({
    id: 0,
    word: '',
    partOfSpeech: '',
    audio: '',
    example: ''
  })

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target
    setCurrentItem((prev) => ({ ...prev, [name as string]: value }))
  }

  const handleSave = () => {
    if (currentItem.id === 0) {
      // Add new item
      setVocabItems([...vocabItems, { ...currentItem, id: Date.now() }])
    } else {
      // Update existing item
      setVocabItems(vocabItems.map((item) => (item.id === currentItem.id ? currentItem : item)))
    }
    handleCancel()
  }

  const handleCancel = () => {
    setCurrentItem({ id: 0, word: '', partOfSpeech: '', audio: '', example: '' })
  }

  const handleDelete = (id: number) => {
    setVocabItems(vocabItems.filter((item) => item.id !== id))
  }

  const handleEdit = (item: VocabItem) => {
    setCurrentItem(item)
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label='Word'
          name='word'
          value={currentItem.word}
          onChange={(e) => handleInputChange(e as SelectChangeEvent<string>)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Part of Speech</InputLabel>
          <Select
            name='partOfSpeech'
            value={currentItem.partOfSpeech}
            onChange={handleInputChange}
            label='Part of Speech'
          >
            {partOfSpeechOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Audio URL'
          name='audio'
          value={currentItem.audio}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Example'
          name='example'
          value={currentItem.example}
          onChange={handleInputChange}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>

      <List>
        {vocabItems.map((item) => (
          <ListItem key={item.id} component='button' onClick={() => handleEdit(item)}>
            <Chip label={item.partOfSpeech} size='small' sx={{ mr: 1, width: 40 }} />
            <ListItemText primary={item.word} />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

VocabForm.displayName = 'VocabForm'
export default VocabForm
