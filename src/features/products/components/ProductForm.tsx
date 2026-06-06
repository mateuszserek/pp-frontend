import { useState, type FormEvent } from 'react'
import type { ProductPayload } from '../types'
import {
  hasProductValidationErrors,
  validateProduct,
  type ProductValidationErrors,
} from '../validation/productValidation'

interface ProductFormProps {
  product: ProductPayload
  onChange: (product: ProductPayload) => void
  onSubmit: (product: ProductPayload) => void
}

export function ProductForm({ product, onChange, onSubmit }: ProductFormProps) {
  const [errors, setErrors] = useState<ProductValidationErrors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextProduct = {
      ...product,
      name: product.name.trim(),
      description: product.description.trim(),
    }
    const nextErrors = validateProduct(nextProduct)

    setErrors(nextErrors)

    if (hasProductValidationErrors(nextErrors)) {
      return
    }

    onSubmit(nextProduct)
  }

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <label htmlFor="product-name">Nazwa produktu</label>
      <input
        id="product-name"
        type="text"
        value={product.name}
        onChange={(event) => {
          setErrors((currentErrors) => ({ ...currentErrors, name: undefined }))
          onChange({ ...product, name: event.target.value })
        }}
      />
      {errors.name && <p className="form-error">{errors.name}</p>}

      <label htmlFor="product-price">Cena</label>
      <input
        id="product-price"
        type="number"
        min="0.01"
        step="0.01"
        value={product.price}
        onChange={(event) => {
          setErrors((currentErrors) => ({ ...currentErrors, price: undefined }))
          onChange({ ...product, price: Number(event.target.value) })
        }}
      />
      {errors.price && <p className="form-error">{errors.price}</p>}

      <label htmlFor="product-description">Opis produktu</label>
      <input
        id="product-description"
        type="text"
        value={product.description}
        onChange={(event) => {
          setErrors((currentErrors) => ({ ...currentErrors, description: undefined }))
          onChange({ ...product, description: event.target.value })
        }}
      />
      {errors.description && <p className="form-error">{errors.description}</p>}

      <button type="submit">Dodaj produkt</button>
    </form>
  )
}
