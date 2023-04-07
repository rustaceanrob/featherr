import React from 'react'
import Logo from '../assets/logo2.png'
import { CiText } from 'react-icons/ci'
import { BsCodeSlash } from 'react-icons/bs'
import { TbMathSymbols } from 'react-icons/tb'
import { TfiWrite } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col h-screen justify-start items-center bg-gradient-to-r from-gray-100 to-blue-100 pt-40'>
            <img className="absolute top-5 right-10 img-thumbnail object-contain h-20 w-20 lg:h-25 lg:w-25 lg:right-40 rounded-3xl ml-5" src={Logo} alt={""}/>
            <div className='lg:pl-40 lg:pr-40 xl:pl-80 xl:pr-80 pl-5 pr-5'>
                <div className='flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-white border rounded-md px-5 py-5 md:px-20'>
                    <h1 className='flex sm:text-3xl text-xl justify-center items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 border-b pb-5 pt-5'>Productivity made easy</h1>
                    <h1 className='sm:text-lg text-md font-bold text-gray-600 pt-5 pb-5'>Supercharge your learning and productivity with the help of artificial intelligence. <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> offers assistance in math, writing, reading, coding, and more. 
                    Each feature is built for the task at hand. Try it out for free.
                    </h1>
                </div>
            </div>
            <div className='flex justify-center items-center pt-10 pb-5'>
                <button onClick={() => navigate('/login')} className='text-lg font-bold text-blue-600 justify-center items-center hover:animate-pulse hover:scale-110 duration-200 px-2 py-2 border rounded-md border-blue-500'>Login</button> 
            </div>
            <div className='lg:pl-80 lg:pr-80 pl-5 pr-5'>
                <div className='flex flex-row justify-center items-center px-5 py-5'>
                    <CiText className="text-blue-600 pr-2" size={50}/>
                    <TfiWrite className="text-blue-600 pl-2 pr-2" size={50}/>
                    <BsCodeSlash className="text-blue-600 pl-2 pr-2" size={50}/>
                    <TbMathSymbols className="text-blue-600 pl-2" size={50}/>
                </div>
            </div>
        </div>
    )
}
