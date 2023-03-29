import React from 'react'

export default function Account({user, credits}) {
  return (
    <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <div className='flex flex-col border rounded-md bg-white px-5 py-5'>
            <div className='flex flex-row justify-between items-center border-b pb-4'>
                <h1 className='font-extrabold'>Account Details</h1>
                <img className="img-thumbnail object-contain h-10 w-10 rounded-3xl" src={user.photoURL} alt={""}/>
            </div>
            <div className='flex flex-row border-b pt-2 pb-2'>
                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Tier</h1>
                <h1 className='font-bold'> </h1>
            </div>
            <div className='flex flex-row  border-b pt-2 pb-2'>
                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 pr-2'>Credits</h1>
                <h1 className='font-bold text-slate-700'>{credits}</h1>
            </div>
        </div>
    </div>
  )
}
