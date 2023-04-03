import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function DebugInput({credits, setUserCredits, setDebug, setDebugLoading}) {
    const [prompt, setPrompt] = useState("")
    const cost = 1
    const functions = getFunctions()
    const getDebug = httpsCallable(functions, 'getDebug')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')     

    const getDebugFromGPT = (event) => {
        event.preventDefault()
        setDebug("")
        getDebug(
            { codePrompt: prompt, cost: cost}).then((response) => {
                setDebug(response.data.content.trim())
                decrementCredits({cost: cost}).then((response) => {
                    setUserCredits(response.data)
                })
        }).catch(() => {
            setDebug("There was an error debugging for you. Errors in debugging code do not count towards your credits.")
        })
        setDebugLoading(true)
    }

    return (
        <div>
            <form className="border rounded-lg px-5 py-5 grid grid-cols-1  gap-2 justify-center items-center" onSubmit={getDebugFromGPT}>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Paste your error here</label>
                    <textarea rows="4" className="w-full code-font font-normal block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" maxlength="2000" value={prompt} placeholder="What error are you getting?" onChange={(e) => setPrompt(e.target.value)}/>
                </div>
                <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                    <label className='font-extrabold pb-2 pr-2'>Debug</label>
                    <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credits"}/>
                </div>
                {
                    credits - cost < 0 ? (
                        <div className='flex flex-col justify-center items-center bg-yellow-100 rounded-md px-2 py-2'>            
                            <h1 className='font-extrabold pr-2'>Please add more credits</h1>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </form>
        </div>
    )
}
