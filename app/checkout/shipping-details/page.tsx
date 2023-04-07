import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ShippingDetails from '@/components/ShippingDetails'
import React from 'react'

const ShippingDetail = () => {
  return (
    <div className='max-w-screen'>
        <Navbar />
        <ShippingDetails />
        <Footer />
    </div>
  )
}

export default ShippingDetail
