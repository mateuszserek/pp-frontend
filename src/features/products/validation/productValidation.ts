import type { ProductPayload } from '../types'

export interface ProductValidationErrors {
  name?: string
  description?: string
  price?: string
}

export function validateProduct(product: ProductPayload): ProductValidationErrors {
  const errors: ProductValidationErrors = {}

  if (!product.name.trim()) {
    errors.name = 'Nazwa produktu nie może być pusta'
  }

  if (!product.description.trim()) {
    errors.description = 'Opis produktu nie może być pusty'
  }

  if (!Number.isFinite(product.price) || product.price <= 0) {
    errors.price = 'Cena musi być większa od 0'
  }

  return errors
}

export function hasProductValidationErrors(errors: ProductValidationErrors) {
  return Object.values(errors).some(Boolean)
}
