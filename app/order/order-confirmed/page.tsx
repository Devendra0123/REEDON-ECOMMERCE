'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiShoppingCart } from 'react-icons/hi'
import useAuthStore from '@/context/authStore'

const OrderConfirmed = () => {
    const { userProfile } = useAuthStore();

    const [user, setUser] = useState<any>()

    useEffect(() => {
        setUser(userProfile)
    }, [userProfile])

    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center mt-[30px]'>
                <div>
                    <p className='font-poppins text-lg font-bold text-center'>
                        Your Order has placed <br />successfully!
                    </p>
                    <div className='cursor-pointer mt-[35px] flex items-center gap-[5px] border-2 border-violet-800 py-[8px] px-[20px]'>
                        <HiShoppingCart className='text-xl text-violet-800' />
                        {
                            user && (
                                <Link href={`/order/${user._id}`} className='text-violet-800 font-poppins font-bold'>
                                    See your Order
                                </Link>
                            )
                        }

                    </div>
                </div>

                <div className='mt-[35px]'>
                    <p className='font-poppins font-medium'>
                        Contact Us for any queries.
                    </p>
                    <p className='font-pacifico'>
                        {process.env.NEXT_PUBLIC_CONTACT_NUMBER}
                    </p>
                    <p className='font-poppins font-bold'>
                        {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderConfirmed