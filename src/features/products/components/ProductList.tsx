import type { Product } from '../types'

interface ProductListProps {
  products: Product[]
  onDelete: (product: Product) => void
  onEdit: (product: Product) => void
  onShowOpinions: (product: Product) => void
}

export function ProductList({ products, onDelete, onEdit, onShowOpinions }: ProductListProps) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="data-div">
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <button type="button" onClick={() => onShowOpinions(product)}>
            Opinie
          </button>
          <button type="button" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(product)}>
            Usuń produkt
          </button>
        </div>
      ))}
    </>
  )
}
