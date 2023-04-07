import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Summary from '../Summaries/Summary'
import TLDRInput from './TLDRInput'

export default function TLDR({tier, credits, setUserCredits}) {
    const [summary, setSummary] = useState()
    const [summaryLoading, setSummaryLoading] = useState(false)

    return (
      <div className='flex flex-col sm:pl-20 sm:pr-20 pl-5 pr-5 lg:pl-60 lg:pr-60 md:pl-20 md:pr-20 pt-5'>
        <TLDRInput tier={tier} summary={summary} credits={credits} setUserCredits={setUserCredits} setSummary={setSummary} setSummaryLoading={setSummaryLoading}/>
        { summary ? (
          <div>
                <div className='pt-5 pb-2'>
                  <Loading isLoading={summaryLoading} message={"We are summarizing that right now"}/> 
                </div>
                <Summary summary={summary} setSummaryLoading={setSummaryLoading}/>
          </div>
          ) : (
          <>
            <div className='pt-5 justify-center items-center hidden lg:block' >
              <div className='flex flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white'>
                <h1 className='font-extrabold pr-2 text-sm'><span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Tip</span>: You can highlight all the text on a page with <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>CTRL (or Command) + A</span> and 
                you can copy it with <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>CTRL (or Command) + C</span>.</h1>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-900'></span>
              </div>
            </div>
            <div className='pt-5 pb-5'>
              <Loading isLoading={summaryLoading} message={"We are summarizing that right now"}/> 
            </div>
            <div className='pb-10 hover:cursor'>
                <div className='bg-white border rounded-md w-full h-full'>
                    <p className='text-gray-400 px-5 py-5'>Your summary will appear here</p>
                </div>
            </div>
          </>
        )}
      </div>
    )
}