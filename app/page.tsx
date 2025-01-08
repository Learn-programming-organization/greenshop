"use client"
import HeroSwiper from "@/components/HeroSwiper";
import ProductItem from "@/components/ProductItem";
import getCategories from "@/service/getCategories";
import getProducts from "@/service/getProducts";
import { CategoryType } from "@/types/CategoryType";
import { ProductType } from "@/types/ProductType";
import { Button, Pagination, Slider } from "antd";
import { useState } from "react";

export default function Home() {
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(6)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [price, setPrice] = useState<number[]>([])

  const [activeItem, setActiveItem] = useState<string>("")
  const categories: CategoryType[] = getCategories()
  const {products, total_count} = getProducts(categoryId, page, limit, minPrice, maxPrice)

  function handleCategoryItemClick(data: CategoryType) {
    setActiveItem(data.category_name)
    if(data.category_name !== "All"){
      setCategoryId(data.category_name)
    }else{
      setCategoryId(null)
    }
  }

  function handlePaginationChange(current: number) {
    setPage(current)
  }

  function handleFilterProductByPrice() {
    setMaxPrice(price[1])
    setMinPrice(price[0])
  }

  return (
      <div>
        <HeroSwiper />
        <div className="flex w-[1250px] mx-auto mt-5">
          <div className="w-[30%] p-[14px] bg-[#FBFBFB]">
            <h2 className="font-bold text-[18px]">Categories</h2>
            <ul>
              {categories.map((item: CategoryType, index: number) => <li onClick={() => handleCategoryItemClick(item)} className={`leading-10 cursor-pointer font-normal text-[15px] ${activeItem === item.category_name && "text-[#46A358] !font-bold"}`} key={index}>{item.category_name}</li>)}
            </ul>
            <div>
              <Slider min={38} max={1600} onChange={(value) => setPrice(value)} range defaultValue={[38, 1235]} />
                <Button onClick={handleFilterProductByPrice} htmlType="button" size="large" type="primary">Filter</Button>
            </div>
          </div>

          <div className="w-[70%] p-3">
            <ul className="flex flex-wrap gap-10 justify-between">
              {products ? products.map((item: ProductType) => <ProductItem item={item} key={item.product_id}/>) : "Empty Product :("}
            </ul>
            <div className="flex justify-end my-5">
              <Pagination onChange={handlePaginationChange} pageSize={limit} defaultCurrent={page} total={total_count}/>
            </div>
          </div>
        </div>
      </div>
  );
}
