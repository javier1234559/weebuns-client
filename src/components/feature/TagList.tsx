import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useMemo } from 'react'

interface TagListProps {
  tags: unknown
  variant?: 'outlined' | 'filled'
  size?: 'small' | 'medium'
  maxItems?: number
  onTagClick?: (tag: string) => void
  className?: string
}

const TagContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5)
}))

const TagList = ({ tags, variant = 'outlined', size = 'small', maxItems, onTagClick, className }: TagListProps) => {
  const validTags = useMemo(() => {
    try {
      if (typeof tags === 'string') {
        const parsed = JSON.parse(tags)
        if (Array.isArray(parsed)) {
          return parsed
        }
      }
      if (Array.isArray(tags)) {
        return tags
      }
      return []
    } catch {
      return []
    }
  }, [tags])

  if (validTags.length === 0) return null

  const displayTags = maxItems ? validTags.slice(0, maxItems) : validTags
  const remainingCount = maxItems ? validTags.length - maxItems : 0

  return (
    <Box className={className}>
      <TagContainer>
        {displayTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size={size}
            variant={variant}
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
            clickable={Boolean(onTagClick)}
          />
        ))}
        {remainingCount > 0 && <Chip size={size} variant={variant} label={`+${remainingCount} more`} />}
      </TagContainer>
    </Box>
  )
}

export default TagList
