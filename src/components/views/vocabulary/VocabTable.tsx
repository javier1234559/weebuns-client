import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'

interface VocabItem {
  word: string
  meaning: string
  audioUrl: string
  example: string
  tags: string[]
  createdDate: string
}

const mockVocabData: VocabItem[] = [
  {
    word: 'Wandern',
    meaning: 'Hiking',
    audioUrl: '/audio/wandern.mp3',
    example: 'Wir gehen am Wochenende wandern.',
    tags: ['learned', 'activity'],
    createdDate: 'May 01, 2019 10:46 AM'
  },
  {
    word: 'Reden, Reden über',
    meaning: 'Talk, talk about',
    audioUrl: '/audio/reden.mp3',
    example: 'Lass uns über das Projekt reden.',
    tags: ['learned', 'activity'],
    createdDate: 'May 01, 2019 10:46 AM'
  },
  {
    word: 'Entspannen',
    meaning: 'Relax',
    audioUrl: '/audio/entspannen.mp3',
    example: 'Nach der Arbeit möchte ich mich entspannen.',
    tags: ['learned', 'activity'],
    createdDate: 'May 01, 2019 10:46 AM'
  },
  {
    word: 'rosa',
    meaning: 'pink color',
    audioUrl: '/audio/rosa.mp3',
    example: 'Das Kleid ist rosa.',
    tags: ['learned', 'color'],
    createdDate: 'May 01, 2019 10:46 AM'
  }
  // Add more mock data as needed
]

const VocabTable: React.FC = () => {
  const playAudio = (url: string) => {
    // In a real application, you would implement audio playback here
    console.log(`Playing audio: ${url}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='vocabulary table'>
        <TableHead>
          <TableRow>
            <TableCell>Word</TableCell>
            <TableCell>Meaning</TableCell>
            <TableCell>Audio</TableCell>
            <TableCell>Example</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockVocabData.map((row, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {row.word}
              </TableCell>
              <TableCell>{row.meaning}</TableCell>
              <TableCell>
                <IconButton onClick={() => playAudio(row.audioUrl)} size='small'>
                  <VolumeUpIcon />
                </IconButton>
              </TableCell>
              <TableCell>{row.example}</TableCell>
              <TableCell>
                {row.tags.map((tag, tagIndex) => (
                  <Chip key={tagIndex} label={tag} size='small' sx={{ marginRight: 0.5, marginBottom: 0.5 }} />
                ))}
              </TableCell>
              <TableCell>{row.createdDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default VocabTable
