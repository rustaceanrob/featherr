import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export default function TierTile({tier, price, description, fontStyle, headerStyle, hover, perks}) {
  return (
    <div className={`flex flex-col px-5 py-5 bg-gradient-to-b from-white to-slate-200 border rounded-md shadow-xl ${hover}`}>
        <div className='flex flex-row justify-between items-center pl-2 pr-2'>
            <h1 className={`${headerStyle} font-extrabold `}>{tier} Plan</h1>
            <h1 className='text-slate-800 font-bold'>{price}</h1>
        </div>
        <div className='pt-5 pl-2 pr-2  justify-center items-center'>
            <h1 className={`font-bold text-sm ${fontStyle} justify-center items-center`}>{description}</h1>
        </div>
        <div className='pt-5 pl-2 pr-2  justify-center items-center'>
            {
              perks.map(item => {
                return (
                <div key={item} className="flex flex-row justify-start items-center pl-5 pb-4">
                  <BsFillCheckCircleFill size={20} className='text-green-400'/>
                  <h1 className='pl-2 md:pl-4 font-bold'>{item}</h1>
                </div> )
              })
            }
        </div>
    </div>
  )
}
