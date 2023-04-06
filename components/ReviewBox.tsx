'use client'

import React, { useState } from 'react'
import GiveRating from './GiveRating'
import Login from './Login'
import Loader from './Loader'

interface Props {
    user: {
        name: string,
        email: string
    },
    cancelReview: any,
    submitReview: any
}
const ReviewBox = ({ user, cancelReview, submitReview }: Props) => {

    const [comment, setComment] = useState<string>('')
    const [rating, setRating] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    function handleStarClick(value: number) {
        setRating(value);
    }

    return (
        <div className='w-full'>
            {
                user ? (
                    <div className='flex flex-col items-center gap-[20px]'>
                        <div className='flex flex-col items-center'>
                            <p className='text-white text-lg'>Rate this product</p>
                            <GiveRating handleStarClick={handleStarClick} rating={rating} />
                        </div>
                        <div>
                            <textarea placeholder='Write your comment' onChange={(e) => setComment(e.target.value)} className='p-[10px]' />
                        </div>
                        <div className='flex items-center gap-[20px]'>
                            <div className='bg-violet-600 text-white px-[15px] py-[8px]'>
                                {
                                    loading ? (
                                        <Loader />
                                    ) : (
                                        <button onClick={() => {
                                            setLoading(true)
                                            submitReview(rating, comment)
                                            setLoading(false)
                                        }}>
                                            Submit
                                        </button>
                                    )
                                }
                            </div>

                            <button onClick={cancelReview} className='bg-yellow-600 text-black px-[15px] py-[8px]'>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center p-[10px]'>
                        <p className='text-white p-[10px]'>
                            Please Sign up to give feedback
                        </p>
                        <Login />
                    </div>
                )
            }
        </div>
    )
}

export default ReviewBox