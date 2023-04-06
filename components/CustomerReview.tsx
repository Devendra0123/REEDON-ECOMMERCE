import React from 'react'
import Rating from './Rating'

interface Props{
    review: {
        name: string,
        comment: string,
        rating: number
      }[]
}
const CustomerReview = ({review}: Props) => {
  return (
    <div className='mt-[20px]'>
        <p className='font-bold text-slate-900'>
            Customer Reviews
        </p>

        <div className='mt-[20px] flex flex-col gap-[30px]'>
            {
                review.map((item,index)=>(
                    <div key={index}>
                        <div className='flex items-center gap-[10px]'>
                            <p className='w-[2rem] h-[2rem] flex items-center justify-center p-[5px] rounded-full bg-violet-600 text-white font-bold'>
                                {item.name.charAt(0)}
                            </p>
                            <p>
                                {item.name}
                            </p>
                        </div>
                        <Rating ratingValue={item.rating} NumberOfRating={1} />
                        <p>
                            {item.comment}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CustomerReview