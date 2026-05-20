import Product from '../dto/ProductDto'
import Opinion from '../dto/OpinionDto'
import { useState, useEffect } from 'react'

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [opinions, setOpinions] = useState<Opinion[]>([])
    const [inputProductName, setInputProductName] = useState<string>("")
    const [inputProductPrice, setInputPrice] = useState<number>(0.0)
    const [inputProductDescription, setInputDescription] = useState<string>("")

    var API = "http://localhost:8080/"
    var baseUrl = "products"
    var opinionsUrl = "opinions"
    let nextQuery: string | null = null
    let nextOpinionQuery: string | null = null

    useEffect(() => {
    setIsLoading(true)
    var url = API + baseUrl
    if (nextQuery != null) {
        url += nextQuery
    }
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        setProducts(data.value)
        nextQuery = data.nextQuery
        setIsLoading(false)
    })
    .catch((error) => {
        console.error(error)
        setIsLoading(false)
    })
}, [])

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
            setIsLoading(true)
            var url = API + opinionsUrl 
            if (nextOpinionQuery != null) {
                url += nextOpinionQuery
            } else {
                url += "?productId=" + product.id
            }
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
            console.log(data)
            setOpinions(data.value)
            nextOpinionQuery = data.nextQuery
            setIsLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setIsLoading(false)
        })
    }

    const handleDeleteClick = (product: Product) => {
        var url = API + baseUrl + "?id=" + product.id
        fetch(url, { method: 'DELETE' })
        .then(res => {
            if (res.status == 200) {
                setProducts(products.filter(prod => prod.id !== product.id))
            } else {
                alert("Wystąpił błąd")
            }
        })
    }

    const resetInputs = () => {
        setInputDescription("")
        setInputPrice(0.0)
        setInputProductName("")
    }

    const addProduct = () => {
        var url = API + baseUrl 
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": inputProductName,
                "description": inputProductDescription,
                "price": inputProductPrice
            }
        )
        }).then(res => {
            if (res.status == 200) {
                resetInputs()
            }
            return res.json()
        }).then(data => {
            console.log(data)
            setProducts((current) => [...current, data])
        })
    }

    return (
        <div>
        <h1>Products Page</h1>

        {selectedProduct ? (
            <div>
                <p>{selectedProduct.name}</p>
                <button onClick = {() => setSelectedProduct(null)}>Powrót</button>
                {isLoading ? (
                    <p>loading...</p>
                ): (
                    opinions.map((opinion: Opinion) => (
                        <div 
                        key = {opinion.id}
                        className = {"data-div"}>
                        <p>{opinion.opinion}</p>
                        <p>{opinion.createdBy.firstName} {opinion.createdBy.lastName}</p>
                    </div>
                    ))
                )}
            </div>
        ) : (
            isLoading ? (
            <p>Loading...</p>
        ) : (
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px'
                }}>
                    <label>Nazwa produktu</label>
                    <input 
                        type = "text" 
                        value={inputProductName} 
                        onChange={(e) => setInputProductName(e.target.value)}>
                    </input>
                    <label>Cena</label>
                    <input 
                        type = "number" 
                        step={'0.01'} 
                        value = {inputProductPrice}
                        onChange={(e) => setInputPrice(Number(e.target.value))}>
                    </input>
                    <label>Opis produktu</label>
                    <input 
                        type = "text"
                        value = {inputProductDescription}
                        onChange={(e) => setInputDescription(e.target.value)}>
                    </input>
                    <button onClick = {() => addProduct()}>Dodaj produkt</button>
                </div>
            {products.map((product) => (
                <div
                key={product.id}
                className = {"data-div"}
                >
                    <h3>{product.name}</h3>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.description}</p>
                    <button onClick={() => handleProductClick(product)}>Opinie</button>
                    <button onClick = {() => handleDeleteClick(product)}>Usuń produkt</button>
                </div>
            ))}
            </div>
        )
        )}
        </div>
    )
}