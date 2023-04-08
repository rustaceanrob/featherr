import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"
import CodeButton from './CodeButton'

export default function CodeInput({tier, credits, setUserCredits, setCode, setCodeLoading, language, setLanguage}) {
    const languages = ["Python", "Java", "JavaScript", "C#" , "PHP", "C++", "Ruby", "HTML", "CSS", "SQL"]
    const [prompt, setPrompt] = useState("")
    const [comments, setComments] = useState("None")
    const cost = 5
    const functions = getFunctions()
    const getCodeFromGPT = httpsCallable(functions, 'getCodeFromGPT')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')    

    const getCode = (event) => {
        event.preventDefault()
        setCode("")
        getCodeFromGPT(
            { language: language, prompt: prompt, comments: comments, cost: cost}).then((response) => {
                const codeAndText = response.data.content.trim()
                const regex = /```[^`\s]*\s?/g
                const codeBlocks = codeAndText.split(regex)
                setCode(codeBlocks)
                decrementCredits({cost: cost}).then((response) => {
                    setUserCredits(response.data)
                })
        }).catch(() => {
            setCode(["There was an error fetching that code for you. Errors in retrieving code do not count towards your credits."])
        })
        setCodeLoading(true)
    }

    return (
        <div>
            <form className="border rounded-lg px-5 py-5 grid grid-cols-1  gap-2 justify-center items-center" onSubmit={getCode}>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Programming language: <span className='text-blue-700'>{language}</span></label>
                    <div className='grid grid-cols-3 md:grid-cols-5 gap-1 pt-2 pb-2 border-t w-full'>
                    {
                        languages.map((lang) => {
                            return (
                                <div>
                                    <CodeButton language={lang} setLanguage={setLanguage}/>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>What you would like to be programmed?</label>
                    <textarea rows="3" maxlength="1500" className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={prompt} placeholder="Tell Featherr what to code."  required onChange={(e) => setPrompt(e.target.value)}/>
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
