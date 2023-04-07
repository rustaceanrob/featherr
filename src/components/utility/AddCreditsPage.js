import React, { useState } from 'react'
import TierTile from './TierTile'
import { TbTruckLoading } from 'react-icons/tb'

export default function AddCreditsPage() {
    const [userDidClick, setUserDidClick] = useState(false)
    const boldId = "price_1MsqN6GjPi5BxZQHP1Bj4LnH"

    return (
      <div className='pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-5 pb-5'>
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
          <TierTile tier={"Basic"} price={"Free"} description={"If you have less than 25 Credits on the first of the month, we will reset your Credits back to 25, free of charge."} fontStyle={"text-slate-600"} headerStyle={"text-slate-800"} perks={["Great for new users", "Access to every feature"]}/>
          <TierTile tier={"Bold"} price={"$8"} setUserDidClick={setUserDidClick} stripeId={boldId} description={"The best option for students and powerusers that read, write, and code frequently."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Unlimited usage", "Cheaper than GitHub Copilot", "Cheaper than Chegg"]}/>
        </div>
        <div className='flex justify-center items-center pt-10 lg:pt-20'>
                <div className='flex flex-col justify-center items-center bg-white border rounded-md px-5 py-5'>
                    <h1 className='font-bold text-sm text-gray-600'>If you purchase a subscription, we will continue to add 10 credits to your account every month. If you decide to cancel your subscription, those credits are still yours to use.</h1>
                </div>
            </div>
      </div>
  )
}
