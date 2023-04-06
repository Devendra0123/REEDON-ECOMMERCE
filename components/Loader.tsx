import React from 'react';

const Loader = () => (
  <div className='flex flex-col items-center'>
    <p className='text-center font-poppins text-lg font-bold'>
      Loading...
    </p>
  <div className='flex items-center mt-[20px]'>
  <div className='circle'></div>
  <div className='circle'></div>
  <div className='circle'></div>
</div>
</div>
);

export default Loader;