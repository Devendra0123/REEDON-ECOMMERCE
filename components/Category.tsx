
import { client } from '@/utils/sanityClient'
import Link from 'next/link'
import React from 'react'


const fetchCategories = async () => {
  const query = `*[_type == "category"]{
    _id,
    categoryName,
    image,
    slug
}`

  const res = await client.fetch(query, { next: { revalidate: 60 } });
  return res;
}

const Category = async() => {

  const categories : any = await fetchCategories();

  return (
      <div className='hidden lg:block fixed top-[170px] left-[20px] flex flex-col gap-[10px] bg-slate-800 p-[20px]'>
        {categories.map((item : any, index : number) => (
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