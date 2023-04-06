import React from 'react'

interface Props {
    ratingValue: number,
    NumberOfRating: number
}
const Rating = ({ ratingValue, NumberOfRating }: Props) => {

    return (
        <div className='flex items-center'>
            {/* Five Star */}
            <div>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        style={{ color: value <= ratingValue ? 'orange' : 'gray' }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <p>
                &#x208D; {NumberOfRating} &#x208E;
            </p>
        </div>
    )
}

export default Rating