import ImageIcon from '@mui/icons-material/Image'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { memo, useState } from 'react'

// Interfaces
interface IAppImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  aspectRatio?: number
  fit?: 'cover' | 'contain' | 'fill'
  rounded?: boolean | number
  className?: string
  priority?: boolean
  blur?: boolean
  onClick?: () => void
}

function AppImage({
  src,
  alt,
  width = '100%',
  height = '100%',
  aspectRatio,
  fit = 'cover',
  rounded = false,
  className,
  priority = false,
  blur = true,
  onClick
}: IAppImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const containerStyles = {
    position: 'relative',
    width,
    height,
    aspectRatio: aspectRatio || 'auto',
    overflow: 'hidden',
    borderRadius: rounded === true ? 1 : rounded || 0,
    bgcolor: 'grey.100',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: onClick && 'scale(1.02)'
    }
  }

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: fit,
    opacity: isLoading ? 0 : 1,
    transition: blur ? 'opacity 0.2s ease-in-out, filter 0.3s ease-in-out' : 'opacity 0.2s ease-in-out',
    filter: isHovered ? 'brightness(0.9)' : 'none'
  }

  const fallbackStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'grey.400',
    width: '20%',
    height: '20%',
    minWidth: 24,
    minHeight: 24
  }

  return (
    <Box
      sx={containerStyles}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <Skeleton
          variant='rectangular'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          animation='wave'
        />
      )}

      {/* Main Image */}
      {!hasError && (
        <Box
          component='img'
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          sx={imageStyles}
        />
      )}

      {/* Fallback for Error */}
      {hasError && (
        <>
          <ImageIcon sx={fallbackStyles} />
        </>
      )}
    </Box>
  )
}

export default memo(AppImage)
