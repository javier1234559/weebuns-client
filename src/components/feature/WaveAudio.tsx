import PauseIcon from '@mui/icons-material/Pause'
import PlayIcon from '@mui/icons-material/PlayArrow'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import WavesurferPlayer from '@wavesurfer/react'
import TimeFormat from 'format-duration'
import { Trash2 } from 'lucide-react'
import { memo, useCallback, useState } from 'react'

interface WaveAudioProps {
  audioUrl: string
  onDelete?: () => void
}

const SPEED_OPTIONS = [
  { label: '0.5x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: '1x', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2 }
]

function WaveAudio({ audioUrl, onDelete }: WaveAudioProps) {
  const theme = useTheme()
  const [wavesurfer, setWavesurfer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  const handleReady = useCallback((ws: any) => {
    setWavesurfer(ws)
    setIsPlaying(false)
    setDuration(ws.getDuration())

    ws.on('timeupdate', (time: number) => {
      setCurrentTime(time)
    })
  }, [])

  const handlePlayPause = useCallback(() => {
    wavesurfer?.playPause()
  }, [wavesurfer])

  const handleSpeedChange = useCallback(
    (event: any) => {
      const newSpeed = event.target.value
      setPlaybackRate(newSpeed)
      if (wavesurfer) {
        wavesurfer.setPlaybackRate(newSpeed)
      }
    },
    [wavesurfer]
  )

  const formatTime = useCallback((time: number) => {
    return TimeFormat(time * 1000, { leading: true })
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction='row'
        spacing={1}
        alignItems='center'
        sx={{
          width: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          p: 1
        }}
      >
        <IconButton onClick={handlePlayPause} size='small' color='primary'>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>

        <Box sx={{ minWidth: 60, pl: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Box>

        <Box sx={{ flex: 1, height: 40 }}>
          <WavesurferPlayer
            height={40}
            waveColor={theme.palette.text.disabled}
            progressColor={theme.palette.primary.main}
            url={audioUrl}
            onReady={handleReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            barWidth={2}
            barGap={1}
            barRadius={3}
            cursorWidth={2}
          />
        </Box>

        <Select
          value={playbackRate}
          onChange={handleSpeedChange}
          size='small'
          sx={{
            minWidth: 80,
            height: 32,
            '.MuiSelect-select': {
              py: 0.5,
              px: 1
            }
          }}
        >
          {SPEED_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {onDelete && (
          <IconButton onClick={onDelete} size='small' sx={{ flexShrink: 0 }}>
            <Trash2 />
          </IconButton>
        )}
      </Stack>
    </Box>
  )
}

WaveAudio.displayName = 'WaveAudio'
export default memo(WaveAudio)
