import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Summary from '../Summaries/Summary'
import DebugInput from './DebugInput'

export default function Debug() {
    const [debug, setDebug] = useState()
    const [debugLoading, setDebugLoading] = useState(false)

    return (
      <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <DebugInput setDebug={setDebug} setDebugLoading={setDebugLoading}/>
        { debug ? (
          <div>
                <Summary summary={debug} setSummaryLoading={setDebugLoading}/>
                <div className='absolute top-5 pr-10'>
                    <Loading isLoading={debugLoading} message={"We are debugging that right now"}/> 
                </div>
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