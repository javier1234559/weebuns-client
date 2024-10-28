import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1

interface PaginationParams {
  defaultPage?: number
  defaultPerPage?: number
}

const usePagination = ({ defaultPage = DEFAULT_PAGE, defaultPerPage = DEFAULT_PAGE_SIZE }: PaginationParams = {}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [page, setPage] = useState<number>(defaultPage)
  const [perPage, setPerPage] = useState<number>(defaultPerPage)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pageParam = params.get('page')
    const perPageParam = params.get('perPage')
    const searchParam = params.get('search')

    if (pageParam) setPage(Number(pageParam))
    if (perPageParam) setPerPage(Number(perPageParam))
    if (searchParam) setSearch(searchParam)
  }, [location.search])

  const updateQueryParams = (newParams: { page?: number; perPage?: number; search?: string }) => {
    const params = new URLSearchParams(location.search)

    if (newParams.page !== undefined) params.set('page', newParams.page.toString())
    if (newParams.perPage !== undefined) params.set('perPage', newParams.perPage.toString())
    if (newParams.search !== undefined) params.set('search', newParams.search)

    navigate({ search: params.toString() })
  }

  return { page, perPage, search, updateQueryParams }
}

export default usePagination
