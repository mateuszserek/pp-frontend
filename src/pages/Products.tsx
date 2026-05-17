import { useState } from "react"

type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    createdAt: string
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
}