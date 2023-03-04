import React, { useState } from 'react'
import BookForm from './BookForm'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import Summary from './Summary'
import Loading from '../utility/Loading'
export default function Summaries() {
    const [ media, setMedia ] = useState("book")
    const [ summary, setSummary] = useState()
    const [summaryLoading, setSummaryLoading] = useState(false)
    const [showWarn, setShowWarn] = useState(true)

    return (
        <div className='flex flex-col pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-5'>

            {/* selection and warning */}

            <div className='flex lg:flex-row flex-col justify-center items-center'>
                <div className='flex justify-center items-center pb-5 pr-2'>
                    <select className="px-2 py-2 border rounded-md focus:outline-none font-extrabold hover:scale-110 duration-200" onChange={(choice) => setMedia(choice.value)}>
                        <option value='book'>Books</option>
                        <option value='academic'>Academic Articles</option>
                        <option value='tv'>TV Shows</option>
                    </select>
                </div>
                <div>
                    {
                    showWarn ? (
                        <button className='pb-5 hover:scale-110 duration-200' onClick={() => setShowWarn(false)}>
                            <div className='flex flex-row border rounded-md justify-center items-center px-4 py-2 bg-gradient-to-r from-amber-400/40 to-orange-400/40'>
                                <BsInfoCircle className="hidden md:block"size={15}/>
                                <h1 className='font-light text-xs pl-2'>
                                Attempting to summarize media that was <span className='font-extrabold'>published after 2021</span> will <span className='font-extrabold'>not</span> work properly
                                </h1>
                            </div>
                        </button>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>

            {/* switch statement / element for unique forms and warning */}        

            <BookForm setSummary={setSummary} setSummaryLoading={setSummaryLoading}/>

            {/* summary display */}
            
            { summary ? (
                <>
                    <Summary summary={summary} setSummaryLoading={setSummaryLoading}/>
                    <div className='absolute top-5 pr-10'>
                        <Loading isLoading={summaryLoading} message={"We are working on that summary right now"}/> 
                    </div>
                </>
    
            ) : (
                <>
                    <div className='pt-10 hover:cursor'>
                        <div className='bg-white border rounded-md w-full h-full'>
                            <p className='text-gray-400 px-5 py-5'>Your summary will appear here</p>
                        </div>
                    </div>
                    <div className='pt-10'>
                        <Loading isLoading={summaryLoading} message={"We are working on that summary right now"}/> 
                    </div>
                </>
            )}
        </div>
    )
}
