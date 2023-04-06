import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'
import { TiCancel } from 'react-icons/ti';

const KhaltiPaymentFailure = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center mt-[50px]'>
                <div className='flex items-center gap-[10px]'>
                    <div className='bg-slate-300 w-[3rem] h-[3rem] flex items-center justify-center rounded-full shadow-xl'>
                        <TiCancel className='text-red-500 text-2xl' />
                    </div>
                    <p className='font-poppins text-lg font-bold'>
                        Payment Failed
                    </p>
                </div>
                <div className='cursor-pointer mt-[35px] flex items-center gap-[5px] border-2 border-violet-800 py-[8px] px-[20px]'>
                    <Link href='/checkout/payment' className='text-violet-800 font-poppins font-bold'>
                        Try again
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default KhaltiPaymentFailure