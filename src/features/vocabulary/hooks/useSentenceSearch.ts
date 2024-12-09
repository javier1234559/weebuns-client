import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import dictionaryApi from '~/features/vocabulary/services/dictionaryApi'
import { SearchSentenceResponseDto } from '~/services/api/api-axios'

export const useSentenceSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, error } = useQuery<SearchSentenceResponseDto>({
    queryKey: ['sentence-search', searchQuery],
    queryFn: () => dictionaryApi.sentenceQuery(searchQuery),
    enabled: Boolean(searchQuery)
  })

  const handleSearch = () => {
    setSearchQuery(searchTerm)
  }

  const formatText = (text: string) => {
    return { __html: text }
  }

  return {
    searchTerm,
    setSearchTerm,
    results: data?.sentences || [],
    isLoading,
    error,
    handleSearch,
    formatText
  }
}
