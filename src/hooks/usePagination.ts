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
        if (newParams.search) {
          urlParams.set('search', newParams.search)
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
        setSearchParam(value)
      }, debounceDelay),
    [updateParams]
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pageParam = params.get('page')
    const perPageParam = params.get('perPage')
    const searchParam = params.get('search')

    if (pageParam) setPage(Number(pageParam))
    if (perPageParam) setPerPage(Number(perPageParam))
    if (searchParam) {
      setSearchParam(searchParam)
      setSearchValue(searchParam)
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
      debouncedUpdateParams(value) // Debounce URL update
    },
    [debouncedUpdateParams]
  )

  return {
    page,
    perPage,
    search: searchValue, // For UI input
    searchParam, // For API calls
    setSearch: handleSearch,
    updateQueryParams: updateParams
  }
}

export default usePagination
