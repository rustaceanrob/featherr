import React, { useState } from 'react'
import { GrStatusGood } from 'react-icons/gr'
import { AiOutlineDislike } from 'react-icons/ai'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function Feedback({prompt, solution}) {
    const [show, setShow] = useState(true)
    const functions = getFunctions()
    const giveFeedback = httpsCallable(functions, 'giveFeedback')
    
    const handleFeedback = (isGood) => {
        giveFeedback({prompt: prompt, solution: solution, indicator: isGood}).then().catch()
        setShow(false)
    }

    return (
        <>
        {
            show ? (
                <div className='flex flex-col md:flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white pt-5'>
                    <button onClick={() => handleFeedback(1)} className="pl-5 flex flex-row justify-center items-center hover:scale-110 duration-200 pt-2 md:pt-0">
                        <h1 className='font-extrabold text-green-400 pr-2'> Looks good!</h1>
                        <GrStatusGood className="hover:text-green-400" size={20}/>
                    </button>
                    <button onClick={() => handleFeedback(0)} className="pl-5 flex flex-row justify-center items-center hover:scale-110 duration-200 pt-2 md:pt-0">
                        <h1 className='font-extrabold text-red-400 pr-2'>Looks wrong</h1>
                        <AiOutlineDislike className="" size={20}/>
                    </button>
                </div>
            ) : (
                <></>
            )
        }
        </>
    )
}
