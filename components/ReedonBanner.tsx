'use client'

import React, { useEffect, useState } from 'react'

const ReedonBanner = () => {
  const [color, setColor] = useState("bg-yellow-400");

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(color === "bg-yellow-400" ? "bg-white" : "bg-yellow-400");
    }, 2000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <div style={{
      position: 'sticky',
      width: '100%',
      top: '0px',
      zIndex: '90'
    }} className={color}>
      <div className='p-[10px] flex items-center justify-center gap-[20px]'>
        <p className='font-poppins text-sm mdtext-lg font-bold'>
          Made by Devendra Chy.
        </p>
        <div className='flex items-center gap-[5px] text-sm md:text-lg font-pacifico'>
          <p>
            9807717694
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReedonBanner
