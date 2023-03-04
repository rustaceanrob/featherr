import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook, AiOutlineWarning, AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function Login() {
    const [message, setMessage] = useState('')
    const [signInError, setSignInError] = useState(false)
    const navigate = useNavigate()
    const { user, signInWithGooglePopUp } = UserAuth()

    const handleGoogle = async () => {
        try {
            await signInWithGooglePopUp()
            navigate('/')
        } catch (error) {
            setSignInError(true)
        }                                  
    }
    
    useEffect(() => {
        if (user) {
            navigate('/')
        }
        const now = new Date()
        const hours = now.getHours()
        if (hours < 12) {
            setMessage('Good morning! ')
        } else if (hours < 16) {
            setMessage('Good afternoon! ')
        } else {
            setMessage('Good evening! ')
        }
    }, [user])

    return (
        <div className='flex flex-col justify-start items-center bg-slate-100 h-screen pt-60'>
            <div className='flex flex-col justify-center items-start'>
                <h3 className='font-extrabold sm:text-2xl text-xl text-amber-600 pb-5'>{message}</h3>
                <h1 className='sm:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>Welcome to Good Scribe</h1>
            </div>
            <div className='pt-20 pl-20 pr-20'>
                <h3 className='flex text-amber-600 justify-center items-center font-bold pb-5'>Please sign in using one of these providers</h3>
                <div className='grid sm:grid-cols-2 grid-cols-2 sm:gap-4 gap-1 bg-white border rounded justify-between items-center px-5 py-5'>
                    <button onClick={handleGoogle} className='flex flex-row justify-center items-center bg-white px-2 py-2 border rounded-md hover:scale-110 hover:cursor-pointer duration-200'>
                        <h1 className='font-bold pr-2'>Google</h1>
                        <FcGoogle size={20}/>
                    </button>
                    <div className='flex flex-row justify-center items-center bg-white px-2 py-2 border rounded-md hover:scale-110 hover:cursor-pointer duration-200'>
                        <h1 className='font-bold pr-2'>Facebook</h1>
                        <AiFillFacebook className='text-blue-600' size={20}/>
                    </div>
                </div>
            </div>
            {
                signInError ? (
                    <div className='absolute top-0 left-0 w-full h-screen bg-white/90 z-[2] justify-center items-center'>
                        <div className='relative flex pt-40 justify-center items-center'>
                            <div className='bg-red-300 px-10 py-10 rounded pl-5 pr-5 flex flex-col items-center justify-between'>
                                <AiOutlineWarning className="flex mb-5" size={20}/>
                                <h1 className='justify-center items-center font-extrabold text-xl sm:text-2xl'>There was an error logging you in...</h1>
                                <h1 className='pt-2 font-bold text-sm text-slate-900'>Please try again with a different provider</h1>
                                <button onClick={() => setSignInError(!signInError)} className="flex hover:scale-110 duration-200 mt-5" ><AiOutlineClose size={20}/></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}