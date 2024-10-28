import Pagination, { PaginationProps } from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ChangeEvent } from 'react'

interface PaginationUrlProps extends Omit<PaginationProps, 'onChange' | 'page'> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationUrl({
  currentPage,
  totalPages,
  onPageChange,
  ...paginationProps
}: PaginationUrlProps) {
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange(value)
  }

  return (
    <Stack spacing={2} alignItems='center'>
      <Pagination page={currentPage} count={totalPages} onChange={handleChange} {...paginationProps} />
    </Stack>
  )
}
