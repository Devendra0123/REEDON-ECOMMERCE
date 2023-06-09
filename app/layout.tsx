'use client'

import './globals.css'
import { StateContext } from '../context/stateContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cart from '@/components/Cart';
import Overlay from '@/components/Overlay';
import ReedonBanner from '@/components/ReedonBanner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body id='body' className='relative'>
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
          <StateContext>
            <ReedonBanner />
            <Overlay />
            <Cart />
            {children}
          </StateContext>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
