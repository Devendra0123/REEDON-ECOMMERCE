import Navbar from '@/components/Navbar'
import { GiCheckMark } from 'react-icons/gi'
import { HiShoppingCart } from 'react-icons/hi'
import React from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'

const PaymentSuccess = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center mt-[50px]'>
                <div className='flex items-center gap-[10px]'>
                    <div className='bg-slate-300 w-[3rem] h-[3rem] flex items-center justify-center rounded-full shadow-xl'>
                        <GiCheckMark className='text-green-500 text-2xl' />
                    </div>
                    <p className='font-poppins text-lg font-bold'>
                        Payment Successful
                    </p>
                </div>
                <div className='cursor-pointer mt-[35px] flex items-center gap-[5px] border-2 border-violet-800 py-[8px] px-[20px]'>
                    <HiShoppingCart className='text-xl text-violet-800' />
                    <Link href='/order' className='text-violet-800 font-poppins font-bold'>
                        See your Order
                    </Link>
                </div>

                <div className='mt-[35px]'>
                    <p className='font-poppins font-medium'>
                        Contact Us for any queries.
                    </p>
                    <p className='font-pacifico'>
                        {process.env.CONTACT_NUMBER}
                    </p>
                    <p className='font-poppins font-bold'>
                        {process.env.EMAIL_ADDRESS}
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PaymentSuccess