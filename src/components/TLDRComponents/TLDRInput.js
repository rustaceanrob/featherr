import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function TLDRInput({summary, credits, setUserCredits, setSummary, setSummaryLoading}) {
    const [prompt, setPrompt] = useState("")
    const [noteStyle, setNoteStyle] = useState("")
    const [cost, setCost] = useState(1)
    const functions = getFunctions()
    const getTLDR = httpsCallable(functions, 'getTLDR')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')     
    
    const handlePromptChange = (e) => {
        const length = e.target.value.length
        const tldrCost = Math.floor(length / 3000) + 1
        setCost(tldrCost)
        setPrompt(e.target.value)
    }

    const getTLDRFromGPT = (event) => {
        event.preventDefault()
        getTLDR(
            { prompt: prompt, temperature: 0.7, tldrLength: 500, style: noteStyle, cost: cost}).then((response) => {
                if (summary === response.data.content.trim()) {
                    throw new Error("Same Response Error")
                }
                setSummary(response.data.content.trim())
                decrementCredits({cost: cost}).then((response) => {
                    setUserCredits(response.data)
                })
        }).catch(() => {
            setSummary("There was an error summarizing that for you. Errors in TLDR do not count towards your credits.")
        })
        setSummaryLoading(true)
    }

    return (
        <div>
            <form className="border rounded-lg px-5 py-5 grid grid-cols-1  gap-2 justify-center items-center" onSubmit={getTLDRFromGPT}>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Too Long, Didn't Read</label>
                    <textarea rows="15" className="w-full font-normal block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" maxlength="15000" value={prompt} placeholder="What text would you like summarized? Up to 15,000 characters." onChange={handlePromptChange}/>
                </div>
                <div className='flex flex-col col-span-1'>
                    <label className='font-extrabold pb-2'>Summary Style</label>
                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => setNoteStyle(e.target.value)}>
                        <option value=''>Paragraph</option>
                        <option value='Notes'>Notes</option>
                    </select>
                </div>
                <div className='flex flex-col justify-center items-start pt-2 pb-2'>            
                    <label className='font-extrabold pb-2 pr-2'>Summarize</label>
                    <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credits"}/>
                </div>
                {
                    credits - cost < 0 ? (
                        <div className='flex flex-col justify-center items-center pt-2  bg-yellow-100 rounded-md px-2 py-2'>            
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
