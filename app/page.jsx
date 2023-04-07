
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import HeroBanner from '@/components/HeroBanner'
import FlashSale from '@/components/FlashSale'
import Footer from '@/components/Footer'
import CategoryCard from '@/components/CategoryCard'
import ReedonBanner from '@/components/ReedonBanner'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <CategoryCard />
      <FlashSale />
      <Footer />
    </div> 
  )
}
