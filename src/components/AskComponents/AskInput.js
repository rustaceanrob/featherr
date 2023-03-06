import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function AskInput({setAnswer, setAnswerLoading}) {
    const [book, setBook] = useState("")
    const [question, setQuestion] = useState("")
    const [topic, setTopic] = useState("Book")
    const [creativity, setCreativity] = useState(0.3)
    const [promptLength, setPromptLength] = useState(300)
    const [giveDetail, setGiveDetail] = useState("")
    const [toggleAdvanced, setToggleAdvanced] = useState(false)
    const [cost, setCost] = useState(2)
    const functions = getFunctions()
    const getAnswer = httpsCallable(functions, 'getAnswer')   

    const getAnswerFromGPT = (event) => {
        event.preventDefault()
        getAnswer(
            { topic: topic, title: book, question: question.trim(), temperature: creativity, promptLength: promptLength, detail: giveDetail}).then((response) => {
            setAnswer(response.data[0].text.trim())
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
            setCost(5)
            setPromptLength(1000)
            setGiveDetail(" Please give as much detail as possible.")
        }
        if (option === "low") {
            setCreativity(0.3)
        }
        if (option === "high") {
            setCreativity(0.7)
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={getAnswerFromGPT} className="border rounded-lg px-5 py-5 grid grid-cols-1 gap-4 justify-center items-center">
                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(e) => setTopic(e.target.value)}>
                        <option value='Book'>Book</option>
                        <option value=''>Open Topic</option>
                    </select>
                    {
                        topic === "Book" ? (
                            <div className='flex flex-col justify-center items-start pt-4'>
                                <label className='font-extrabold pb-2'>Title</label>
                                <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={book} placeholder="Title of your reference book" onChange={(e) => setBook(e.target.value)}/>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center items-start pt-4'>
                                <label className='font-extrabold pb-2'>Topic</label>
                                <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={topic} placeholder="What topic are you curious about?" onChange={(e) => setTopic(e.target.value)}/>
                            </div>
                        )
                    }
                    <div className='flex flex-col col-span-1 justify-center items-start pt-2 lg:pt-0'>
                        <label className='font-extrabold pb-2'>Question</label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={question} required placeholder="What would you like to ask?" onChange={(e) => setQuestion(e.target.value)}/>
                    </div>
                    <div className='flex flex-col col-span-1 justify-center items-start pt-2 lg:pt-0'>            
                        <label className='font-extrabold pb-2 pr-2'>Ask</label>
                        <input className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credit(s)"}/>
                    </div>
                </form>
                <div className='flex pt-5 justify-center items-center'>
                    <button className='hover:scale-110 duration-200 justify-center items-center' onClick={() => setToggleAdvanced(!toggleAdvanced)}>
                        <label className='font-extrabold justify-center items-center pb-2 pr-2 hover:scale-110'>Advanced Options</label>
                    </button>
                </div>
                {
                    toggleAdvanced ? (
                        <div className='pt-5'>
                            <div className='flex flex-row border grid grid-cols-1 md:grid-cols-2 gap-2 justify-center items-center rounded-lg px-5 py-5'>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Output Length</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='medium'>Paragraph</option>
                                        <option value='small'>A Couple Sentences</option>
                                        <option value='long'>Long Form</option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Output Creativity</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='low'>Concise</option>
                                        <option value='high'>Get Creative</option>
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
