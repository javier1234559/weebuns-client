import debounce from 'lodash/debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1

interface PaginationParams {
  defaultPage?: number
  defaultPerPage?: number
  debounceDelay?: number
}

const usePagination = ({
  defaultPage = DEFAULT_PAGE,
  defaultPerPage = DEFAULT_PAGE_SIZE,
  debounceDelay = 1500
}: PaginationParams = {}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [page, setPage] = useState<number>(defaultPage)
  const [perPage, setPerPage] = useState<number>(defaultPerPage)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchParam, setSearchParam] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const updateParams = useCallback(
    (newParams: { page?: number; perPage?: number; search?: string; tags?: string[] }) => {
      const urlParams = new URLSearchParams(location.search)

      if (newParams.page) urlParams.set('page', newParams.page.toString())
      if (newParams.perPage) urlParams.set('perPage', newParams.perPage.toString())

      // Handle search param
      if (typeof newParams.search === 'string') {
        if (newParams.search.trim()) {
          urlParams.set('search', newParams.search.trim())
        } else {
          urlParams.delete('search')
        }
      }

      // Handle tags param
      if (newParams.tags) {
        if (newParams.tags.length > 0) {
          urlParams.set('tags', newParams.tags.join(','))
        } else {
          urlParams.delete('tags')
        }
      }

      navigate({ search: urlParams.toString() })
    },
    [location.search, navigate]
  )

  const debouncedUpdateParams = useMemo(
    () =>
      debounce((value: string) => {
        updateParams({ search: value })
        setSearchParam(value.trim()) // Update searchParam only when debounced
      }, debounceDelay),
    [updateParams, debounceDelay]
  )

  // Parse tags from comma-separated string
  const parseTagsFromString = useCallback((tagsString: string | null): string[] => {
    if (!tagsString) return []
    return tagsString
      .split(',')
      .filter(Boolean)
      .map((tag) => tag.toLowerCase())
  }, [])

  // Reset when location changes (e.g., from filters)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pageParam = params.get('page')
    const perPageParam = params.get('perPage')
    const searchParam = params.get('search')
    const tagsParam = params.get('tags')

    if (pageParam) setPage(Number(pageParam))
    if (perPageParam) setPerPage(Number(perPageParam))

    // Handle search params
    if (searchParam) {
      setSearchValue(searchParam)
      setSearchParam(searchParam)
    } else {
      setSearchValue('')
      setSearchParam('')
    }

    // Handle tags
    setTags(parseTagsFromString(tagsParam))
  }, [location.search, parseTagsFromString])

  useEffect(() => {
    return () => {
      debouncedUpdateParams.cancel()
    }
  }, [debouncedUpdateParams])

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value) // Update UI immediately
      debouncedUpdateParams(value) // Debounce URL update and API param
    },
    [debouncedUpdateParams]
  )

  // Add convenience method for updating tags
  const updateTags = useCallback(
    (newTags: string[]) => {
      updateParams({
        tags: newTags,
        page: 1 // Reset to first page when changing tags
      })
    },
    [updateParams]
  )

  // Add tag
  const addTag = useCallback(
    (tag: string) => {
      if (!tags.includes(tag.toLowerCase())) {
        const newTags = [...tags, tag.toLowerCase()]
        updateTags(newTags)
      }
    },
    [tags, updateTags]
  )

  // Remove tag
  const removeTag = useCallback(
    (tag: string) => {
      const newTags = tags.filter((t) => t !== tag.toLowerCase())
      updateTags(newTags)
    },
    [tags, updateTags]
  )

  // Toggle tag
  const toggleTag = useCallback(
    (tag: string) => {
      const lowercaseTag = tag.toLowerCase()
      const newTags = tags.includes(lowercaseTag) ? tags.filter((t) => t !== lowercaseTag) : [...tags, lowercaseTag]
      updateTags(newTags)
    },
    [tags, updateTags]
  )

  return {
    page,
    perPage,
    search: searchValue, // For UI input
    searchParam, // For API calls - only has value when needed
    tags, // Current active tags
    setSearch: handleSearch,
    updateQueryParams: updateParams,
    updateTags,
    addTag,
    removeTag,
    toggleTag
  }
}

export default usePagination
