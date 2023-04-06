'use client'

import useShippingStore from '@/context/shippingContext';
import { useStateContext } from '@/context/stateContext';
import { submitForm } from '@/lib/esewaFormSubmit';
import { deliveryCharge } from '@/utils/data';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { handleOrder } from '@/lib/handleOrder';
import useAuthStore from '@/context/authStore';
import Login from './Login';
import { toast, Toaster } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { generateOrderId } from '@/lib/generateRandomOrderId';

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

const PaymentSection = () => {
    const router = useRouter()

    const { userProfile }: any = useAuthStore();
    const { cartItems, totalQuantities } = useStateContext();
    const { shippingDetails }: any = useShippingStore();

    const [user, setUser] = useState<any>();
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false)
    const [itemsDisplay, setItemsDisplay] = useState<boolean>(false);
    const [cashOnDelivery, setCashOnDelivery] = useState<boolean>(false);
    const [shippingInfo, setShippingInfo] = useState<any>();
    const [cartProducts, setCartProducts] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false)
    /*.....Calculating Total Price......*/
    const [totalPrice, setTotalPrice] = useState<number>(0);
    useEffect(() => {
        setCartProducts(cartItems)
        const paisa = cartItems.reduce((total: number, item: Product) => total + item.currentPrice * item.quantity, 0);
        setTotalPrice(paisa)
    }, [cartItems]);

    useEffect(() => {
        setUser(userProfile);
        setShowLoginDialog(false)
    }, [userProfile])

    useEffect(() => {
        setShippingInfo(shippingDetails)
    }, [shippingDetails])
    /*.......Handle KHALTI PAYMENT.....*/
    const handleKhaltiPayment = () => {
        const amountPaisa = (totalPrice * 100) + (deliveryCharge * 100);
        const orderId = generateOrderId();

        const requestBody = {
            "return_url": `${process.env.NEXT_PUBLIC_WEBSITE_URL}/checkout/payment/payment-success/khalti-payment-success`,
            "website_url": `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            "amount": amountPaisa,
            "purchase_order_id": orderId,
            "purchase_order_name": cartProducts[0].name,
            "customer_info": {
                "name": shippingInfo.customerName,
                "email": shippingInfo.email,
                "phone": shippingInfo.contactNumber
            },
            "product_details": cartProducts.map((item: any) => (
                {
                    "identity": item._id,
                    "name": item.name,
                    "total_price": item.quantity * item.currentPrice * 100,
                    "quantity": item.quantity,
                    "unit_price": item.currentPrice * 100
                }
            ))
        };

        axios
            .post("https://a.khalti.com/api/v2/epayment/initiate/", requestBody, {
                headers: {
                    "Authorization": `Key ${process.env.NEXT_PUBLIC_KHALTI_LIVE_KEY}`
                }
            })
            .then(response => {
                console.log(response)
                window.location.href = response.data.payment_url;
            })
            .catch(error => {
                toast.error(error.message)
            });
    }

    /*...... Handle eSewa PAYMENT......*/
    const handleEsewaPayment = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const amountPaisa = (totalPrice * 100) + (deliveryCharge * 100);
        const deliveryAmount = deliveryCharge * 100;
        const orderId = generateOrderId();

        const path = "https://uat.esewa.com.np/epay/main";
        const params = {
            amt: amountPaisa,
            psc: 0,
            pdc: deliveryAmount,
            txAmt: 0,
            tAmt: amountPaisa,
            pid: orderId,
            scd: `${process.env.NEXT_PUBLIC_ESEWA_SCD_CODE}`,
            su: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/checkout/payment/payment-success/esewa-payment-success`,
            fu: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/checkout/payment/payment-failure/esewa-payment-failure`
        };
        submitForm(path, params);
    };

    /*...Handle CASH ON DELIVERY....*/
    const confirmOrder = async () => {

        if (!user) {
            setShowLoginDialog(true);
            return;
        }
        setLoading(true)
        if (cartItems && shippingDetails && totalQuantities && deliveryCharge && user) {
            const orderId = generateOrderId()
            await handleOrder(orderId, cartItems, totalQuantities, shippingDetails, deliveryCharge, user._id)
            setLoading(false)
            router.push('/order/order-confirmed')
        } else {
            setLoading(false)
            toast.error('Something went wrong');
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <Toaster />
            <div onClick={() => setItemsDisplay(!itemsDisplay)} className='w-[80%] lg:w-6/12 flex flex-col'>
                <div className='bg-yellow-400 flex justify-between p-[10px] text-black mt-[20px] cursor-pointer'>
                    <p className='font-bold font-poppins'>
                        All Details
                    </p>
                    <svg fill="black" width="24" height="24" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498zm4.845 6.711c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z" fillRule="nonzero" /></svg>
                </div>

                {
                    (itemsDisplay && cartItems) && (
                        <div className='flex flex-col font-poppins'>
                            <table className='table-auto'>
                                <tr className='border-b-2 border-indigo-800 text-left'>
                                    <th className='p-[5px]'>Name</th>
                                    <th className='p-[5px]'>Quantity</th>
                                    <th className='p-[5px]'>Price</th>
                                </tr>
                                {
                                    cartItems.map((item: Product, index: number) => (
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

                                {
                                    shippingDetails && (
                                        <div>
                                            <p className='underline underline-offset-4 decoration-violet-800 font-bold py-[5px]'>
                                                Shipping Details
                                            </p>
                                            <ul>
                                                <li>
                                                    Name : {shippingDetails.customerName}
                                                </li>
                                                <li>
                                                    Email : {shippingDetails.email}
                                                </li>
                                                <li>
                                                    Location : {shippingDetails.location}
                                                </li>
                                                <li>
                                                    Contact Number : {shippingDetails.contactNumber}
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {/*....Payment OPTION.....*/}
            <div>
                <p className='text-center font-bold text-xl underline underline-offset-8 decoration-yellow-400 p-[20px]'>
                    Choose Payment Method
                </p>

                <div className='flex flex-col gap-[20px]'>
                    <div onClick={handleKhaltiPayment} className='flex items-center gap-[20px] shadow-xl rounded-xl p-[10px] cursor-pointer'>
                        <p className='underline underline-offset-4 decoration-violet-800 font-poppins'>
                            Pay via Khalti
                        </p>
                        <Image src='/khalti_logo.png' width={150} height={150} className='' alt='khalti_logo' />
                    </div>

                    <div onClick={handleEsewaPayment} className='flex items-center gap-[20px] shadow-xl rounded-xl p-[10px] cursor-pointer'>
                        <p className='underline underline-offset-4 decoration-violet-800 font-poppins'>
                            Pay via eSewa
                        </p>
                        <Image src='/esewa_logo.png' width={150} height={150} className='' alt='khalti_logo' />
                    </div>

                    <div onClick={() => setCashOnDelivery(true)} className='flex items-center gap-[20px] shadow-xl rounded-xl p-[10px] cursor-pointer'>
                        <p className='underline underline-offset-4 decoration-violet-800 font-poppins'>
                            Cash on Delivery
                        </p>
                        <Image src='/cash_on_delivery.jpg' width={150} height={150} className='' alt='khalti_logo' />
                    </div>
                </div>
            </div>

            {/*...CASH ON DELIVERY DIALOGUE...*/}
            {
                cashOnDelivery && (
                    <div style={{ zIndex: '99' }} className='w-[90%] lg:w-max text-center bg-slate-800 text-white p-[20px] fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] flex flex-col items-center gap-[20px]'>
                        <p>
                            Are You sure! Do you want to order via cash on delivery?
                        </p>
                        <div className='flex items-center gap-[20px]'>
                            <div className='text-black bg-yellow-400 px-[15px] py-[8px]'>
                                {
                                    loading ? (
                                        <p>
                                            w a i t ...
                                        </p>
                                    ) : (
                                        <button onClick={confirmOrder}>
                                            Confirm
                                        </button>
                                    )
                                }
                            </div>
                            <button onClick={() => setCashOnDelivery(false)} className='text-black bg-slate-200 px-[15px] py-[8px]'>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }

            {/*....Login User....*/}
            {
                showLoginDialog && (
                    <div className='w-11/12 md:w-8/12 bg-slate-900 flex flex-col items-center p-[10px] pb-[30px]'
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            zIndex: 99,
                            transform: 'translate(-50%,-50%)'
                        }}>
                        <div className='w-full flex justify-end p-[5px]'>
                            <RxCross2 className='w-[2rem] h-[2rem] rounded-full flex items-center justify-center bg-white p-[3px]'
                                onClick={() => setShowLoginDialog(false)} />
                        </div>
                        <p className='text-white p-[10px]'>
                            Please Sign up to place your order
                        </p>
                        <Login />
                    </div>
                )
            }

            {/*...Overlay...*/}
            {
                (showLoginDialog || cashOnDelivery) && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: '100vw',
                        height: '100vh',
                    }}
                        className='z-40 bg-black opacity-75'>

                    </div>
                )
            }
        </div>
    )
}

export default PaymentSection