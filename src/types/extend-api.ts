export type StatusParams = 'draft' | 'published' | 'private' | 'deleted'

export interface PaginationParams {
  page?: number
  perPage?: number
  search?: string

  status?: StatusParams
}
