'use client'

import React, { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '@/context/createOrGetUser';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import useAuthStore from '@/context/authStore';
import Loader from './Loader';
import { client } from '@/utils/sanityClient';

const SignUp = () => {

    const router = useRouter();

    const { addUser, userProfile } = useAuthStore()

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false)

    const handleSignup = async () => {

        if (userName && email) {
            try {
                setProcessing(true);
                const doc: any = {
                    _type: 'user',
                    userName: userName,
                    email: email,
                }

                const query = `*[_type == "user" && email == '${doc.email}'][0]`;

                const user = await client.fetch(query);

                if (user) {
                    toast.success('Signed in successfully');
                    addUser(user)
                    setProcessing(false);
                    router.push('/');
                }
                if (!user) {
                    client.create(doc).then((res: any) => {
                        const data = {
                            _id: res._id,
                            _type: 'user',
                            userName: res.userName,
                            email: res.email,
                        };
                        toast.success('Signed in successfully');
                        addUser(data)
                        setProcessing(false);
                        router.push('/');
                    })
                }
            }
            catch (error) {
                setProcessing(false);
                toast.error(`Something went wrong`);
            }
        }
        else {
            toast.error(`Please fill all the fields.`);
        }
    }

    useEffect(() => {
    
        if (userProfile) {
            router.push('/');
        }
    }, [userProfile])


    return (
        <div className='flex justify-center'>
            <Toaster />
            <div className='relative w-[30rem] h-[30rem] mt-[30px] flex justify-center p-[30px] shadow-2xl rounded'>
                <div className='absolute left-0 top-0'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-yellow-400 '></div>
                    <div className='w-[1rem] h-[1rem] rounded-full bg-yellow-400 ml-[3rem] '></div>
                </div>

                <div className='absolute right-0 bottom-0'>
                    <div className='w-[1rem] h-[1rem] rounded-full bg-yellow-400 '></div>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-yellow-400 ml-[1rem] '></div>
                </div>

                <div className='flex flex-col items-center w-full'>
                    <div className='p-[20px] flex flex-col gap-[15px] text-center'>
                        <p className='font-bold text-lg font-poppins'>
                            Sign up via Google
                        </p>
                        <GoogleLogin
                            onSuccess={(response) => {
                                createOrGetUser(response, addUser)
                                toast.success('Signed in successfully')
                                router.push('/')
                            }}
                            onError={() => toast.error('Login Failed')}
                        />
                    </div>

                    <p className='text-center p-[10px] font-bold'>OR</p>

                    <div className='w-full flex flex-col items-center'>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='grow outline-none'
                                onChange={(e) => setUserName(e.target.value)}
                                type='text' placeholder='Enter full name' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" /></svg>
                        </div>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='grow outline-none'
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' placeholder='Enter email' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill='orange' width="24" height="24" viewBox="0 0 24 24"><path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" /></svg>
                        </div>

                        <div className='w-[7rem] h-[3rem] flex items-center justify-center text-center bg-yellow-400 py-[10px] px-[20px] my-[20px] font-bold text-black'>
                            {
                                processing ? <Loader /> : (
                                    <button type='button' onClick={handleSignup}>
                                        Sign Up
                                    </button>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;