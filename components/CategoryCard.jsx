
import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/utils/sanityClient'

    const fetchCategories = async () => {
    const query = `*[_type == "category"]{
      _id,
      categoryName,
      image,
      slug
  }`
  
   const response = await client.fetch(query, { next: { revalidate: 60 } }).then(res => res);
   return response;
  }
export default function CategoryCard(){

   const categories = fetchCategories()

  return (
    <div className='w-full bg-slate-500 p-[20px] pt-[40px] flex justify-center items-center flex-wrap gap-[30px] lg:gap-[50px] mt-[0px]'>
{
   categories && categories.map((item,index)=>(
        <Link href={`/product/category?category_id=${item.slug.current}`} key={index} className='z-10 relative'>
            <p className='font-medium text-lg bg-gradient-to-r from-yellow-500 to-transparent p-[5px] rounded-t-lg'>
                {item.categoryName}
            </p>
            <div className='relative w-[12rem] h-[14rem] lg:w-[17rem] lg:h-[20rem]'>
            <Image src={urlFor(item.image).url()} fill className='object-cover rounded-b-xl' alt='category' />
            </div>
            <button className='absolute bottom-[25px] right-[0px] bg-slate-800 text-white p-[5px]'>
                Shop Now
            </button>
        </Link>
    ))
}
    </div>
  )
}
