import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function TLDRInput({summary, setSummary, setSummaryLoading}) {
    const [prompt, setPrompt] = useState("")
    const [cost, setCost] = useState(1)
    const functions = getFunctions()
    const getTLDR = httpsCallable(functions, 'getTLDR')
    
    const handlePromptChange = (e) => {
        const length = e.target.value.length
        const tldrCost = Math.floor(length / 2500) + 1
        setCost(tldrCost)
        setPrompt(e.target.value)
    }

    const getTLDRFromGPT = (event) => {
        event.preventDefault()
        getTLDR(
            { prompt: prompt, temperature: 0.7, tldrLength: 500}).then((response) => {
                if (summary === response.data[0].text.trim()) {
                    throw new Error("Same Response Error")
                }
                setSummary(response.data[0].text.trim())
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
                <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                    <label className='font-extrabold pb-2 pr-2'>Get TLDR</label>
                    <input className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credits"}/>
                </div>
            </form>
        </div>
    )
}
