import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Summary from '../Summaries/Summary'
import TLDRInput from './TLDRInput'

export default function TLDR({credits, setUserCredits}) {
    const [summary, setSummary] = useState()
    const [summaryLoading, setSummaryLoading] = useState(false)

    return (
      <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <TLDRInput summary={summary} credits={credits} setUserCredits={setUserCredits} setSummary={setSummary} setSummaryLoading={setSummaryLoading}/>
        { summary ? (
          <div>
                <div className='pt-5 pb-2'>
                  <Loading isLoading={summaryLoading} message={"We are summarizing that right now"}/> 
                </div>
                <Summary summary={summary} setSummaryLoading={setSummaryLoading}/>
          </div>
          ) : (
          <>
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