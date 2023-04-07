import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"
import { CiSettings } from 'react-icons/ci'

export default function AskInput({tier, answer, credits, setAnswer, setUserCredits, setAnswerLoading}) {
    const [book, setBook] = useState("")
    const [question, setQuestion] = useState("")
    const [topic, setTopic] = useState("")
    const [creativity, setCreativity] = useState(0.3)
    const [promptLength, setPromptLength] = useState(300)
    const [giveDetail, setGiveDetail] = useState("")
    const [toggleAdvanced, setToggleAdvanced] = useState(false)
    const [cost, setCost] = useState(2)
    const functions = getFunctions()
    const getAnswer = httpsCallable(functions, 'getAnswer')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')    

    const getAnswerFromGPT = (event) => {
        event.preventDefault()
        setAnswer("")
        getAnswer(
            { topic: topic, title: book, question: question.trim(), temperature: creativity, promptLength: promptLength, detail: giveDetail, cost: cost}).then((response) => {
            if (answer === response.data.content.trim()) {
                throw new Error("Same Response Error")
            }
            setAnswer(response.data.content.trim())
            decrementCredits({cost: cost}).then((response) => {
                setUserCredits(response.data)
            })
        }).catch(() => {
            setAnswer("There was an error fetching that answer for you. Errors in your answers do not count towards your credits.")
        })
        setAnswerLoading(true)
    }

    const handleAdvancedSettings = (option) => {
        if (option === "small") {
            setCost(1)
            setPromptLength(150)
            setGiveDetail("")
        }
        if (option === "medium") {
            setCost(2)
            setPromptLength(300)
            setGiveDetail("")
        }
        if (option === "long") {
            setCost(2)
            setPromptLength(1000)
            setGiveDetail(" Please give as much detail as possible.")
        }
        if (option === "low") {
            setCreativity(0.4)
        }
        if (option === "high") {
            setCreativity(0.7)
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={getAnswerFromGPT} className="border rounded-lg px-5 py-5 grid grid-cols-1 xl:grid-cols-2 gap-4 justify-center items-center">
                    <div className='flex flex-col col-span-1'>
                        <label className='font-extrabold pb-2'>Reference</label>
                        <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => setTopic(e.target.value)}>
                            <option value=''>Open Topic</option>
                            <option value='Book'>Book</option>
                        </select>
                    </div>
                    {
                        topic === "Book" ? (
                            <div className='flex flex-col justify-center items-start'>
                                <label className='font-extrabold pb-2'>Title</label>
                                <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={book} required maxlength="100" placeholder="Title of your reference book" onChange={(e) => setBook(e.target.value)}/>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center items-start'>
                                <label className='font-extrabold pb-2'>Topic</label>
                                <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={topic} required maxlength="100" placeholder="What topic are you curious about?" onChange={(e) => setTopic(e.target.value)}/>
                            </div>
                        )
                    }
                    <div className='flex flex-col xl:col-span-2'>
                        <div className='flex flex-col row-span-2 justify-center items-start pt-2'>
                            <label className='font-extrabold pb-2'>Question</label>
                            <textarea className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" value={question} rows="3" required maxlength="2000" placeholder="What can Featherr help with?" onChange={(e) => setQuestion(e.target.value)}/>
                        </div>
                        <div className='flex flex-col row-span-2 justify-center items-start pt-2'>            
                            <label className='font-extrabold pb-2 pr-2'>Ask</label>
                            <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={tier === "Basic" ? cost + " Credits": "Go!"}/>
                        </div>
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
                <div className='flex pt-5 justify-center items-center'>
                    <button className='flex flex-row justify-center items-center hover:scale-110 duration-200'>
                        <h1 className='justify-center items-center' onClick={() => setToggleAdvanced(!toggleAdvanced)}>
                            <label className='font-extrabold justify-center items-center pb-2 pr-1 hover:scale-110'>Advanced Options</label>
                        </h1>
                        <CiSettings size={20}/>
                    </button>
                </div>
                {
                    toggleAdvanced ? (
                        <div className='pt-5'>
                            <div className='flex flex-row border grid grid-cols-1 md:grid-cols-2 gap-2 justify-center items-center rounded-lg px-5 py-5'>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Output Length</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='medium'>Medium</option>
                                        <option value='small'>Short</option>
                                        <option value='long'>Long</option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Output Style</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='low'>Concise</option>
                                        <option value='high'>Creative</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    )
}
