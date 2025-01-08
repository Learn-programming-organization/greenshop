import { Context } from '@/context/Context'
import { instance } from '@/hook/instance'
import { BasketIcon, LikeIcon } from '@/icons'
import { ProductType } from '@/types/ProductType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ProductItem: React.FC<{item: ProductType}> = ({ item }) => {
  const { token } = useContext(Context)
  const queryClient = useQueryClient()
  const basketMutation = useMutation({
    mutationFn: (data:{productId: string}) => instance().post("/basket", data, {headers: {Authorization: `Bearer ${token}`}}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']})
      queryClient.invalidateQueries({queryKey: ['basketCount']})
    }
  })
  const likeMutation = useMutation({
    mutationFn: (id: string) => instance().post(`/like/${id}`, {}, { headers: {
      Authorization: `Bearer ${token}`
    }}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']})
    }
  })


  return (
    <li>
        <Toaster position='top-center' reverseOrder={false} />
        <Image style={{width: "250px", height: "250px"}} priority src={item.image_url ? item.image_url[0]: "/logo.svg"} alt='Product Image' width={250} height={250}/>
        <h3 className='text-[16px] font-normal my-3'>{item.product_name}</h3>
        <div className='space-x-5'>
          <strong>${item.discount}</strong>
          <strong className='line-through'>${item.cost ? item.cost : ""}</strong>
        </div>
        <div className='flex items-center gap-5 py-2 cursor-pointer'>
          <button className={`${item.basket ? "text-[#46A358]" : ""} cursor-pointer`} onClick={() => token ? basketMutation.mutate({productId: item.product_id}) : toast.error("Logindan o'tish shart")}><BasketIcon /></button>
          <button className={`${item.liked ? "text-red-500" : ""} cursor-pointer`} onClick={() => likeMutation.mutate(item.product_id)}>
            <LikeIcon isLiked={item.liked} />
          </button>
        </div>
    </li>
  )
}

export default ProductItem