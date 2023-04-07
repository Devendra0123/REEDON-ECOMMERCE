'use client'

import React, { useEffect, useState } from 'react'
import { useStateContext } from '@/context/stateContext';
import { deliveryCharge } from '@/utils/data';
import { createOrGetshippingDetails } from '@/context/createOrGetShippingDetails';
import useShippingStore from '@/context/shippingContext';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

type Product = {
    _id: string,
    name: string,
    image: string[],
    oldPrice: number,
    currentPrice: number,
    rating: number,
    numberOfRating: number,
    slug: string,
    numberOfItemsInStock: number,
    productDescription: string[],
    customerReview: {
        name: string,
        comment: string,
        rating: number
    }[],
    quantity: number
}

type ShippingDetails = {
    customerName: string,
    email: string,
    location: string,
    contactNumber: number
}

const ShippingDetails = () => {

    const router = useRouter()

    const { cartItems } = useStateContext();
    const { addShippingDetails, shippingDetails }: any = useShippingStore();

    const [customerDetails, setCustomerDetails] = useState<ShippingDetails>()
    const [customerName, setCustomerName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<number>();
    const [itemsDisplay, setItemsDisplay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [cartProducts, setCartProducts] = useState<any>()
    /*.....Calculating Total Price......*/
    const [totalPrice, setTotalPrice] = useState<number>(0);
    useEffect(() => {
        setCartProducts(cartItems)
        const paisa = cartItems.reduce((total: number, item: Product) => total + item.currentPrice * item.quantity, 0);
        setTotalPrice(paisa)
    }, [cartItems])

    /*.... Check if Shipping details exist .....*/
    useEffect(() => {
        if (shippingDetails) {
            setCustomerDetails(shippingDetails);
        }
        if (customerDetails) {

            setCustomerName(customerDetails.customerName);
            setEmail(customerDetails.email);
            setLocation(customerDetails.location);
            setContactNumber(customerDetails.contactNumber)
        }
    }, [customerDetails])


    /*.....Handle Shipping......*/
    const handleShipping = () => {
        setLoading(true);
        if (customerName && email && location && contactNumber) {

            const customerDetails = {
                customerName,
                email,
                location,
                contactNumber
            }
            createOrGetshippingDetails(customerDetails, addShippingDetails);
            setLoading(false);
            router.push('/checkout/payment')
        } else {
            setLoading(false)
            setMessage('Fill all the required details')
        }
    }

    return (
        <div className='flex flex-col items-center mb-[30px]'>
            <div className='w-full md:w-[30rem] flex flex-col items-center shadow-lg rounded'>
                <div onClick={() => setItemsDisplay(!itemsDisplay)} className='w-full flex flex-col'>
                    <div className='bg-yellow-400 flex justify-between p-[10px] text-black mt-[20px] cursor-pointer'>
                        <p className='font-bold font-poppins'>
                            Your Products Details
                        </p>
                        <svg fill="black" width="24" height="24" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498zm4.845 6.711c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z" fillRule="nonzero" /></svg>
                    </div>

                    {
                        (itemsDisplay && cartProducts) && (
                            <div className='font-poppins px-[10px]'>
                                <table className='table-auto'>
                                    <tr className='border-b-2 border-indigo-800 text-left'>
                                        <th className='p-[5px]'>Name</th>
                                        <th className='p-[5px]'>Quantity</th>
                                        <th className='p-[5px]'>Price</th>
                                    </tr>
                                    {
                                        cartProducts.map((item: Product, index: number) => (
                                            <tr key={index} className="border-b-2">
                                                <td className='p-[5px]'>
                                                    {index + 1}. {item.name}
                                                </td>
                                                <td className='p-[5px] text-center'>
                                                    {item.quantity}
                                                </td>
                                                <td className='p-[5px] text-center'>
                                                    Rs.{item.currentPrice}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                                <div>
                                    <div className='p-[5px] font-pacifico font-medium'>
                                        {
                                            deliveryCharge && (
                                                <p>
                                                    Delivery Charge: Rs.{deliveryCharge}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <div>
                                        {
                                            deliveryCharge ? (
                                                <p className='font-pacifico font-medium p-[5px]'>
                                                    Total Price : Rs.{totalPrice} + Rs.{deliveryCharge} = Rs.{totalPrice + deliveryCharge}
                                                </p>
                                            ) : (
                                                <div>
                                                    <p>
                                                        Total Price
                                                    </p>
                                                    <p>
                                                        {totalPrice}
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>


                <div className='w-full flex flex-col items-center mt-[30px] bg-slate-200 p-[5px] pb-[30px]'>
                    <div className='flex flex-col items-center gap-[10px] py-[15px]'>
                        <svg fill="purple" width="24" height="24" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2 4v16.002c0 .385.22.735.567.902.346.166.758.119 1.058-.121l4.725-3.781h12.65c.552 0 1-.448 1-1v-12.002c0-.552-.448-1-1-1h-18c-.552 0-1 .448-1 1zm18.5 11.502h-12.677l-4.323 3.46v-14.462h17zm-8.502-6.5c.414 0 .75.336.75.75v3.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75zm.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fillRule="nonzero" /></svg>
                        <p className='font-poppins font-medium text-center'>
                            Provide shipping details to place your order
                        </p>
                    </div>

                    <div className='w-[95%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                        <label className='whitespace-nowrap flex items-center gap-[5px] font-bold'>
                            Name :
                            <input className='grow outline-none bg-transparent font-medium font-poppins'
                                onChange={(e) => setCustomerName(e.target.value)}
                                type='text' value={customerName ? customerName : ''} placeholder='Enter full name' />
                        </label>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" /></svg>
                    </div>

                    <div className='w-[95%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                        <label className='whitespace-nowrap flex items-center gap-[5px] font-bold'>
                            Email :
                            <input className='grow outline-none bg-transparent font-medium font-poppins'
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' value={email ? email : ''} placeholder='Enter email' />
                        </label>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='orange' width="24" height="24" viewBox="0 0 24 24"><path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" /></svg>
                    </div>

                    <div className='w-[95%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                        <label className='whitespace-nowrap flex items-center gap-[5px] font-bold'>
                            Location :
                            <input className='grow outline-none bg-transparent font-medium font-poppins'
                                onChange={(e) => setLocation(e.target.value)}
                                type='text' value={location ? location : ''} placeholder='Enter Location' />
                        </label>
                        <svg width="24" height="24" fill='orange' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" /></svg>
                    </div>

                    <div className='w-[95%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                        <label className='whitespace-nowrap flex items-center gap-[5px] font-bold'>
                            Contact Number :
                            <input className='grow outline-none bg-transparent font-medium font-poppins'
                                type='number' value={contactNumber ? contactNumber : ''}
                                onChange={(e) => setContactNumber(parseInt(e.target.value))}
                                placeholder='Enter Contact Number' />
                        </label>
                        <svg width="24" height="24" fill='orange' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376" /></svg>
                    </div>

                    {
                        message && (
                            <p className='text-red-500 py-[5px]'>
                                * {message}
                            </p>
                        )
                    }


                    <div className='w-[95%] bg-yellow-400 rounded-t-lg p-[10px]'>
                        <p className='font-[poppins] p-[10px]'>
                            Check your details carefully.
                        </p>

                        <div className='font-poppins text-lg font-bold flex justify-center items-center bg-violet-800 text-white text-center w-full py-[8px]'>
                            {
                                loading ? (
                                    <p>
                                        w a i t . . .
                                    </p>
                                ) : (
                                    <div className='cursor-pointer'>
                                        <p onClick={handleShipping}>C o n t i n u e</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingDetails
