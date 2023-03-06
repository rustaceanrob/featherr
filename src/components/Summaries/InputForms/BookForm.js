import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function BookForm({setSummary, setSummaryLoading}) {
    const [book, setBook] = useState("")
    const [author, setAuthor] = useState("")
    const [chapter, setChapter] = useState("")
    const [subject, setSubject] = useState("other")
    const [creativity, setCreativity] = useState(0.3)
    const [promptLength, setPromptLength] = useState(300)
    const [toggleAdvanced, setToggleAdvanced] = useState(false)
    const [cost, setCost] = useState(2)
    const functions = getFunctions()
    const getChapterByTitleAndAuthor = httpsCallable(functions, 'getChapterByTitleAndAuthor')   

    const getSummary = (event) => {
        event.preventDefault()
        getChapterByTitleAndAuthor(
            { chapter: chapter, title: book, author: author, promptLength: promptLength, subject: subject, temperature: creativity}).then((response) => {
            setSummary(response.data[0].text.trim())
        }).catch(() => {
            setSummary("There was an error fetching that summary for you. Errors in your summaries do not count towards your credits.")
        })
        setSummaryLoading(true)
    }

    const handleAdvancedSettings = (option) => {
        if (option === "small") {
            setCost(1)
            setPromptLength(150)
        }
        if (option === "medium") {
            setCost(2)
            setPromptLength(300)
        }
        if (option === "low") {
            setCreativity(0.3)
        }
        if (option === "high") {
            setCreativity(0.7)
        }
        if (option === "other") {
            setSubject("")
        }
        if (option === "technical") {
            setSubject("technical")
        }
        if (option === "fiction") {
            setSubject("fiction")
        }
        if (option === "growth") {
            setSubject("growth")
        }        
    }

    return (
        <div>
            <div>
                <form onSubmit={getSummary} className="border rounded-lg px-5 py-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 justify-center items-center">
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2'>Title</label>
                        <input className="w-full  block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={book} required placeholder="Title of your book" onChange={(e) => setBook(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2'>Author</label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={author} required placeholder="Author of your book" onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>
                        <label className='font-extrabold pb-2'>Chapter</label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="number" value={chapter} required placeholder="Chapter of interest" onChange={(e) => setChapter(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                        <label className='font-extrabold pb-2 pr-2'>Summarize</label>
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
                            <div className='flex flex-row border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 justify-center items-center rounded-lg px-5 py-5'>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Output Length</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='medium'>Paragraph</option>
                                        <option value='small'>A Couple Sentences</option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Output Creativity</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='low'>Concise</option>
                                        <option value='high'>Get Creative</option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-extrabold pb-2 pr-2'>Topic</label>
                                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                        <option value='other'>Other</option>
                                        <option value='growth'>Career/Personal Growth</option>
                                        <option value='technical'>Technical</option>
                                        <option value='fiction'>Fiction</option>
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
