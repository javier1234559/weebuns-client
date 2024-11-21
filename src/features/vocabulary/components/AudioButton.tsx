import VolumeUp from '@mui/icons-material/VolumeUp'
import IconButton from '@mui/material/IconButton'

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }
}

const AudioButton = ({ text, size = 'medium' }: { text: string; size?: 'small' | 'medium' | 'large' }) => (
  <IconButton
    size={size}
    onClick={(e) => {
      e.stopPropagation()
      speak(text)
    }}
    sx={{
      color: 'primary.main',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    }}
  >
    <VolumeUp />
  </IconButton>
)

AudioButton.displayName = 'AudioButton'
export default AudioButton
