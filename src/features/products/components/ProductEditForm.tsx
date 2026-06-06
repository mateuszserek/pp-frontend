import { useState, type FormEvent } from 'react'
import type { Product, ProductUpdatePayload } from '../types'
import {
  hasProductValidationErrors,
  validateProduct,
  type ProductValidationErrors,
} from '../validation/productValidation'

interface ProductEditFormProps {
  product: Product
  onCancel: () => void
  onSubmit: (product: ProductUpdatePayload) => void
}

export function ProductEditForm({ product, onCancel, onSubmit }: ProductEditFormProps) {
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [errors, setErrors] = useState<ProductValidationErrors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const updatedProduct = {
      name: name.trim(),
      description: description.trim(),
      price,
    }
    const nextErrors = validateProduct(updatedProduct)

    setErrors(nextErrors)

    if (hasProductValidationErrors(nextErrors)) {
      return
    }

    onSubmit({
      id: product.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price,
      createdAt: product.createdAt ?? null,
    })
  }

  return (
    <div>
      <h1>Edytuj produkt</h1>
      <form className="input-area" onSubmit={handleSubmit}>
        <label htmlFor="edit-product-name">Nazwa produktu</label>
        <input
          id="edit-product-name"
          type="text"
          value={name}
          onChange={(event) => {
            setErrors((currentErrors) => ({ ...currentErrors, name: undefined }))
            setName(event.target.value)
          }}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}

        <label htmlFor="edit-product-price">Cena</label>
        <input
          id="edit-product-price"
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(event) => {
            setErrors((currentErrors) => ({ ...currentErrors, price: undefined }))
            setPrice(Number(event.target.value))
          }}
        />
        {errors.price && <p className="form-error">{errors.price}</p>}

        <label htmlFor="edit-product-description">Opis produktu</label>
        <input
          id="edit-product-description"
          type="text"
          value={description}
          onChange={(event) => {
            setErrors((currentErrors) => ({ ...currentErrors, description: undefined }))
            setDescription(event.target.value)
          }}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}

        <button type="submit">Zapisz zmiany</button>
        <button type="button" onClick={onCancel}>
          Anuluj
        </button>
      </form>
    </div>
  )
}
