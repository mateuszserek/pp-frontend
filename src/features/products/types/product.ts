export interface Product {
  id: number
  name: string
  price: number
  description: string
  createdAt?: string | null
}

export type ProductPayload = Omit<Product, 'id'>

export interface ProductUpdatePayload {
  id: number
  name: string
  description: string
  price: number
  createdAt: string | null
}
