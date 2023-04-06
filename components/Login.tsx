import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../context/authStore';
import { createOrGetUser } from '../context/createOrGetUser';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const { addUser } = useAuthStore()

    return (
        <div className='flex items-center justify-center bg-white p-[20px]'>
            <Toaster />
            <GoogleLogin
                onSuccess={(response) => {
                    createOrGetUser(response, addUser)
                    toast.success('Logged in successfully!')
                }}
                onError={() => toast.error('Login Failed')}
            />
        </div>
    )
}

export default Login