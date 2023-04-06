import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const CustomerCare = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center mt-[30px]'>
                <p className='font-bold text-2xl'>
                    Customer Support
                </p>
                <p className='font-poppins p-[10px]'>
                    Let us know how can we help you.
                </p>

                <div className='flex flex-col items-center gap-[30px]'>
                    <div className='text-center'>
                        <p className='underline underline-offset-8 decoration-yellow-400 font-medium'>
                            Contact Us
                        </p>
                        <div className='font-poppins pt-[10px] text-lg'>
                            <p>
                                {process.env.NEXT_PUBLIC_CONTACT_NUMBER}
                            </p>
                            <p>
                                {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CustomerCare