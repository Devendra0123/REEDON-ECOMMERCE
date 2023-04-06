'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { client } from '@/utils/sanityClient'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { dateFormater } from '@/lib/dateFormater'
import Loader from '@/components/Loader'

interface Props {
  params: {
    userId: string
  }
}

const Orders = ({ params: { userId } }: Props) => {

  const [orderData, setOrderData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  const query = `*[_type == "order" && shippingDetails.userId == '${userId}']{
          _id,
          orderId,
          _createdAt,
          shippingDetails,
          totalQuantity,
          totalPrice,
          deliveryCharge,
          deliveryStatus,
          items[]{
            productQuantity,
            productPrice,
            product->{
               name,
            image,
            currentPrice,
            slug
            }
          }
      }`

  const fetchOrderDetails = async () => {
    setLoading(true)
    const info = await client.fetch(query);
    setLoading(false)
    setOrderData(info)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div>
      <Navbar />
      <p className='font-bold text-2xl p-[15px] pt-[30px] text-center underline underline-offset-8 decoration-yellow-400'>
        Your Orders
      </p>
      {
       (loading===false && orderData?.length > 0) ? (
          <div className='flex flex-col items-center gap-[20px] p-[15px]'>

            {
              orderData.map((item: any, index: number) => (
                <div key={index} className='flex flex-col items-center'>
                  <div className='w-full lg:w-4/5 flex flex-col items-center'>
                    <p className='bg-slate-900 text-white mt-[10px] p-[10px] font-poppins'>
                      Order ID : {item.orderId}
                    </p>

                    <div className='font-pacifico py-[10px] w-full flex flex-col gap-[10px]'>
                      <div className='py-[5px] w-full md:flex md:justify-between'>
                        <p>
                          Delivery Status: {item.deliveryStatus}
                        </p>
                        <p>
                          Ordered Date : {dateFormater(item._createdAt)}
                        </p>
                      </div>
                    </div>
                    <table className='w-full'>
                      <tr className='grow border-b-2 border-indigo-800 text-left'>
                        <th className='p-[5px]'>Name</th>
                        <th className='p-[5px]'>Quantity</th>
                        <th className='p-[5px]'>Price</th>
                      </tr>
                      {
                        item.items.map((product: any, index: any) => (
                          <tr key={index} className="border-b-2">
                            <td className='p-[5px] max-w-[42rem]'>
                              <Link href={`/product/${product.product.slug.current}`}>
                                {index + 1}. {product.product.name}
                              </Link>
                            </td>
                            <td className='p-[5px] text-center'>
                              {product.productQuantity}
                            </td>
                            <td className='p-[5px] text-center'>
                              Rs.{product.productPrice}
                            </td>
                          </tr>

                        ))
                      }
                    </table>
                  </div>
                </div>
              ))
            }

          </div>
        ) : (loading=== false && !orderData) ? (
          <div className='flex flex-col items-center gap-[20px] mt-[50px]'>
            <p className='text-lg font-poppins'>
              No order to show
            </p>
            <Link href='/' className='bg-yellow-400 px-[15px] py-[7px] font-bold text-lg'>
              Shop Now
            </Link>
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

export default Orders
