'use client'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { GoLocation } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import CustomerReview from '@/components/CustomerReview';
import { deliveryLocation } from '@/utils/data';
import ReviewBox from '@/components/ReviewBox';
import useAuthStore from '@/context/authStore';
import { toast, Toaster } from 'react-hot-toast';
import { useStateContext } from '@/context/stateContext';
import Image from 'next/image';
import { client, urlFor } from '@/utils/sanityClient';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

interface Props {
  params: {
    productId: string
  }
}

interface Product {
  _id: string,
  name: string,
  image: any[],
  oldPrice: number,
  currentPrice: number,
  slug: string,
  numberOfItemInStock: number,
  productDescription: string[],
  customerReview: {
    name: string,
    comment: string,
    rating: number
  }[]
}

const ProductDetails = ({ params: { productId } }: Props) => {

  const query = `*[_type == "product" && slug.current == '${productId}'][0]{
    _id,
    _rev,
    name,
    image,
    productDescription,
    oldPrice,
    currentPrice,
    numberOfItemInStock,
    slug,
    customerReview
}`

  const fetchProductDetails = async () => {
    const info = await client.fetch(query)
    setProduct(info)
  }
  const { userProfile }: any = useAuthStore();
  const { onAdd, setShowCart } = useStateContext();

  const [user, setUser] = useState<any>(null)
  const [product, setProduct] = useState<Product>();
  const [mainImage, setMainImage] = useState<any>();
  const [reviewDialog, setReviewDialog] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  fetchProductDetails();


  useEffect(() => {

    if (product) {
      setMainImage(product.image[0])
    }
  }, [product])

  /*.....Set USER.....*/
  useEffect(() => {
    if (userProfile) {
      setUser(userProfile)
    }
  }, [userProfile])

  /*.....Handle Review Box......*/
  const handleReviewBox = () => {
    setReviewDialog(true)
  }

  /*........ Close Review Box on clicking display screen ......*/
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;

    if (!target.closest("#reviewBox")) {
      setReviewDialog(false);
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
  }, [reviewDialog]);

  /*..... Icrease Quantity......*/
  const increaseQuantity = () => {
    if (product) {
      if (quantity < product.numberOfItemInStock) {
        setQuantity(prev => prev + 1)
      } else {
        toast.error('No more items in stock.')
      }
    }
  }
  /*....Desrease Quantity.....*/
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    } else {
      toast.error('Items can not be less than 1')
    }
  }

  /*....Handle BUY.....*/
  const handleBuyNow = () => {
    onAdd(product, quantity);
    setShowCart(true);
  }

  /*....Submit Review.....*/
  const submitReview = async (rating: number, comment: string) => {

    if (product?._id && user) {
      const id = new Date().toString();
      await client.patch(product._id)
        .setIfMissing({ customerReview: [] })
        .insert('before', 'customerReview[0]', [
          {
            _key: id,
            name: user.userName,
            comment: comment,
            rating: rating
          }
        ])
        .commit()
        .then(() => {
          setReviewDialog(false)
          toast.success(`Your Feeback is submitted`)
          fetchProductDetails();
        })
    }

  }

  return (
    <div id='mainDiv' className='relative'>
      <Toaster />
      <Navbar />

      {
        product ? (
          <div className='flex flex-col lg:flex-row lg:justify-center lg:gap-[30px] p-[15px] pt-[20px]'>
            <div className='lg:w-1/2 lg:flex lg:flex-col lg:items-center'>
              {/*.....Image Section......*/}
              <p className='lg:max-w-md font-bold text-lg text-center underline decoration-violet-600 underline-offset-8'>
                {product.name}
              </p>
              {
                mainImage && (
                  <div className='relative w-full lg:w-[25rem] h-[20rem] mt-[10px]'>
                    <Image src={urlFor(mainImage).url()} fill className='object-contain' alt='product_image' />
                  </div>
                )
              }
              <div className='flex items-center gap-[5px] overflow-x-scroller scrollbar-hide mt-[10px]'>
                {
                  product.image.map((item: any, index: number) => (
                    <div key={index}  onClick={() => setMainImage(item)} className='relative w-[5rem] h-[5rem] bg-slate-400 p-[3px] relative flex items-center justify-center rounded-xl'>
                      <Image src={urlFor(item).url()} key={index} fill alt='product_image' className='object-contain rounded-lg' />
                    </div>
                  ))
                }
              </div>
            </div>
            {/*.... In STOCK or Out Of STOCK.....*/}
            <div className='lg:w-1/2 mt-[20px]'>
              <div>
                {
                  product.numberOfItemInStock > 0 ? (
                    <div>
                      <p className='font-bold text-red-900'>
                        Available in Stock
                      </p>
                      <div className='flex items-center gap-[5px]'>
                        <GoLocation />
                        <p>
                          Deliver all over {deliveryLocation}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className='font-bold text-red-900'>
                        Currently unavailable
                      </p>
                      <p>
                        This product will be available in our stock soon.
                      </p>
                    </div>
                  )
                }
              </div>
              {/*......Product Price.......*/}
              <div className='mt-[10px]'>
                <p className='font-bold text-slate-900'>
                  Price
                </p>
                {
                  (product.oldPrice && product.currentPrice) ? (
                    <div className='flex items-center gap-[20px]'>
                      <p className='line-through decoration-yellow-500 decoration-2'>
                        Rs.{product.oldPrice}
                      </p>
                      <p className='text-violet-600 font-bold text-lg'>
                        Rs.{product.currentPrice}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        Rs.{product.currentPrice ? product.currentPrice : product.oldPrice}
                      </p>
                    </div>
                  )
                }
              </div>
              {/*....Product Quantity......*/}
              <p className=' mt-[20px]'>
                Product Quantity
              </p>
              <div className='flex items-center mt-[10px]'>
                <div onClick={decreaseQuantity} className='cursor-pointer w-[2rem] h-[2rem] p-[2px] flex items-center justify-center bg-slate-800 font-bold text-lg text-white'>
                  -
                </div>
                <div className='w-[2rem] h-[2rem] p-[2px] flex items-center justify-center bg-slate-800 font-bold text-lg text-white'>
                  {quantity}
                </div>
                <div onClick={increaseQuantity} className='cursor-pointer w-[2rem] h-[2rem] p-[2px] flex items-center justify-center bg-slate-800 font-bold text-lg text-white'>
                  +
                </div>
              </div>
              {/*.....Call To Action Button.......*/}
              <div id='callToAction' className='flex items-center gap-[20px] mt-[15px]'>
                <button onClick={handleBuyNow} className='px-[20px] py-[7px] bg-yellow-500 font-bold'>
                  Add to cart
                </button>
                <button onClick={handleBuyNow} className='px-[20px] py-[7px] bg-violet-600 font-bold text-white'>
                  Buy this item
                </button>
              </div>
              {/*.......Product Features......*/}
              <div className='mt-[10px]'>
                <p className='text-slate-900 font-bold'>
                  Product Features
                </p>
                <ul>
                  {product.productDescription?.map((item: any, index: any) => (
                    <li key={index}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-[15rem] mt-[10px] flex justify-center'>
            <Loader />
          </div>
        )
      }
      {/*......Customer Review......*/}
      {
        product && (
          <div className='p-[15px] flex flex-col lg:items-center'>
            <div className='flex items-center gap-[30px] mt-[20px]'>
              <p>
                Give your feedback
              </p>
              <button onClick={handleReviewBox} className='px-[12px] py-[7px] bg-gray-300'>
                Write review
              </button>
            </div>
            {
              product.customerReview && (
                <CustomerReview review={product.customerReview} />
              )
            }
          </div>
        )
      }
      {/*....Review Dialog......*/}
      {
        reviewDialog && (
          <div
            id='reviewBox'
            className='w-11/12 md:w-8/12 bg-slate-900 p-[10px]'
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 99,
              transform: 'translate(-50%,-50%)'
            }}>
            <div className='w-full flex justify-end p-[5px]'>
              <RxCross2 className='w-[2rem] h-[2rem] rounded-full flex items-center justify-center bg-white p-[3px]'
                onClick={() => setReviewDialog(false)} />
            </div>
            <ReviewBox submitReview={submitReview} user={user} cancelReview={() => setReviewDialog(false)} />
          </div>
        )
      }

      {/*......Overlay....*/}
      {
        reviewDialog && (
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
      <Footer />
    </div>
  )
}

export default ProductDetails
