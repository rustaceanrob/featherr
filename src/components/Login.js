import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiOutlineWarning, AiOutlineClose } from 'react-icons/ai'
import { SiFirefoxbrowser, SiGooglechrome, SiMicrosoftedge } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { TypeAnimation } from 'react-type-animation'
import Logo from '../assets/logo2.png'

export default function Login() {
    const [message, setMessage] = useState('')
    const [signInError, setSignInError] = useState(false)
    const navigate = useNavigate()
    const { user, signInWithGooglePopUp, signInWithGithubPopUp } = UserAuth()

    const handleGoogle = async () => {
        try {
            await signInWithGooglePopUp()
            navigate('/')
        } catch (error) {
            setSignInError(true)
        }                                  
    }

    const handleGithub = async () => {
        try {
            await signInWithGithubPopUp()
            navigate('/')
        } catch (error) {
            setSignInError(true)
        }    
    }

    const navigateToLanding = () => {
        navigate('/landing')
    }

    const navigateToTerms = () => {
        navigate('/terms')
    }
    
    const navigateToPolicy = () => {
        navigate('/privatepolicy')
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
        <div className='flex flex-col justify-start items-center xl:pt-30 pt-40 bg-gray-100'>
            <div className='absolute top-0 left-0 h-screen w-full bg-gray-100 z-[-1]'></div>
            <img className="absolute top-5 right-10 img-thumbnail object-contain h-20 w-20 lg:h-25 lg:w-25 lg:right-40 rounded-3xl ml-5" src={Logo} alt={""}/>
            <div className='absolute top-10 left-10 lg:left-40 lg:top-15 px-2 py-2 border border-amber-400 rounded-lg'>
                <h1 className='font-extrabold text-md xl:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>Beta</h1>
            </div>
            <div className='flex flex-col justify-center items-center md:items-start'>
                <h3 className='font-extrabold sm:text-2xl text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 pb-5'>{message}</h3>
                <h1 className='sm:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>Welcome to Featherr.</h1>
            </div>
            <div className='flex flex-row xl:flex-col justify-center items-center sm:pt-10 pt-5 pb-5'>
                <div className='flex flex-row justify-center items-center'>
                    <h1 className='sm:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 pr-2'>Save time</h1>
                    <TypeAnimation className='sm:text-5xl text-3xl p-0 m-0 font-extrabold text-transparent sm:leading-relaxed bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600' 
                        sequence={['reading.', 2000, 'coding.', 2000, 'debugging.', 2000, 'citing.', 2000]}
                        repeat={Infinity}/>
                </div>
            </div>
            <div className='pt-10 lg:pl-40 lg:pr-40 pl-20 pr-20'>
                <h3 className='sm:text-md text-sm flex text-blue-600 justify-center items-center font-bold pb-5'>Please sign in or sign up</h3>
                <div className='grid sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-1 bg-white border rounded justify-between items-center px-5 py-5'>
                    <button onClick={handleGoogle} className='flex flex-row justify-center items-center bg-white px-2 py-2 border rounded-md hover:scale-110 hover:cursor-pointer duration-200'>
                        <h1 className='font-bold pr-2'>Google</h1>
                        <FcGoogle size={20}/>
                    </button>
                    <button onClick={handleGithub} className='flex flex-row justify-center items-center bg-white px-2 py-2 border rounded-md hover:scale-110 hover:cursor-pointer duration-200'>
                        <h1 className='font-bold pr-2'>GitHub</h1>
                        <AiFillGithub className='text-slate-800' size={20}/>
                    </button>
                </div>
                <div className='flex justify-center items-center pt-5'>
                    <button onClick={navigateToLanding} className='text-sm font-bold text-blue-600 justify-center items-center hover:animate-pulse hover:scale-110 duration-200'>New here? Learn more</button> 
                </div>
                <div className='flex flex-row hidden lg:block'>
                    <h3 className='text-xs flex text-blue-600 justify-center items-center font-bold pt-5'>Supported Browsers</h3>
                    <div className='flex flex-row justify-center items-center px-5 py-5'>
                        <div className='pr-2'><SiGooglechrome className='text-blue-600 ' size={20}/></div>
                        <div className='pl-2 pr-2'><SiFirefoxbrowser className='text-orange-600' size={20}/></div>
                        <div className='pl-2'><SiMicrosoftedge className='text-blue-600' size={20}/></div>
                    </div>
                </div>
                <div className='flex flex-col pt-20 justify-center items-center font-normal sm:pt-10 pt-5 sm:pb-10 pb-2'>
                    <h3 className='text-xs flex text-slate-600'>By signing into Featherr, you agree to the: </h3> 
                    <button onClick={navigateToTerms} className='pt-1 pl-1 text-xs flex text-slate-600 font-bold hover:scale-110 duration-200 underline'>Terms of Service</button>
                    <button onClick={navigateToPolicy} className='pt-1 pl-1 text-xs flex text-slate-600 font-bold hover:scale-110 duration-200 underline'>Private Policy</button>
                </div>
            </div>
            {
                signInError ? (
                    <div className='absolute top-0 left-0 w-full h-screen bg-white/90 z-[2] justify-center items-center'>
                        <div className='relative flex pt-40 justify-center items-center'>
                            <div className='bg-red-300 px-10 py-10 rounded pl-5 pr-5 flex flex-col items-center justify-between'>
                                <AiOutlineWarning className="flex mb-5" size={20}/>
                                <h1 className='justify-center items-center font-extrabold text-xl sm:text-2xl'>There was an error logging you in...</h1>
                                <h1 className='pt-2 font-bold text-sm text-slate-900'>Please try again later</h1>
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