import { Context } from "@/context/Context"
import { instance } from "@/hook/instance"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

const getProducts = (categoryId: string | null, page: number, limit: number, minPrice: number | null, maxPrice: number | null) => {
    const { token } = useContext(Context)

    const params = { page, limit, category: categoryId, min_price: minPrice, max_price: maxPrice }
    const { data = [] } = useQuery({
        queryKey: ['products', categoryId, page, minPrice, maxPrice],
        queryFn: () => instance().get("/products", { params, headers: {
            Authorization: `Bearer ${token}`
        }}).then(res => res.data)
    })
    return data
}

export default getProducts