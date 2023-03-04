import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'

export default function Loading({isLoading, message}) {
  return (
    <>{ isLoading ? <div className='flex flex-row justify-center items-center border px-2 py-2 rounded-lg bg-green-400'><BsInfoCircle size={20}/><h1 className='pl-2 pr-4 font-extrabold'>{message}</h1><AiOutlineLoading className='text-black animate-spin' size={20}/></div> : <></>}</>
  )
}
