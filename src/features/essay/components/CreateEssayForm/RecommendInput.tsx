import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import { useEffect, useState } from 'react'

import AppError from '~/components/common/AppError'
import aiApi from '~/features/ai/services/aiApi'
import { RecommendTopicsResponseDto } from '~/services/api/api-axios'

interface RecommendInputProps {
  value: string
  onChange: (value: string) => void
}

export const RecommendInput = ({ value, onChange }: RecommendInputProps) => {
  const [topics, setTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendTopics = async () => {
    try {
      setLoading(true)
      setError(null)
      const data: RecommendTopicsResponseDto = await aiApi.recommendTopic({ category: 'english', count: 2 })
      setTopics(data.topics)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recommendations')
      console.error('Error fetching topics:', err)
    } finally {
      setLoading(false)
    }
  }

  // Chỉ gọi API khi value trống và component mount
  useEffect(() => {
    if (!value) {
      fetchRecommendTopics()
    }
  }, [value])

  // Nếu có value, không render gì cả
  if (value) {
    return null
  }

  return (
    <Fade in={!value}>
      <Box sx={{ mt: 2 }}>
        {error ? (
          <AppError message={error} />
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Box component='span' sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  Loading recommendations...
                </Box>
              </Box>
            ) : topics.length > 0 ? (
              topics.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  onClick={() => onChange(topic)}
                  sx={{
                    cursor: 'pointer',
                    opacity: 0.5,
                    '&:hover': {
                      bgcolor: 'primary.light'
                    }
                  }}
                />
              ))
            ) : (
              <Box component='span' sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                No recommendations available
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Fade>
  )
}

export default RecommendInput
