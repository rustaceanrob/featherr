import React, { useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"

export default function CitationInput({credits, setUserCredits, setCitation, setCitationLoading}) {
    const [book, setBook] = useState("")
    const [author, setAuthor] = useState("")
    const [media, setMedia] = useState("")
    const [citeType, setCiteType] = useState("MLA")
    const [version, setVersion] = useState("")
    const [date, setDate] = useState("")
    const [publisher, setPublisher] = useState("")
    const [pageFrom, setPageFrom] = useState("")
    const [pageTo, setPageTo] = useState("")
    let cost = 1
    const functions = getFunctions()
    const getCitation = httpsCallable(functions, 'getCitation')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')      

    const getCiteFromGPT = (event) => {
        event.preventDefault()
        setCitation("")
        getCitation(
            { title: book, author: author, mediaType: media, citeType: citeType, version: version, publisher: publisher, pubYear: date, from: pageFrom, to: pageTo, cost: cost}).then((response) => {
            setCitation(response.data.text.trim())
            decrementCredits({cost: cost}).then((response) => {
                setUserCredits(response.data)
            })
        }).catch(() => {
            setCitation("There was an error fetching that citation for you. Errors in your citations do not count towards your credits.")
        })
        setCitationLoading(true)
    }

    return (
        <div>
            <div>
                <form onSubmit={getCiteFromGPT} className="border rounded-lg px-5 py-5 grid grid-cols-1 gap-2 justify-center items-center">
                    <div className='grid grid-cols-2 gap-32 justify-center items-center pb-5'>
                        <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" required onChange={(e) => setMedia(e.target.value)}>
                            <option value='Book'>Book</option>
                            <option value='Article'>Article</option>
                            <option value='Textbook'>Textbook</option>
                            <option value='Other'>Other</option>
                        </select>
                        <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:animate-pulse" required onChange={(e) => setCiteType(e.target.value)}>
                            <option value='MLA'>MLA</option>
                            <option value='APA'>APA</option>
                        </select>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2 pr-2'>{citeType} Version</label>
                        <input className="w-full block px-1 py-1 rounded-md shadow-sm focus:outline-none" type="number" value={version} placeholder="8" maxlength="5" required onChange={(e) => setVersion(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2'>Title</label>
                        <input className="w-full  block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={book} maxlength="150" required placeholder="Title" onChange={(e) => setBook(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <label className='font-extrabold pb-2'>Author <span className='font-normal'>(Optional)</span></label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={author} maxlength="100" placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>
                        <label className='font-extrabold pb-2'>Date <span className='font-normal'>(Optional)</span></label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={date} maxlength="100" placeholder="Date of publication" onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>
                        <label className='font-extrabold pb-2'>Publisher <span className='font-normal'>(Optional)</span></label>
                        <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={publisher} maxlength="100" placeholder="Publisher" onChange={(e) => setPublisher(e.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>
                        <label className='font-extrabold pb-2'>Page Range <span className='font-normal'>(Optional)</span></label>
                        <div className='flex flex-row grid grid-cols-2 gap-2'>
                            <input className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="number" value={pageFrom} maxlength="4" placeholder="From" onChange={(e) => setPageFrom(e.target.value)}/>
                            <input className="pl-2 w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="number" value={pageTo} maxlength="4" placeholder="To" onChange={(e) => setPageTo(e.target.value)}/>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-start pt-2 lg:pt-0'>            
                        <label className='font-extrabold pb-2 pr-2'>Cite</label>
                        <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={cost + " Credit(s)"}/>
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
        </div>
    )
}
