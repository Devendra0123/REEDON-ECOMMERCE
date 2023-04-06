'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { contactDetails } from '@/utils/data'
import { client } from '@/utils/sanityClient'

const Footer = () => {
    const [categories, setCategories] = useState<any>()
    const fetchCategories = async () => {
        const query = `*[_type == "category"]{
          _id,
          categoryName,
          image,
          slug
      }`

        await client.fetch(query, { next: { revalidate: 60 } }).then(res => setCategories(res));

    }
    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className='bg-slate-700 mt-[70px] text-slate-200'>
            <div className='flex items-center justify-center gap-[20px]'>
                {/*    Logo   */}
                <Link href='/' className='flex items-center w-max'>
                    <Image src='/logo.png' width={80} height={50} alt='logo' />
                </Link>
                <p>
                    Shoppy: Shop for Everything, Anytime
                </p>
            </div>

            <div className='flex flex-col md:flex-row md:justify-evenly gap-[20px] p-[30px]'>
                <div>
                    <p className='font-bold'>
                        Top Categories
                    </p>
                    <div className='font-medium text-lg flex flex-col gap-[6px]'>
                        {
                           categories && categories?.map((item: any, index: any) => (
                                <Link href={`/product/category?category_id=${item.slug.current}`} key={index}>
                                    {item.categoryName}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <p className='font-bold'>
                        Contact Us
                    </p>
                    <ul>
                        <li> {contactDetails.location} </li>
                        <li> {contactDetails.contactNumber} </li>
                        <li> {contactDetails.email} </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Footer