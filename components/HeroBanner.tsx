'use client'

import { client, urlFor } from '@/utils/sanityClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Banner = {
  _id: string,
  bannerTitle: string,
  image: string,
  offer: string,
  bannerDescription: string,
  bannerLink: string
}
const HeroBanner = () => {
  const router = useRouter()

  const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);
  const [banner, setBanner] = useState<Banner[]>()
  /*...Fetch Banner....*/
  const fetchBanners = async () => {
    const query = `*[_type == "banner"]{
      _id,
      bannerTitle,
      image,
      offer,
      bannerDescription,
      bannerLink
  }`

    await client.fetch(query, { next: { revalidate: 60 } }).then((res: any) => setBanner(res));

  }

  fetchBanners()
  /*...Banner AUTO SLIDE....*/
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentImageIndex]);

  /*....hANDLE nEXT sLIDE....*/
  const goToNextSlide = () => {
    if (banner) {
      const nextIndex = currentImageIndex + 1 === banner.length ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
    }
  };
  /*....hANDLE pREV sLIDE....*/
  const goToPrevSlide = () => {
    if (banner) {
      const prevIndex = currentImageIndex === 0 ? banner.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
    }
  };

  return (
    <div className='w-full'>
      {
        banner && (
          <div className='relative'>
            <div onClick={() => router.push(banner[currentImageIndex].bannerLink)} className='cursor-pointer relative w-full h-[10rem] md:h-[12rem] lg:h-[17rem]'>
              <Image
                src={urlFor(banner[currentImageIndex].image).url()}
                fill
                priority
                className='object-cover'
                alt='banner' />
            </div>

            <div onClick={() => router.push(`${banner[currentImageIndex].bannerLink}`)} className='cursor-pointer w-[75%] lg:max-w-lg absolute top-[20px] lg:top-[50px] left-[0px] p-[20px] py-[10px] z-20 bg-gradient-to-l from-transparent to-yellow-500'>
              <p className='font-bold text-lg md:text-3xl'>
                {banner[currentImageIndex].bannerTitle}
              </p>
              <p className="font-poppins">
                {banner[currentImageIndex].bannerDescription}
              </p>
              <p className='bannerOffer'>
                {banner[currentImageIndex].offer}
              </p>
            </div>
            <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-500 z-10'>
            </div>
            {/*...PREV & NEXT btn....*/}
            <div className='flex justify-center gap-[70px]'>
              <button onClick={goToPrevSlide} className="z-30 w-[2rem] h-[2rem] flex items-center justify-center text-xl font-bold bg-slate-200 shadow-xl rounded-full">
                &lt;
              </button>
              <button onClick={goToNextSlide} className="z-30 w-[2rem] h-[2rem] flex items-center justify-center text-xl font-bold bg-slate-200 shadow-xl rounded-full">
                &gt;
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default HeroBanner
