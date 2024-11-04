export type StatusParams = 'draft' | 'public' | 'private' | 'deleted'

export interface PaginationParams {
  page?: number
  perPage?: number
  search?: string

  status?: StatusParams
}
