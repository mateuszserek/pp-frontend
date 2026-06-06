import { useEffect, useState } from 'react'
import {
  createProduct,
  deleteProduct,
  getOpinionsByProduct,
  getProducts,
  updateProduct,
} from '../features/products/api/productsApi'
import { ProductEditForm, ProductForm, ProductList, ProductOpinions } from '../features/products/components'
import type { Opinion, Product, ProductPayload, ProductUpdatePayload } from '../features/products/types'

const emptyProductForm: ProductPayload = {
  name: '',
  price: 0,
  description: '',
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editedProduct, setEditedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [opinions, setOpinions] = useState<Opinion[]>([])
  const [nextProductsQuery, setNextProductsQuery] = useState<string | null>(null)
  const [productForm, setProductForm] = useState<ProductPayload>(emptyProductForm)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false)
  const [isLoadingOpinions, setIsLoadingOpinions] = useState(false)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.value)
        setNextProductsQuery(data.nextQuery)
      })
      .catch((error: unknown) => {
        console.error(error)
        alert('Wystąpił błąd podczas ładowania produktów')
      })
      .finally(() => setIsLoadingProducts(false))
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsLoadingOpinions(true)

    getOpinionsByProduct(product.id)
      .then((data) => setOpinions(data.value))
      .catch((error: unknown) => {
        console.error(error)
        alert('Wystąpił błąd podczas pobierania opinii')
      })
      .finally(() => setIsLoadingOpinions(false))
  }

  const handleDeleteClick = (product: Product) => {
    deleteProduct(product.id)
      .then(() => setProducts((currentProducts) => currentProducts.filter((item) => item.id !== product.id)))
      .catch((error: unknown) => {
        console.error(error)
        alert('Wystąpił błąd podczas usuwania produktu')
      })
  }

  const handleLoadMoreProducts = () => {
    if (!nextProductsQuery) {
      return
    }

    setIsLoadingMoreProducts(true)

    getProducts(nextProductsQuery)
      .then((data) => {
        setProducts((currentProducts) => [...currentProducts, ...data.value])
        setNextProductsQuery(data.nextQuery)
      })
      .catch((error: unknown) => {
        console.error(error)
        alert('Wystąpił błąd podczas ładowania kolejnej strony produktów')
      })
      .finally(() => setIsLoadingMoreProducts(false))
  }

  const handleAddProduct = (product: ProductPayload) => {
    createProduct(product)
      .then((createdProduct) => {
        setProductForm(emptyProductForm)
        setProducts((currentProducts) => [...currentProducts, createdProduct])
      })
      .catch((error: unknown) => {
        console.error(error)
        alert('Wystąpił błąd podczas dodawania nowego produktu')
      })
  }

  const handleUpdateProduct = (product: ProductUpdatePayload) => {
    updateProduct(product)
      .then((updatedProduct) => {
        setProducts((currentProducts) =>
          currentProducts.map((currentProduct) =>
            currentProduct.id === updatedProduct.id ? updatedProduct : currentProduct,
          ),
        )
        setEditedProduct(null)
      })
      .catch((error: unknown) => {
        console.error(error)
        alert('Wystąpił błąd podczas edycji produktu')
      })
  }

  if (selectedProduct) {
    return (
      <ProductOpinions
        isLoading={isLoadingOpinions}
        opinions={opinions}
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    )
  }

  if (editedProduct) {
    return (
      <ProductEditForm
        product={editedProduct}
        onCancel={() => setEditedProduct(null)}
        onSubmit={handleUpdateProduct}
      />
    )
  }

  return (
    <div>
      <h1>Products Page</h1>

      {isLoadingProducts ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-center">
          <ProductForm product={productForm} onChange={setProductForm} onSubmit={handleAddProduct} />
          <ProductList
            products={products}
            onDelete={handleDeleteClick}
            onEdit={setEditedProduct}
            onShowOpinions={handleProductClick}
          />
          {nextProductsQuery && (
            <button type="button" onClick={handleLoadMoreProducts} disabled={isLoadingMoreProducts}>
              {isLoadingMoreProducts ? 'Loading...' : 'Load more'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
