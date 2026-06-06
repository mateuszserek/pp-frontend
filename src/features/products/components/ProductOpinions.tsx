import type { Opinion, Product } from '../types'

interface ProductOpinionsProps {
  isLoading: boolean
  opinions: Opinion[]
  product: Product
  onBack: () => void
}

export function ProductOpinions({ isLoading, opinions, product, onBack }: ProductOpinionsProps) {
  return (
    <div>
      <p>{product.name}</p>
      <button type="button" onClick={onBack}>
        Powrót
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        opinions.map((opinion) => (
          <div key={opinion.id} className="data-div">
            <p>{opinion.opinion}</p>
            <p>
              {opinion.createdBy.firstName} {opinion.createdBy.lastName}
            </p>
          </div>
        ))
      )}
    </div>
  )
}
