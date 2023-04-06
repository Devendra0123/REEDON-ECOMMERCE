'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import CountdownTimer from './CountdownTimer';
import { client } from '@/utils/sanityClient';

type Product = {
    _id: string,
    name: string,
    image: string[],
    oldPrice: number,
    currentPrice: number,
    categories: any[],
    slug: any,
    customerReview: {
        name: string,
        comment: string,
        rating: number
    }[]
}

const FlashSale = () => {

    const [products, setProducts] = useState<any>()
    const [flashSaleStartDate, setFlashSaleStartDate] = useState<any>();
    const [flashSaleEndDate, setFlashSaleEndDate] = useState<any>()

    const fetchProducts = async () => {
        const query = `*[_type == "product" && 'flash-sale' in categories[]->slug.current]{
      _id,
      name,
      image,
      categories,
      oldPrice,
      currentPrice,
      slug,
      customerReview
  }`
        await client.fetch(query, { cache: 'no-store' }).then((res) => setProducts(res));
    }

    const fetchFlashSaleTime = async () => {
        const query = `*[_type == "flashSaleTmer"][0]{
    fromDate,
    endDate
}`
        await client.fetch(query, { cache: 'no-store' }).then((res) => {
            setFlashSaleStartDate(res.fromDate);
            setFlashSaleEndDate(res.endDate)
        })
    }

    useEffect(() => {
        fetchProducts()
        fetchFlashSaleTime()
    }, [])

    return (
        <div className='bg-slate-300'>
            {/*......Flash Sale Heading ...........*/}
            <div className='flex items-center justify-between lg:justify-evenly p-[10px] pt-[30px]'>
                <p className='text-violet-800 text-2xl font-bold'>
                    FLASH SALE
                </p>
                {/*
                    (flashSaleStartDate && flashSaleEndDate) && (
                        <div className='flex items-center gap-[10px] font-pacifico text-xl'>
                            <CountdownTimer fromDate={flashSaleStartDate} endDate={flashSaleEndDate} />
                        </div>
                    )
                    */ }
            </div>
            {/*.......Flash Sale Products......*/}
            {
                products && (
                    <div className='flex flex-col lg:flex-row items-center lg:justify-center lg:flex-wrap gap-[25px] mt-[10px] p-[10px]'>
                        {
                            products.map((item: Product, index: number) => (
                                <ProductCard key={index} product={item} />
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
}

export default FlashSale