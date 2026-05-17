import { useEffect, useState } from 'react'
import Product from '../dto/ProductDto'

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

    var baseUrl = "http://localhost:8080/products"
    let nextQuery: string | null = null

    useEffect(() => {
        var url = baseUrl
        if (nextQuery != null) {
            url += nextQuery
        }
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.value)
            nextQuery = data.nextQuery
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setLoading(false)
        })
    }, [])

    return (
        <div>
        <dialog>
            
        </dialog>   
        <h1>Products Page</h1>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
            {products.map((product) => (
                <div
                key={product.id}
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                }}
                >
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    )
}