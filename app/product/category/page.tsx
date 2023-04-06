'use client'

import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { client } from '@/utils/sanityClient'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import Link from 'next/link'

interface Props {
  searchParams: {
    category_id: string
  }
}
const CategoryProducts = ({ searchParams: { category_id } }: Props) => {

  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<any>()
 
const fetchProducts = async (category_id) => {
  setLoading(true)
   const query = `*[_type == "product" && '${category_id}' in categories[]->slug.current]{
    _id,
    name,
    image,
    categories,
    oldPrice,
    currentPrice,
    slug,
    customerReview
}`
  await client.fetch(query, { cache: 'no-store' }).then((res)=> {
    console.log(res)
    setProducts(res)
    setLoading(false)
  }
   )
}

  useEffect(() => {
    fetchProducts(category_id)
  }, [category_id])

  console.log(category_id)
  return (
    <div>
    <Navbar />

    {/*....category Products......*/}
    <div className='lg:h-screen lg:overflow-y-scroll scrollbar-hide'>
    {
          (loading && !products) ? (
            <div className='mt-[30px] h-[20rem] flex items-center justify-center'>
              <Loader />
            </div>
          ) : (loading === false && products) ? (
                  <div className='lg:w-4/5 lg:relative lg:left-[250px] lg:top-[20px] flex flex-col lg:flex-row items-center lg:items-start lg:flex-wrap gap-[25px] mt-[10px] p-[10px]'>
                    {
                      products.map((item: any, index: number) => (
                        <ProductCard key={index} product={item} />
                      ))
                    }
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-[20px]'>
                    <p className='text-center pt-[30px] font-bold'>
                      No Products found
                    </p>
                    <Link href='/' className='bg-yellow-400 px-[20px] py-[8px] font-medium font-pacifico'>
                      Shop now
                    </Link>
                  </div>
                )
        }
    </div>

    <Footer />
  </div>
  )
}

export default CategoryProducts
