'use client'

import { useStateContext } from '@/context/stateContext';
import React, { useEffect, useState } from 'react'

const Overlay = () => {

    const { showOverlay } = useStateContext();
    const [displayOverlay, setDisplayOverlay] = useState<boolean>(false)

    useEffect(() => {
        setDisplayOverlay(showOverlay)
    }, [showOverlay])

    if (displayOverlay === false) {
        return null;
    }

    return (
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

export default Overlay