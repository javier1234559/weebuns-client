import { styled } from '@mui/material/styles'
import { Link, useSearchParams } from 'react-router-dom'

const ChipLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'isActive'
})<{ variant: TagVariant; isActive: boolean }>(({ theme, variant, isActive }) => {
  const baseStyles = {
    display: 'inline-block',
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1.5),
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '0.8rem',
    transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
      duration: theme.transitions.duration.short
    })
  }

  const variants = {
    outlined: {
      border: `1px solid ${theme.palette.primary.main}`,
      color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
      backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    },
    filled: {
      border: '1px solid transparent',
      color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
      backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    },
    paper: {
      border: `1px solid ${theme.palette.background.paper}`,
      color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
      backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.action.hover,
      boxShadow: isActive ? 'none' : theme.shadows[1],
      opacity: isActive ? 1 : 0.8,
      '&:hover': {
        borderColor: theme.palette.background.paper,
        backgroundColor: isActive ? theme.palette.primary.main : theme.palette.background.paper,
        opacity: 1
      }
    },
    soft: {
      border: 'none',
      color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
      backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary.light,
      opacity: isActive ? 1 : 0.8,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        opacity: 1
      }
    }
  }

  return {
    ...baseStyles,
    ...variants[variant]
  }
})

type TagVariant = 'outlined' | 'filled' | 'paper' | 'soft'

interface IAppTagProps {
  tag: string
  variant: TagVariant
  className?: string
}

function AppTag({ tag, variant = 'outlined', className }: IAppTagProps) {
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

  const isActive = searchParams.get('tags')?.split(',').includes(tag.toLowerCase()) || false

  return (
    <ChipLink
      to={`?${searchParams.toString()}`}
      onClick={(e) => {
        e.preventDefault()
        toggleTag()
      }}
      variant={variant}
      isActive={isActive}
      className={className}
    >
      {tag}
    </ChipLink>
  )
}

export default AppTag
