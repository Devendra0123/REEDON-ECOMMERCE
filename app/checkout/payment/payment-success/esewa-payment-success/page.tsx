'use client'

import Navbar from '@/components/Navbar'
import { GiCheckMark } from 'react-icons/gi'
import { HiShoppingCart } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { handleOrder } from '@/lib/handleOrder'
import { useStateContext } from '@/context/stateContext';
import useShippingStore from '@/context/shippingContext';
import useAuthStore from '@/context/authStore'
import { deliveryCharge } from '@/utils/data'
import Loader from '@/components/Loader'

interface Props {
    searchParams: {
        oid: string,
        amt: number,
        refId: any
    }
}
const EsewaPaymentSuccess = ({ searchParams: { oid, amt, refId } }: Props) => {
    const { cartItems, totalQuantities }: any = useStateContext();
    const { shippingDetails } = useShippingStore();
    const { userProfile }: any = useAuthStore()
    const [cartProducts, setCartProducts] = useState<any>();
    const [shippingInfo, setShippingInfo] = useState<any>();
    const [totalProducts, setTotalProducts] = useState<any>()
    const [processing, setProcessing] = useState<boolean>(true)
    const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
    const [user, setUser] = useState<any>()

    useEffect(() => {
        setCartProducts(cartItems);
        setTotalProducts(totalQuantities)
        setShippingInfo(shippingDetails);
        setUser(userProfile)

        if(!oid){
            setProcessing(false);
            setOrderPlaced(false)
        }
        if (oid && cartProducts && totalProducts && shippingInfo && deliveryCharge && user) {
            try {
                setProcessing(true);
                setOrderPlaced(false)
                handleOrder(oid, cartProducts, totalProducts, shippingInfo, deliveryCharge, user._id)
                setOrderPlaced(true)
                setProcessing(false)
            } catch (error) {
                setOrderPlaced(false);
                setProcessing(false)
            }
        }
    }, [cartItems, shippingDetails, userProfile, totalQuantities])

    return (
        <div>
            <Navbar />

            {
                (orderPlaced && processing === false) ? (
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
                            <Link href={`/order/${user._id}`} className='text-violet-800 font-poppins font-bold'>
                                See your Order
                            </Link>
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
                ) : (orderPlaced === false && processing === false) ? (
                    <div>
                        <p>
                            Something Went Wrong
                        </p>
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
                ) : (
                    <div>
                        <Loader />
                    </div>
                )
            }


            <Footer />
        </div>
    )
}

export default EsewaPaymentSuccess