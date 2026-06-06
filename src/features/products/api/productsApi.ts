import type { Opinion, PaginatedResponse, Product, ProductPayload, ProductUpdatePayload } from '../types'

const API_URL = 'http://localhost:8080'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const text = await response.text()

  return text ? (JSON.parse(text) as T) : (undefined as T)
}

export function getProducts(query = '') {
  return request<PaginatedResponse<Product>>(`/products${query}`)
}

export function getOpinionsByProduct(productId: number) {
  return request<PaginatedResponse<Opinion>>(`/opinions?productId=${productId}`)
}

export function createProduct(product: ProductPayload) {
  return request<Product>('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
}

export function updateProduct(product: ProductUpdatePayload) {
  return request<Product>('/products', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
}

export async function deleteProduct(productId: number) {
  await request<void>(`/products?id=${productId}`, {
    method: 'DELETE',
  })
}
