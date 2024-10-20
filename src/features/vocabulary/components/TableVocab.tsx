import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function TableVocab() {
  // const playAudio = (url: string) => {
  //   // In a real application, you would implement audio playback here
  //   console.log(`Playing audio: ${url}`)
  // }

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
          {/* {SAVED_VOCAB_LIST.map((row, index) => (
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
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableVocab
