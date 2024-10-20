import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

interface Phonetic {
  text: string
  audio: string
}

interface DictionaryEntry {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[]
}

const fetchDefinition = async (word: string): Promise<DictionaryEntry[]> => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
  if (!response.ok) {
    throw new Error('Word not found')
  }
  return response.json()
}

export const useDictionarySearch = (initialWord: string = '') => {
  const [searchTerm, setSearchTerm] = useState(initialWord)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialWord)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const wordParam = params.get('word')
    if (wordParam) {
      setSearchTerm(wordParam)
      setDebouncedSearchTerm(wordParam)
    }
  }, [])

  const {
    data: definitionData,
    isLoading: isDefinitionLoading,
    isError: isDefinitionError,
    error: definitionError
  } = useQuery<DictionaryEntry[], Error>({
    queryKey: ['definition', debouncedSearchTerm],
    queryFn: () => fetchDefinition(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
    retry: false
  })

  const handleSearch = () => {
    setDebouncedSearchTerm(searchTerm)
    const newUrl = `${window.location.pathname}?word=${encodeURIComponent(searchTerm)}`
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    definitionData,
    isDefinitionLoading,
    isDefinitionError,
    definitionError,
    handleSearch
  }
}
