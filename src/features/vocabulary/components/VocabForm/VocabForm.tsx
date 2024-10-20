import ImageIcon from '@mui/icons-material/Image'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import React from 'react'

import AppButton from '~/components/common/AppButton'
import AppIconButton from '~/components/common/AppIconButton'
import AppInput from '~/components/common/AppInput'
import { useVocabForm } from '~/features/vocabulary/hooks/useVocabForm'

const VocabForm: React.FC = () => {
  const theme = useTheme()
  const {
    currentItem,
    vocabItems,
    isImageLoading,
    handleInputChange,
    handleWordInputKeyDown,
    handleWordInputBlur,
    handleSave,
    handleClear,
    handleDelete,
    handleEdit,
    handleSaveAll
  } = useVocabForm()

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Create new list of word
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <AppInput
            fullWidth
            placeholder='Word'
            name='word'
            value={currentItem.word}
            onChange={handleInputChange}
            onKeyDown={handleWordInputKeyDown}
            onBlur={handleWordInputBlur}
            sx={{ mb: 2 }}
          />
          <AppInput
            fullWidth
            placeholder='Phonetics'
            name='phonetics'
            value={currentItem.phonetics}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <AppInput
            fullWidth
            placeholder='Definition'
            name='definition'
            value={currentItem.definition}
            onChange={handleInputChange}
            rows={3}
            sx={{ mb: 2 }}
          />
          <AppInput
            fullWidth
            placeholder='Example'
            name='example'
            value={currentItem.example}
            onChange={handleInputChange}
            rows={2}
            sx={{ mb: 2 }}
          />
          <AppInput
            fullWidth
            placeholder='Source or References Links'
            name='sourceLink'
            value={currentItem.sourceLink}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ width: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              border: `1px dashed ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              overflow: 'hidden',
              mb: 1
            }}
          >
            {isImageLoading ? (
              <Typography>Loading...</Typography>
            ) : currentItem.picture ? (
              <img
                src={currentItem.picture}
                alt={currentItem.word}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <ImageIcon sx={{ fontSize: 60, color: 'grey.500' }} />
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <AppButton variant='outlined' onClick={handleClear}>
          Clear
        </AppButton>
        <Box>
          <AppButton onClick={handleSave} sx={{ mr: 1 }}>
            Save
          </AppButton>
          <AppButton variant='contained' color='primary' onClick={handleSaveAll}>
            Save ALL
          </AppButton>
        </Box>
      </Box>

      <List>
        {vocabItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.word} />
            <ListItemSecondaryAction>
              <AppIconButton icon='edit' edge='end' aria-label='edit' onClick={() => handleEdit(item)} sx={{ mr: 1 }} />
              <AppIconButton icon='delete' edge='end' aria-label='delete' onClick={() => handleDelete(item.id)} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default VocabForm
