'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'
import { BsCart2 } from 'react-icons/bs'
import { MdSearch } from 'react-icons/md'
import { BiHomeSmile } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { useStateContext } from '@/context/stateContext'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/context/authStore'
import { client } from '@/utils/sanityClient'

const Navbar = () => {
  const [categories, setCategories] = useState<any>()
  const fetchCategories = async () => {
    const query = `*[_type == "category"]{
      _id,
      categoryName,
      image,
      slug
  }`

    await client.fetch(query, { next: { revalidate: 60 } }).then((res) => setCategories(res));
  }

  fetchCategories();

  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null);

  const { userProfile }: any = useAuthStore();
  const { showOverlay, setShowOverlay, totalQuantities, setShowCart } = useStateContext();

  const [menuDisplay, setmenuDisplay] = useState<boolean>(false)
  const [customerSupport, setCustomerSupport] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])
  
  /*.....Handle MENU ...........*/
  const toggleMenu = () => {
    setShowOverlay(!showOverlay)
    setmenuDisplay(!menuDisplay)
  }

  /*........ Close Menu Bar on clicking display screen ......*/
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (!target.closest("menubar")) {
      setShowOverlay(false);
      setmenuDisplay(false);
    }
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show-menu');
    }

    const handleDocumentClick = (event: MouseEvent) => {
      handleClick(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuDisplay]);

  /*..... HANDLE CART.....*/
  const handleCart = () => {
    setShowCart(true);
    setShowOverlay(true)
  };

  /*....Handle SEARCH....*/
  const handleSearch = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    router.push(`/product/search?search_query=${searchQuery}`)
  }

  const onKeyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // submit the form here
      router.push(`/product/search?search_query=${searchQuery}`)
    }
  };

  /*.....Handle ORDER .....*/
  const handleOrder = () => {
    if (userProfile) {
      router.push(`/order/${userProfile._id}`)
    } else {
      router.push('/order/user')
    }
  }

  return (
    <div className='w-full flex justify-center'>
      {/*.......... FOR MOBILE ............*/}
      <div className='w-full lg:hidden bg-[#242C35] px-[10px]'>
        <div className='flex items-center justify-between'>
          {/*    Logo   */}
          <Link href='/' className='flex items-center w-max'>
            <Image src='/logo.png' width={80} height={50} alt='logo' />
          </Link>
          {/*.......TOP Left Menu......*/}
          <div className='flex items-center gap-[15px]'>
            {
              user ? (
                <div>
                  <p className='font-pacifico text-white tracking-wider text-lg underline underline-offset-4 decoration-yellow-400'>
                  {user.userName.length > 7 ? user.userName.substring(0, 7) : user.userName}
                  </p>
                </div>
              ) : (
                <Link href='/authentication/signup' className='flex items-center text-white cursor-pointer'>
                  <p>Sign in &#x21ac;</p>
                  <BsPerson className='font-bold text-xl' />
                </Link>
              )
            }
            <div onClick={handleCart} className='relative cursor-pointer'>
              {
                totalQuantities ? (
                  <p className='text-yellow-500 absolute top-[-17px] left-[50%] transform translate-x-[-50%]'>
                    {totalQuantities}
                  </p>
                ) : (
                  <p className='text-yellow-500 absolute top-[-17px] left-[50%] transform translate-x-[-50%]'>
                    0
                  </p>
                )
              }
              <BsCart2 className='text-white font-bold text-xl' />
            </div>
            <div onClick={toggleMenu}>
              <RiMenuFill className='text-white font-bold text-xl cursor-pointer' />
            </div>
          </div>
        </div>
        {/*......... Search Bar ...........*/}
        <div className='mt-[-10px]'>
          <form className='flex items-center bg-white rounded-lg'>
            <input type='text' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={onKeyDownHandler} placeholder='Search product' className='grow outline-none p-[10px] rounded-lg' />
            <div onClick={handleSearch} className='cursor-pointer flex items-center justify-center bg-orange-500 p-[6px] h-full rounded-lg'>
              <MdSearch className='font-bold text-3xl' />
            </div>
          </form>
        </div>
        {/*......... Major Categories .........*/}
        <div className='w-full flex items-center justify-start gap-[15px] flex-nowrap overflow-x-scroll scrollbar-hide py-[7px]'>
          {
            categories && categories?.map((item: any, index: number) => (
              <Link href={`/product/category?category_id=${item.slug.current}`} key={index}>
                <p className='whitespace-nowrap text-white'>{item.categoryName}</p>
              </Link>
            ))
          }
        </div>
      </div>

      {/*........TOGGLE MENU for mobile device.........*/}
      {
        menuDisplay && (
          <div ref={menuRef} id='menubar' style={{
              width: '100%',
        position: 'fixed',
        top: `0px`,
        right: '0px',
        zIndex: 99,
      }}>
            <div className= 'w-full h-screen flex flex-col gap-[20px] bg-slate-800 p-[20px] pt-[50px]'>
              <Link href='/' className='flex justify-between items-center text-white border-b font-bold text-lg'>
                <p>Shoppy Home</p>
                <BiHomeSmile />
              </Link>

              <div onClick={handleOrder} className='font-bold text-white underline underline-offset-8 decoration-yellow-400 cursor-pointer'>
                My Order
              </div>

              <Link href='/customer-support' className='font-bold text-white underline underline-offset-8 decoration-yellow-400'>
                Customer Suppport
              </Link>

              <Link href='/frequently-asked-questions' className='font-bold text-white underline underline-offset-8 decoration-yellow-400'>
                FAQ
              </Link>
              {
                categories && categories?.map((item: any, index: number) => (
                  <Link href={`/product/category?category_id=${item.slug.current}`} key={index}>
                    <p className='whitespace-nowrap text-white'>{item.categoryName}</p>
                  </Link>
                ))
              }
              {
                user ? (
                  <div>
                    <p className='font-pacifico text-white tracking-wider text-lg underline underline-offset-4 decoration-yellow-400'>
                    {user.userName.length > 7 ? user.userName.substring(0, 7) : user.userName}
                    </p>
                  </div>
                ) : (
                  <Link href='/authentication/signup' className='flex items-center justify-center font-bold gap-[10px] bg-yellow-500 py-[10px] px-[15px]'>
                    <p>
                      Sign in
                    </p>
                    <BsPerson />
                  </Link>
                )
              }

              <div onClick={toggleMenu} className='absolute top-[10px] right-[10px] p-[10px] rounded-full bg-yellow-500'>
                <RxCross2 />
              </div>
            </div>
          </div>
        )
      }

      {
        menuDisplay && (
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

      {/*...... FOR DESKTOP.....*/}
      <div className='hidden flex flex-col items-center lg:w-full  lg:block bg-[#242C35] px-[0px]'>
        <div className=' flex items-center justify-center'>
          {/*    Logo   */}
          <Link href='/' className='flex items-center gap-[10px] w-max '>
            <Image src='/logo.png' width={80} height={50} alt='logo' />
          </Link>
          {/*......... Search Bar ...........*/}
          <div className='mx-[50px] w-2/6'>
            <form className='w-full flex items-center bg-white rounded-lg'>
              <input type='text' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={onKeyDownHandler} placeholder='Search product' className='grow outline-none p-[10px] rounded-lg' />
              <div onClick={handleSearch} className='cursor-pointer flex items-center justify-center bg-orange-500 p-[6px] h-full rounded-lg'>
                <MdSearch className='font-bold text-3xl' />
              </div>
            </form>
          </div>
          {/*.......TOP Left Menu......*/}
          <div className='flex items-center gap-[20px]'>
            {
              user ? (
                <div>
                  <p className='font-pacifico text-white tracking-wider text-lg underline underline-offset-4 decoration-yellow-400'>
                    {user.userName.length > 7 ? user.userName.substring(0, 7) : user.userName}
                  </p>
                </div>
              ) : (
                <Link href='/authentication/signup' className='flex items-center text-white'>
                  <p>Sign in &#x21ac;</p>
                  <BsPerson className='font-bold text-xl' />
                </Link>
              )
            }

            <div onClick={handleOrder} className='flex items-center text-white cursor-pointer'>
              <p>Returns &#x26; Orders</p>
            </div>
            <div onClick={handleCart} className='cursor-pointer relative flex items-center gap-[5px]'>
              <p className='text-yellow-500 absolute top-[-17px] left-[6px]'>
                {totalQuantities}
              </p>
              <BsCart2 className='text-white font-bold text-xl' />
              <p className='text-white'>
                Cart
              </p>
            </div>
            <div onClick={() => setCustomerSupport(!customerSupport)} className="relative">
              <BsThreeDotsVertical className='text-white cursor-pointer' />
              {
                customerSupport && (
                  <div style={{ zIndex: '50' }} className='w-[15rem] bg-white p-[10px] py-[20px] shadow-xl rounded-lg absolute top-[30px] left-[50%] transform -translate-x-[50%] flex flex-col gap-[10px]'>
                    <Link href='/customer-support' className='font-bold underline underline-offset-8 decoration-yellow-400'>
                      Customer Suppport
                    </Link>

                    <Link href='/faq' className='font-bold underline underline-offset-8 decoration-yellow-400'>
                      FAQ
                    </Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/*......Categories.......*/}
        <div className='w-full bg-slate-700'>
          <div className='w-full flex items-center justify-center gap-[15px] flex-nowrap overflow-x-scroll scrollbar-hide py-[7px]'>
            {
              categories && categories?.map((item: any, index: number) => (
                <Link href={`/product/category?category_id=${item.slug.current}`} key={index}>
                  <p className='whitespace-nowrap text-white'>{item.categoryName}</p>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
