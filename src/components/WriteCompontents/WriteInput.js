import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function WriteInput({tier, credits, setUserCredits, setDraft, setDraftLoading}) {
    const [prompt, setPrompt] = useState("")
    const [userContext, setUserContext] = useState("")
    const [creativity, setCreativity] = useState(0.3)
    const cost = 5
    const functions = getFunctions()
    const getWriting = httpsCallable(functions, 'getWriting')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')     

    const getDraftFromGPT = (event) => {
        event.preventDefault()
        console.log(creativity)
        setDraft("")
        getWriting(
            { prompt: prompt, userContext: userContext, temperature: creativity, cost: cost}).then((response) => {
                setDraft(response.data.content.trim())
                decrementCredits({cost: cost}).then((response) => {
                    setUserCredits(response.data)
                })
        }).catch(() => {
            setDraft("There was an error drafting that for you. Errors in writing do not count towards your credits.")
        })
        setDraftLoading(true)
    }

    return (
        <div>
            <form className="border rounded-lg px-5 py-5 grid grid-cols-1 gap-2 justify-center items-center" onSubmit={getDraftFromGPT}>
            <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Context <span className='font-normal'>(Optional)</span></label>
                    <textarea rows="4" className="w-full font-normal block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" maxlength="2000" value={userContext} placeholder="Is there anything Featherr should know beforehand? i.e. my name is..." onChange={(e) => setUserContext(e.target.value)}/>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Describe Your Draft</label>
                    <textarea rows="2" required className="w-full font-normal block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" maxlength="1000" value={prompt} placeholder="What would you like drafted?" onChange={(e) => setPrompt(e.target.value)}/>
                </div>
                <div className='flex flex-col'>
                    <label className='font-extrabold pb-2'>Output Style</label>
                    <div className='flex flex-row justify-center items-center'>
                        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold pr-2 justify-between items-center'>Concise</h1>
                        <input className="range outline-none focus-none accent-blue-600 w-full flex flex-row justify-center items-center" type="range" min={10} max={130} defaultValue={30} onChange={(e) => setCreativity(e.target.value / 100)}/>
                        <h1 className='pl-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 font-extrabold justify-center items-center'>Creative</h1>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                    <label className='font-extrabold pb-2 pr-2'>Write</label>
                    <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={tier === "Basic" ? cost + " Credits": "Go!"}/>
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
