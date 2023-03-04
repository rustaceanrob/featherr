import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function BookForm({setSummary, setSummaryLoading}) {
    const [book, setBook] = useState("")
    const [author, setAuthor] = useState("")
    const [chapter, setChapter] = useState()
    const [cost, setCost] = useState(1)
    const functions = getFunctions()
    const getChapterByTitleAndAuthor = httpsCallable(functions, 'getChapterByTitleAndAuthor')   

    const getSummary = (event) => {
        event.preventDefault()
        getChapterByTitleAndAuthor(
            { chapter: chapter, title: book, author: author, subject: "technical"}).then((response) => {
            setSummary(response.data[0].text.trim())
        }).catch(() => {
            setSummary("There was an error fetching that summary for you. Errors in your summaries do not count towards your credits.")
        })
        setSummaryLoading(true)
    }

    return (
        <div>
            <div>
                <form onSubmit={getSummary} className="border rounded-lg px-5 py-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 justify-center items-center">
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2'>Title</label>
                        <input className="w-full  block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={book} placeholder="Title of your book" onChange={(e) => setBook(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2'>Author</label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={author} placeholder="Author of your book" onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>
                        <label className='font-extrabold pb-2'>Chapter</label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="number" value={chapter} placeholder="Chapter of interest" onChange={(e) => setChapter(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                        <label className='font-extrabold pb-2 pr-2'>Summarize</label>
                        <input className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credit"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}
