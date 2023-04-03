import React, { useState } from 'react'
import TierTile from './TierTile'
import OneTimeTile from './OneTimeTile'
import { TbTruckLoading } from 'react-icons/tb'
// import { db } from '../../config/firebase'
// import { collection, where, query, getDocs } from 'firebase/firestore'

export default function AddCreditsPage() {
  const [userDidClick, setUserDidClick] = useState(false)
  const liteId = "price_1MsqMRGjPi5BxZQHqdEFJ300"
  const boldId = "price_1MsqN6GjPi5BxZQHP1Bj4LnH"
  const proId = "price_1MsqNEGjPi5BxZQHdy9AkXvt"
  const smallOneTime = "price_1MsqNIGjPi5BxZQHjxsOvslu"
  const largeOneTime = "price_1MsqNMGjPi5BxZQHSnXuG6pd"

    return (
      <div className='pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-5'>
          {
          userDidClick ? (
            <div className='pb-5'>
              <div className='px-5 py-5 flex flex-row justify-center items-center border rounded-md bg-gradient-to-b from-white to-green-200'>
                  <h1 className='font-extrabold pr-4'>Redirecting you to checkout!</h1>
                  <TbTruckLoading size={20} className="animate-pulse"/>
              </div>
            </div>
            ) : (
              <></>
            )
          }
        <div className='flex flex-row jusify-center items-center pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Monthly Subscriptions</h1>
        </div>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <TierTile tier={"Basic"} price={"Free"} description={"If you have less than 25 Credits on the first of the month, we will reset your Credits back to 25, free of charge."} fontStyle={"text-slate-600"} headerStyle={"text-slate-800"} perks={["Great for new users"]}/>
          <>
            <TierTile tier={"Lite"} price={"$4"} setUserDidClick={setUserDidClick} stripeId={liteId} description={"200 Credits awarded or added onto an existing balance on the first of every month. Ideal for hobbyist coders and writers."} headerStyle={"text-slate-800"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Cheap and effective"]}/>
            <TierTile tier={"Bold"} price={"$8"} setUserDidClick={setUserDidClick} stripeId={boldId} description={"450 Credits awarded or added onto an existing balance on the first of every month. Great for students and recommended for most users."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400"}  fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Cheaper than GitHub Copilot", "Cheaper than Chegg"]}/>
            <TierTile tier={"Pro"} price={"$16"} setUserDidClick={setUserDidClick} stripeId={proId} description={"1200 Credits awarded or added onto an existing balance on the first of every month. Best for powerusers that read, write, and code frequently."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Best value"]}/>
          </>
        </div>
        <div className='jusify-center items-center pt-10 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>One-Time Buys</h1>
          </div>
        <div className='jusify-center items-center grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 pb-10'>
          <>
            <OneTimeTile tier={"500 Credits"} price={"$10"} setUserDidClick={setUserDidClick} stripeId={smallOneTime} description={"500 Credits instantly added to your account."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} />
            <OneTimeTile tier={"1000 Credits"} price={"$20"} setUserDidClick={setUserDidClick} stripeId={largeOneTime} description={"1000 Credits instantly added to your account."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400"}  fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} />
          </>
        </div>
      </div>
  )
}
