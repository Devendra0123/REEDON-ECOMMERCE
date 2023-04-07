'use client'
import { client } from '@/utils/sanityClient'
import Link from 'next/link'
import React,{useState, useEffect} from 'react'

const Category = () => {

  const [categories, setCategories] = useState<any>()
    const fetchCategories = async () => {
    const query = `*[_type == "category"]{
      _id,
      categoryName,
      slug
  }`
  
await client.fetch(query, { next: { revalidate: 60 } }).then(res => setCategories(res));
 
  }
    useEffect(()=>{
    fetchCategories();
    },[])

  return (
      <div className='hidden lg:block fixed top-[200px] left-[20px] flex flex-col gap-[10px] bg-slate-800 p-[20px]'>
        {categories && categories.map((item : any, index : number) => (
          <Link href={`/product/category?category_id=${item.slug.current}`} key={index}>
            <p className='p-[5px] font-poppins font-medium text-white text-lg'>
               {item.categoryName}
            </p>
          </Link>
        ))}
      </div>
  )
}

export default Category
