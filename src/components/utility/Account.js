import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { db } from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function Account({user, credits, setFeature}) {
    let signUp = new Date(user?.metadata?.creationTime).toISOString().substring(0, 10)
    const [portalLoading, setPortalLoading] = useState(false)
    const [tier, setTier] = useState("Basic")
    const [nextPayment, setNextPayment] = useState("")
    const [subStatus, setSubStatus] = useState("")
    const functions = getFunctions()
    const createPortal = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink')


    const getTier = async () => {
        const q = collection(db, 'customers', user.uid, 'subscriptions')
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => {
            console.log(doc.data())
            setTier(doc.data().role)
            setNextPayment(doc.data().current_period_end.seconds)
            setSubStatus(doc.data().status)
        });
    }

    const openCustomerPortal = async () => {
        if (tier === "Basic") {
            setFeature("Add")
            return
        }
        setPortalLoading(true)
        const { data } = await createPortal({returnUrl: window.location.origin})
        window.location.assign(data.url)

    }
    
    useEffect(() => {
        getTier()
    }, [tier])

    return (
        <div className='flex flex-col justify-center items-center pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-5'>
            <div className='flex flex-col w-72 sm:w-96 border rounded-md bg-white px-5 py-5'>
                <div className='flex flex-row justify-between items-center border-b pb-4'>
                    <h1 className='font-extrabold'>Account Details</h1>
                    <img className="img-thumbnail object-contain h-10 w-10 rounded-3xl" src={user.photoURL} alt={""}/>
                </div>
                <div className='flex flex-row  border-b pt-2 pb-2'>
                    <h1 className='font-bold text-slate-700 pr-2'>Credits:</h1>
                    <h1 className='font-bold text-slate-700'>{credits}</h1>
                </div>
                <div className='flex flex-row  border-b pt-2 pb-2'>
                    <h1 className='font-bold text-slate-700 pr-2'>Date Joined:</h1>
                    <h1 className='font-bold text-slate-700'>{signUp}</h1>
                </div>
                <div className='flex flex-row justify-start items-center border-b pt-2 pb-2'>
                    <h1 className='flex font-bold text-slate-700 pr-2 items-center justify-center'>Subscription Tier:</h1>
                    <h1 className='flex font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 items-center justify-center'>{tier}</h1>
                </div>
                {
                    nextPayment ? (
                        <div className='flex flex-row  border-b pt-2 pb-2'>
                            <h1 className='font-bold text-slate-700 pr-2'>Next Payment:</h1>
                            <h1 className='font-bold text-slate-700'>{new Date(nextPayment * 1000).toLocaleDateString()}</h1>
                        </div>
                    ) : (
                        <></>
                    )
                }
                {
                    subStatus ? (
                        <div className='flex flex-row  border-b pt-2 pb-2'>
                            <h1 className='font-bold text-slate-700 pr-2'>Subscription Status:</h1>
                            <h1 className='font-bold text-slate-700 capitalize'>{subStatus}</h1>
                        </div>
                    ) : (
                        <></>
                    )
                }
                <div className='flex flex-row justify-center items-center'>
                    <button className='pt-4 hover:animate-pulse hover:scale-110 duration-200' onClick={() => openCustomerPortal()}>
                        <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 pr-2'>Manage Subscription</h1>
                    </button>
                </div>
            </div>
            {portalLoading ? (
                <div className='pt-5'>
                <div className='px-5 py-5 flex flex-row justify-between items-center border rounded-md bg-gradient-to-b from-white to-green-200'>
                    <h1 className='font-extrabold pr-5'>Loading Customer Portal!</h1>
                    <AiOutlineLoading3Quarters size={20} className="animate-spin"/>
                </div>
              </div>
            ) : (
                <></>
            )}
        </div>
    )
}
