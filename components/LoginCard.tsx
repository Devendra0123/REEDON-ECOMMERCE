'use client'

import React, { useState, useRef } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '@/context/createOrGetUser';
import { useStateContext } from '@/context/stateContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Loader from './Loader';

const LoginCard = () => {

    const router = useRouter();
    const form = useRef<any>();
    const { addUser } = useStateContext();
    const [forgotPassword, setForgotPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmailSuccess, setResetEmailSuccess] = useState(false)
    const [processing, setProcessing] = useState(false);

    const password_reset_url = `${process.env.NEXT_PUBLIC_URL}/user/reset-password`

    const handleLogin = async () => {

        if (email && password) {
            setProcessing(true);
            const doc = {
                email,
                password
            }
            try {
                const response = await axios.post(`/api/auth/login`, doc);

                if (response.status === 200) {
                    const { userName, email, _id } = response.data;
                    addUser({
                        _id,
                        _type: 'user',
                        email,
                        userName,
                        image: "",
                    })
                }
                setProcessing(false);
                toast.success(`Logged in successfully`);
                router.push('/')

            }

            catch (error: any) {
                setProcessing(false);
                if (error.response.status === 400) {
                    toast.error(`Email or password did not match`);
                    return;
                }
                if (error.response.status === 401) {
                    toast.error(`User does not exist`);
                    return;
                }
                else {
                    toast.error(`Something went wrong`);
                }
            }
        }
        else {
            toast.error(`Please fill all the fields`);
        }
    }

    /*
    const handleMail = async (e:any) => {
        e.preventDefault();

        await emailjs.sendForm(process.env.NEXT_PUBLIC_MAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_MAILJS_TEMPLATE_ID, form.current, process.env.NEXT_PUBLIC_MAILJS_PUBLIC_KEY)
            .then((result) => {
                setResetEmailSuccess(true);
                toast.success(`Check your mail to reset password`)
            }, (error) => {
                setResetEmailSuccess(false);
                toast.error(`Something went wrong. Try again`)
            });
    }

    */

    return (
        <div className='flex justify-center'>
            {
                forgotPassword && (
                    <div className='cart-wrapper'>
                    </div>
                )
            }

            {
                forgotPassword && (
                    <div className='w-[25rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white z-10 p-[20px] rounded font-medium text-xl z-[300]'>
                        <p className='text-center font-medium text-red-500'>Forgot Your Password?</p>
                        <div className='flex gap-[10px] justify-center mt-[10px]'>
                            {
                                resetEmailSuccess ? (
                                    <div className='flex flex-col items-center gap-[10px]'>
                                        <p>
                                            Check your mail to reset password
                                        </p>
                                        <button type='button'
                                            onClick={() => {
                                                setForgotPassword(false)
                                            }}
                                            className=' w-[80%] px-[20px] py-[8px] border-2 border-orange-400'>Go Back</button>
                                    </div>)
                                    : (
                                        <form ref={form} className='flex flex-col items-center w-full gap-[20px]'>

                                            <input type="text" placeholder='Enter name' name="user_name" className='w-full p-[5px] outline-none rounded shadow-xl' />

                                            <input type="email" placeholder='Enter email' name="user_email" className='w-full p-[5px] outline-none rounded shadow-xl' />

                                            <textarea name="message" readOnly placeholder='Enter message' value={`<p>Click on the link to reset password:${password_reset_url}</p>`} className='hidden' />

                                            <button type='button'
                                                onClick={() => {
                                                    setForgotPassword(false)
                                                }}
                                                className=' w-[80%] px-[20px] py-[8px] border-2 border-orange-400'>Cancel</button>
                                            <button type='submit'
                                                className='w-[80%] px-[20px] py-[8px] bg-orange-400'>Next</button>
                                        </form>
                                    )
                            }
                        </div>
                    </div>
                )
            }

            <div className='relative w-[30rem] h-[30rem] mt-[30px] flex justify-center p-[30px] shadow-2xl rounded'>
                <div className='absolute left-0 top-0'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-orange-500 '></div>
                    <div className='w-[1rem] h-[1rem] rounded-full bg-orange-500 ml-[3rem] '></div>
                </div>

                <div className='absolute right-0 bottom-0'>
                    <div className='w-[1rem] h-[1rem] rounded-full bg-orange-500 '></div>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-orange-500 ml-[1rem] '></div>
                </div>

                <div className='flex flex-col items-center w-full'>
                    <GoogleLogin
                        onSuccess={(response) => {
                            createOrGetUser(response, addUser)
                            router.push('/')
                        }}
                        onError={() => toast.error('Login Failed')}
                    />
                    <p className='text-center p-[10px] font-bold'>OR</p>

                    <div className='w-full flex flex-col items-center'>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='grow outline-none'
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' placeholder='Enter email' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" /></svg>
                        </div>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='outline-none grow'
                                onChange={(e) => setPassword(e.target.value)}
                                type='password' placeholder='Enter password' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-1.293l7.06-7.06c-.214-.26-.413-.533-.599-.815l-6.461 6.461v-2.293l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" /></svg>
                        </div>

                        <p onClick={() => {
                            setForgotPassword(true);
                            setResetEmailSuccess(false);
                        }} className='py-[5px] cursor-pointer hover:underline'>Forgot password?</p>
                        <div className='w-[7rem] h-[3rem] flex items-center justify-center text-center bg-teal-400 py-[10px] px-[20px] my-[10px] font-bold'>
                            {
                                processing ? <Loader /> : (
                                    <button type='button' onClick={handleLogin}>
                                        Login
                                    </button>
                                )
                            }
                        </div>
                    </div>

                    <button type='button' onClick={() => router.push('/user/signup')}
                        className='w-[7rem] py-[10px] px-[20px] my-[10px] border-2 border-teal-400 font-bold'>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginCard