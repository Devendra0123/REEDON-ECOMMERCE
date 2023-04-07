import React, { useEffect, useState } from 'react'
import { useStateContext } from '@/context/stateContext';
import { RxCross2 } from 'react-icons/rx';
import { deliveryCharge } from '@/utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/utils/sanityClient';

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
const Cart = () => {

  const { showCart, setShowCart, setShowOverlay, cartItems, onRemove } = useStateContext();

  /*.....Calculating Total Price......*/
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    const paisa = cartItems.reduce((total: number, item: Product) => total + item.currentPrice * item.quantity, 0);
    setTotalPrice(paisa)
  }, [cartItems])


  /*........ Close Review Box on clicking display screen ......*/
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;

    if (!target.closest("#cart")) {
      setShowCart(false);
      setShowOverlay(false)
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      handleClick(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showCart]);

  //.....Remove items from Cat.....*/
  const removeItemFromCart = (product: Product) => {
    setShowCart(true);
    onRemove(product)
  }

  if (showCart === false) {
    return null
  }

  setShowOverlay(true)
  return (
    <div
      id='cart'
      className='w-10/12 lg:w-4/12 h-screen bg-slate-800 p-[10px]'
      style={{
        position: 'fixed',
        top: `0px`,
        right: '0px',
        zIndex: 99,
      }}>
      <div className='w-full flex justify-end p-[5px]'>
        <RxCross2 className='w-[2rem] h-[2rem] rounded-full flex items-center justify-center bg-white p-[3px] cursor-pointer'
          onClick={() => {
            setShowOverlay(false)
            setShowCart(false)
          }} />
      </div>

      <p className='text-white font-bold text-2xl text-center'>
        Your Cart
      </p>
      {/*....Cart Items......*/}
      {
        cartItems?.length > 0 ? (
          <div className='h-3/4 w-full overflow-y-scroll flex flex-col items-center gap-[10px] py-[20px] pb-[50px] scrollbar-hide'>
            {
              cartItems.map((item: any, index: number) => (
                <div key={index} className='w-[95%] flex items-center gap-[10px] bg-white p-[10px] rounded-lg shadow-xl'>
                  <div className='relative w-[9rem] h-[5rem]'>
                  <Image src={urlFor(item.image[0]).url()} fill className='object-contain rounded-xl' alt='productImage' />
                  </div>
                  <div className='text-black'>
                    <Link href={`/product/${item.slug.current}`} onClick={()=> setShowCart(false)}>
                      <p>
                        {item.name.length > 50 ? item.name.substring(0, 50) + '...' : item.name}
                      </p>
                    </Link>
                    {
                      (item.oldPrice && item.currentPrice) ? (
                        <div className='flex items-center gap-[20px]'>
                          <p className='line-through decoration-yellow-500 decoration-2'>
                            Rs.{item.oldPrice}
                          </p>
                          <p className='text-violet-600 font-bold text-lg'>
                            Rs.{item.currentPrice}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>
                            Rs.{item.currentPrice ? item.currentPrice : item.oldPrice}
                          </p>
                        </div>
                      )
                    }

                    <div className='flex items-center mt-[10px]'>
                      <div className='p-[2px] flex items-center justify-center bg-slate-800 font-medium text-lg text-white'>
                        Quantity: {item.quantity}
                      </div>
                    </div>

                    <div>
                      <p onClick={() => removeItemFromCart(item)} className='text-red-400 cursor-pointer'>
                        remove
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }
            <div className='flex flex-col gap-[10px] fixed bottom-0 bg-yellow-400 w-10/12 lg:w-4/12 p-[10px] rounded-t-lg'>
              <p className='font-pacifico font-medum'>
                Delivery Charge : Rs.{deliveryCharge}
              </p>
              <p className='font-pacifico font-medium'>
                Total : Rs.{totalPrice} + Rs.{deliveryCharge} = Rs.{totalPrice + deliveryCharge}
              </p>
              <Link href='/checkout/shipping-details' onClick={()=> setShowCart(false)} className='bg-violet-800 px-[15px] py-[8px] font-poppins text-white text-center'>
                Place Order
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-[20px]'>
            <p className='text-white'>
              No items in cart
            </p>
            <button className='bg-yellow-500 px-[15px] py-[7px] font-medium'>
              Shop Now
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Cart
