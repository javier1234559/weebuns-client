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
  debounceDelay = 500
}: PaginationParams = {}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [page, setPage] = useState<number>(defaultPage)
  const [perPage, setPerPage] = useState<number>(defaultPerPage)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchParam, setSearchParam] = useState<string>('')

  const updateParams = useCallback(
    (newParams: { page?: number; perPage?: number; search?: string }) => {
      const urlParams = new URLSearchParams(location.search)

      if (newParams.page) urlParams.set('page', newParams.page.toString())
      if (newParams.perPage) urlParams.set('perPage', newParams.perPage.toString())
      if (typeof newParams.search === 'string') {
        if (newParams.search.trim()) {
          urlParams.set('search', newParams.search.trim())
        } else {
          urlParams.delete('search')
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

  // Reset when location changes (e.g., from filters)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pageParam = params.get('page')
    const perPageParam = params.get('perPage')
    const searchParam = params.get('search')

    if (pageParam) setPage(Number(pageParam))
    if (perPageParam) setPerPage(Number(perPageParam))

    // Only update search states if search param exists and has value
    if (searchParam) {
      setSearchValue(searchParam)
      setSearchParam(searchParam)
    } else {
      setSearchValue('')
      setSearchParam('')
    }
  }, [location.search])

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

  return {
    page,
    perPage,
    search: searchValue, // For UI input
    searchParam, // For API calls - only has value when needed
    setSearch: handleSearch,
    updateQueryParams: updateParams
  }
}

export default usePagination
