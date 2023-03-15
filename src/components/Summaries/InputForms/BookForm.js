import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"
import { AiOutlineWarning } from 'react-icons/ai'
import { toWords } from 'number-to-words'
import { CiSettings } from 'react-icons/ci'

export default function BookForm({summary, setSummary, setSummaryLoading}) {
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
        let dynamicChapter;
        if (chapter === "") {
            dynamicChapter = chapter;
        } else {
            dynamicChapter = toWords(chapter)
        }
        getChapterByTitleAndAuthor(
            { chapter: dynamicChapter, title: book, author: author, promptLength: promptLength, subject: subject, temperature: creativity}).then((response) => {
            if (summary === response.data[0].text.trim()) {
                throw new Error("Same Response Error")
            }
            setSummary(response.data[0].text.trim())
        }).catch(() => {
            setSummary("There was an error fetching that summary for you. Errors in your summaries do not count towards your credits.")
        })
        setSummaryLoading(true)
    }

    const handleAdvancedSettings = (option) => {
        if (option === "medium") {
            setCost(2)
            setPromptLength(1000)
        }
        if (option === "long") {
            setCost(2)
            setPromptLength(3000)
        }
        if (option === "low") {
            setCreativity(0.4)
        }
        if (option === "high") {
            setCreativity(0.6)
        }
        if (option === "other") {
            setSubject("")
        }
        if (option === "technical") {
            setSubject("technical")
        }
        if (option === "character") {
            setSubject("character")
        }
        if (option === "growth") {
            setSubject("growth")
        }        
    }

    return (
        <div>
            <div>
                <form onSubmit={getSummary} className="border rounded-lg px-5 py-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 justify-center items-center">
                    <div className='flex flex-col justify-center items-start col-span-2'>
                        <label className='font-extrabold pb-2'>Title</label>
                        <input className="w-full  block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={book} required placeholder="Title of your book" maxlength="150" onChange={(e) => setBook(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start col-span-2 md:col-span-1'>
                        <label className='font-extrabold pb-2'>Author</label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={author} required placeholder="Author of your book" maxlength="100" onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start lg:pt-0'>            
                        <label className='font-extrabold pb-2 pr-2 col-span-2 md:col-span-1'>Summarize</label>
                        <input className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credit(s)"}/>
                    </div>
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
                        <>
                            <div className='pt-5 pb-5'>
                                <div className='flex flex-row border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 justify-center items-center rounded-lg px-5 py-5'>
                                    <div className='flex flex-col'>
                                        <label className='font-extrabold pb-2 pr-2'>Output Length</label>
                                        <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                            <option value='medium'>Medium Paragraph</option>
                                            <option value='long'>Long Paragraph(s)</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='font-extrabold pb-2 pr-2'>Output Style</label>
                                        <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                            <option value='low'>Concise</option>
                                            <option value='high'>Creative</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='font-extrabold pb-2 pr-2'>Focus Area</label>
                                        <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" onChange={(e) => handleAdvancedSettings(e.target.value)}>
                                            <option value='other'>General</option>
                                            <option value='growth'>Action Items</option>
                                            <option value='technical'>Technicalities</option>
                                            <option value='character'>Plot Development</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>
                                        <label className='font-extrabold pb-2'>Chapter</label>
                                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="number" value={chapter} placeholder="Chapter of interest" onChange={(e) => setChapter(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center border px-5 py-5 rounded-lg bg-gradient-to-r from-amber-400/40 to-orange-400/40'>
                                <div className='flex flex-row justify-center items-center'>
                                    <AiOutlineWarning size={25}/>
                                    <h1 className='pl-2 text-sm font-bold'>
                                        Summarizing a chapter may give incorrect results. If you have the text of the chapter you would like summarized, try the <span className='font-extrabold'>TLDR</span> feature.
                                    </h1>
                                </div>
                            </div>
                        </>   
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    )
}
