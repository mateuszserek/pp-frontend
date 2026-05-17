import Opinion from "../dto/OpinionDto"
import { useState } from "react"
import { useEffect } from "react"

export default function ProductDetails({productId,}: {productId: number}) {
    var baseUrl = "http://127.0.0.1:8080/opinions"
    const [opinions, setOpinions] = useState<Opinion[]>([])
    const [loading, setLoading] = useState<Boolean>(true)
    var nextQuery: string | null = null

    useEffect(() => {
        setLoading(true)
        var url = baseUrl
        nextQuery ? (
            url += nextQuery
        ) : (
            url += "?productId=" + productId.toString()
        )

        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setOpinions(data.value)
            nextQuery = data.nextQuery
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setLoading(false)
        })
    }, [])

    return (
        loading ? (
            <p>Loading...</p>
        ): (
            <div>
             {opinions.map((opinion) => (
                <div
                key={opinion.id}
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                }}
                >
                <h3>{opinion.createdBy.firstName} {opinion.createdBy.lastName}</h3>
                <p>Opinion: {opinion.opinion}</p>
                </div>
            ))}
            </div>
        )
    )
}