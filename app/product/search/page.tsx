'use client'

import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { client } from '@/utils/sanityClient'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SearchProduct = () => {

  const searchParams = useSearchParams();
  
  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<any>()
  const [searchQuery, setSearchQuery] = useState<any>()
  
  const fetchProducts = async () => {
    if(searchQuery){
        setLoading(true)
      const query = `*[_type == "product" && (name match "${searchQuery}**" || productDescription match "${searchQuery}**" || categories[]->categoryName match "${searchQuery}**")]{
    _id,
    name,
    image,
    categories,
    oldPrice,
    currentPrice,
    slug,
    customerReview
}`
  await client.fetch(query).then(res=> setProducts(res))
    setLoading(false)
  }else{
    console.log('Type the name of the products')
  }
  }

  useEffect(() => {
     const search_query = searchParams.get('search_query');
    setSearchQuery(search_query)
    fetchProducts()
  }, [search_query])

  return (
    <div>
      <Navbar />

      {/*....Searched Products......*/}
      <div className='lg:h-screen lg:overflow-y-scroll scrollbar-hide'>
        {
          (loading && !products) ? (
            <div className='mt-[30px] h-[20rem] flex items-center justify-center'>
              <Loader />
            </div>
          ) :(loading === false && products) ? (
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

export default SearchProduct
