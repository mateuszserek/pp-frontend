import type { User } from './user'

export interface Opinion {
  id: number
  productId: number
  createdAt: string
  opinion: string
  createdBy: User
}
