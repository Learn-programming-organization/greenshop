"use client"
import { instance } from "@/hook/instance"
import { useQuery } from "@tanstack/react-query"

const getCategories = () => {
    const params = { page: 1, limit: 1000}
    const { data=[] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => instance().get("/categories", {params}).then(res => [{category_name: "All", category_id: 0}, ...res.data?.categories])
    })

    return data
}

export default getCategories