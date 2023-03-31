import React, { useEffect, useState } from 'react'
import TierTile from './TierTile'
import { TbTruckLoading } from 'react-icons/tb'
import { db } from '../../config/firebase'
import { collection, where, query, getDocs } from 'firebase/firestore'

export default function AddCreditsPage() {
  const [prices, setPrices] = useState()
  const [userDidClick, setUserDidClick] = useState(false)

  async function getActiveProducts() {
    const activeProductsQuery = query(collection(db, "products"), where("active", "==", true));
    const products = []
    const querySnapshot = await getDocs(activeProductsQuery);
    querySnapshot.forEach(async (doc) => {
      const priceSnap = await getDocs(collection(doc.ref, "prices"));
      priceSnap.forEach((doc) => {
        products.push(doc.id)
      });
      setPrices(products)
    });
  }

  useEffect(() => {
    getActiveProducts()
  }, [prices])

    return (
      <div className='pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-10'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <TierTile tier={"Basic"} price={"Free"} description={"Credits reset to 50 on the first of every month. Perfect for asking a couple questions every month and casual reading."} fontStyle={"text-slate-600"} headerStyle={"text-slate-800"} perks={["Great for new users"]}/>
          <>
            {
              prices ? (
                <>
                  <TierTile tier={"Lite"} price={"$4"} setUserDidClick={setUserDidClick} stripeId={prices[0]} description={"400 Credits awarded or added onto an existing balance on the first of every month. Ideal for hobbyist coders and writers. Maximum credit balance of 500."} headerStyle={"text-slate-800"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Access to Math"]}/>
                  <TierTile tier={"Bold"} price={"$8"} setUserDidClick={setUserDidClick} stripeId={prices[1]} description={"800 Credits awarded or added onto an existing balance on the first of every month. Great for students and recommended for most users. Maximum credit balance of 1000."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400"}  fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Cheaper than GitHub Copilot", "Cheaper than Chegg"]}/>
                  <TierTile tier={"Pro"} price={"$16"} setUserDidClick={setUserDidClick} stripeId={prices[2]} description={"2000 Credits awarded or added onto an existing balance on the first of every month. Access to the best models available. Best for powerusers that read, write, and code frequently. Maximum credit balance of 3000."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Best value"]}/>
                </>
              ) : (
                <>
                  <div className="flex flex-col px-20 py-20 bg-gradient-to-b from-white to-slate-200 border rounded-md shadow-xl animate-pulse"></div>
                  <div className="flex flex-col px-20 py-20 bg-gradient-to-b from-white to-slate-200 border rounded-md shadow-xl animate-pulse"></div>
                  <div className="flex flex-col px-20 py-20 bg-gradient-to-b from-white to-slate-200 border rounded-md shadow-xl animate-pulse"></div>
                </>
              )
            }
          </>
        </div>
        {
          userDidClick ? (
            <div className='pt-5'>
              <div className='px-5 py-5 flex flex-row justify-between items-center border rounded-md bg-gradient-to-b from-white to-green-200'>
                  <h1 className='font-extrabold pr-2'>Redirecting you to checkout!</h1>
                  <TbTruckLoading size={20} className="animate-pulse"/>
              </div>
            </div>
            ) : (
              <></>
            )
          }
      </div>
  )
}
