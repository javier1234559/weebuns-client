import { useQuery } from '@tanstack/react-query'

import { globalConfig } from '~/config'

interface PexelsImage {
  id: number
  src: {
    medium: string
  }
  alt: string
  photographer: string
  photographer_url: string
}

const PEXELS_API_KEY = globalConfig.PEXELS_API_KEY

const fetchRelatedImage = async (word: string): Promise<PexelsImage> => {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(word)}&per_page=1`, {
    headers: {
      Authorization: PEXELS_API_KEY
    }
  })
  if (!response.ok) {
    throw new Error('Image not found')
  }
  const data = await response.json()
  return data.photos[0]
}

export const useImageSearch = (searchTerm: string) => {
  const {
    data: imageData,
    isLoading: isImageLoading,
    isError: isImageError
  } = useQuery<PexelsImage, Error>({
    queryKey: ['image', searchTerm],
    queryFn: () => fetchRelatedImage(searchTerm),
    enabled: !!searchTerm,
    retry: false
  })

  return { imageData, isImageLoading, isImageError }
}
