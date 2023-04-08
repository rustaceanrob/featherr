import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Summary from '../utility/Summary'
import DebugInput from './DebugInput'

export default function Debug({tier, credits, setUserCredits}) {
    const [debug, setDebug] = useState()
    const [debugLoading, setDebugLoading] = useState(false)

    return (
      <div className='flex flex-col sm:pl-20 sm:pr-20 pl-5 pr-5 lg:pl-60 lg:pr-60 md:pl-20 md:pr-20 pt-5'>
        <DebugInput tier={tier} credits={credits} setDebug={setDebug} setUserCredits={setUserCredits} setDebugLoading={setDebugLoading}/>
        { debug ? (
          <div>
                <div className='pt-5 pb-2'>
                    <Loading isLoading={debugLoading} message={"We are debugging that right now"}/> 
                </div>
                <Summary summary={debug} setSummaryLoading={setDebugLoading}/>
          </div>
          ) : (
          <>
            <div className='pt-10 hover:cursor'>
                <div className='bg-white border rounded-md w-full h-full'>
                    <p className='text-gray-400 px-5 py-5'>Your debug steps will appear here</p>
                </div>
            </div>
            <div className='pt-10 pb-5'>
                <Loading isLoading={debugLoading} message={"We are debugging that right now"}/> 
            </div>
          </>
        )}
      </div>
    )
}