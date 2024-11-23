import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useImageSearch } from '~/features/vocabulary/hooks/useImageSearch'

interface VocabItem {
  id: number
  word: string
  phonetics: string
  definition: string
  example: string
  picture: string
  sourceLink: string
}

export const useVocabForm = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [localCurrentItem, setLocalCurrentItem] = useState<VocabItem>({
    id: 0,
    word: '',
    phonetics: '',
    definition: '',
    example: '',
    picture: '',
    sourceLink: ''
  })
  const { imageData, isImageLoading, isImageError } = useImageSearch(searchTerm)

  useEffect(() => {
    if (currentItem) {
      setLocalCurrentItem(currentItem)
    }
  }, [currentItem])

  // Add this effect to update the image URL when imageData changes
  useEffect(() => {
    if (imageData && imageData.src) {
      setLocalCurrentItem((prev) => ({ ...prev, picture: imageData.src.medium }))
    }
  }, [imageData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalCurrentItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleWordInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setSearchTerm(localCurrentItem.word)
    }
  }

  const handleWordInputBlur = () => {
    if (localCurrentItem.word) {
      setSearchTerm(localCurrentItem.word)
    }
  }

  const handleSave = () => {
    if (localCurrentItem.id === 0) {
      const newItem = { ...localCurrentItem, id: Date.now() }
    }
    handleClear()
  }

  const handleClear = () => {
    setLocalCurrentItem({ id: 0, word: '', phonetics: '', definition: '', example: '', picture: '', sourceLink: '' })
    setSearchTerm('') // Clear the search term as well
  }

  const handleDelete = (id: number) => {}

  const handleEdit = (item: VocabItem) => {
    setSearchTerm(item.word) // Set the search term when editing an item
  }

  const handleSaveAll = () => {
    toast.success('All items saved!')
    console.log('Saving all items:', vocabItems)
  }

  return {
    currentItem: localCurrentItem,
    vocabItems,
    isImageLoading,
    isImageError,
    handleInputChange,
    handleWordInputKeyDown,
    handleWordInputBlur,
    handleSave,
    handleClear,
    handleDelete,
    handleEdit,
    handleSaveAll
  }
}
