import { styled } from '@mui/material/styles'
import { Link, useSearchParams } from 'react-router-dom'

const ChipLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}))

interface AppTagProps {
  tag: string
}

function AppTag({ tag }: AppTagProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const toggleTag = () => {
    const tags = searchParams.get('tags')?.split(',') || []
    const updatedTags = tags.includes(tag.toLowerCase())
      ? tags.filter((t) => t !== tag.toLowerCase())
      : [...tags, tag.toLowerCase()]

    if (updatedTags.length > 0) {
      searchParams.set('tags', updatedTags.join(','))
    } else {
      searchParams.delete('tags')
    }

    setSearchParams(searchParams)
  }

  const isActive = searchParams.get('tags')?.split(',').includes(tag.toLowerCase())

  return (
    <ChipLink
      to={`?${searchParams.toString()}`}
      onClick={(e) => {
        e.preventDefault()
        toggleTag()
      }}
      style={{
        backgroundColor: isActive ? 'var(--mui-palette-primary-main)' : 'transparent',
        color: isActive ? 'white' : 'var(--mui-palette-primary-main)',
        borderRadius: '20px',
        fontSize: '0.8rem'
      }}
    >
      {tag}
    </ChipLink>
  )
}

export default AppTag
