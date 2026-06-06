export interface PaginatedResponse<T> {
  value: T[]
  nextQuery: string | null
}
