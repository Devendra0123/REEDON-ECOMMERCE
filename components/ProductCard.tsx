'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Rating from './Rating'
import { urlFor } from '@/utils/sanityClient'

interface Props {
    product: {
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
}

const ProductCard = ({ product }: Props) => {

    const [rating, setRating] = useState<number>(0)
    const discountPercent = (product.oldPrice - product.currentPrice) / product.oldPrice * 100

    /*...Rating....*/
    useEffect(() => {
        if (product.customerReview?.length > 0) {
          const customerRating = product.customerReview.reduce(
            (total: number, item: any) => total + item.rating,
            0
          );
     
          const rate = Math.floor(customerRating/product.customerReview.length)
          setRating(rate);
        }
      }, [product.customerReview]);

    return (
        <Link href={`/product/${product.slug.current}`} className='max-w-full md:w-[32rem] relative flex gap-[10px] bg-white rounded-lg p-[10px] shadow-xl'>
            <div className='w-[12rem] h-[9rem] relative'>
                <Image src={urlFor(product.image[0]).url()} fill className='object-contain' alt='productImage' />
            </div>
            <div>
                <p className='font-bold text-lg'>
                    {product.name.length > 50 ? product.name.substring(0, 50) + '...' : product.name}
                </p>
                {
                    (product.oldPrice && product.currentPrice) ? (
                        <div className='flex items-center gap-[20px]'>
                            <p className='line-through decoration-yellow-500 decoration-2'>
                                Rs.{product.oldPrice}
                            </p>
                            <p className='text-violet-600 font-bold text-lg'>
                                Rs.{product.currentPrice}
                            </p>
                            <div className='absolute left-[10px] bottom-[10px] bg-gradient-to-l from-transparent to-yellow-600 p-[5px]'>
                                <p className='font-bold'>
                                    {discountPercent.toFixed(2)} % OFF
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>
                                Rs.{product.currentPrice ? product.currentPrice : product.oldPrice}
                            </p>
                        </div>
                    )
                }
                {
                    product.customerReview?.length > 0 && (
                        <Rating ratingValue={rating} NumberOfRating={product.customerReview.length} />
                    )
                }

            </div>
        </Link>
    )
}

export default ProductCard