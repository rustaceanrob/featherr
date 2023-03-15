import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function CodeInput({code, setCode, setCodeLoading}) {
    const [language, setLanguage] = useState("")
    const [prompt, setPrompt] = useState("")
    const [cost, setCost] = useState(2)
    const functions = getFunctions()
    const getCodeFromGPT = httpsCallable(functions, 'getCodeFromGPT')   

    const getCode = (event) => {
        event.preventDefault()
        getCodeFromGPT(
            { language: language, prompt: prompt}).then((response) => {
                if (code === response.data[0].text.trim()) {
                    console.log('error should be thrown')
                    throw new Error("Same Response Error")
                }
                setCode(response.data[0].text.trim())
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
                <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                    <label className='font-extrabold pb-2 pr-2'>Code</label>
                    <input className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credits"}/>
                </div>
            </form>
        </div>
    )
}
