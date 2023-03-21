import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function CodeInput({code, credits, setUserCredits, setCode, setCodeLoading}) {
    const [language, setLanguage] = useState("")
    const [prompt, setPrompt] = useState("")
    const [comments, setComments] = useState("None")
    const cost = 5
    const functions = getFunctions()
    const getCodeFromGPT = httpsCallable(functions, 'getCodeFromGPT')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')    

    const getCode = (event) => {
        event.preventDefault()
        getCodeFromGPT(
            { language: language, prompt: prompt, comments: comments, cost: cost}).then((response) => {
                if (code === response.data.content.trim()) {
                    throw new Error("Same Response Error")
                }
                setCode(response.data.content.trim())
                decrementCredits({cost: cost}).then((response) => {
                    setUserCredits(response.data)
                })
        }).catch(() => {
            setCode("There was an error fetching that code for you. Errors in retrieving code do not count towards your credits.")
        })
        setCodeLoading(true)
    }

    return (
        <div>
            <form className="border rounded-lg px-5 py-5 grid grid-cols-1  gap-2 justify-center items-center" onSubmit={getCode}>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Programming language</label>
                    <input className="w-full  block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={language} placeholder="What are you coding in?" maxlength="100" required onChange={(e) => setLanguage(e.target.value)}/>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>What you would like to be programmed?</label>
                    <textarea rows="4" maxlength="1500" className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={prompt} placeholder="Tell Feather what to code."  required onChange={(e) => setPrompt(e.target.value)}/>
                </div>
                <div className='flex flex-col col-span-1'>
                    <label className='font-extrabold pb-2'>Comments</label>
                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => setComments(e.target.value)}>
                        <option value='None'>No Comments</option>
                        <option value=''>Comments Okay</option>
                    </select>
                </div>
                <div className='flex flex-col justify-center items-start pt-2 pb-2'>            
                    <label className='font-extrabold pb-2 pr-2'>Code</label>
                    <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credits"}/>
                </div>
                {
                    credits - cost < 0 ? (
                        <div className='flex flex-col justify-center items-center pt-2 bg-yellow-100 rounded-md px-2 py-2'>            
                            <h1 className='font-extrabold pb-2 pr-2'>Please add more credits</h1>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </form>
        </div>
    )
}
