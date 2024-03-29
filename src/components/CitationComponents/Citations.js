import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Citation from './Citation'
import CitationInput from './CitationInput'

export default function Citations({tier, credits, setUserCredits}) {
    const [citation, setCitation] = useState()
    const [citationLoading, setCitationLoading] = useState(false)
    
    return (
      <div className='flex flex-col sm:pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 sm:pr-20 pl-5 pr-5 pt-5'>
        <CitationInput tier={tier} credits={credits} setUserCredits={setUserCredits} setCitation={setCitation} setCitationLoading={setCitationLoading}/>
        { citation ? (
          <div>
                <div className='pt-5 pb-2'>
                    <Loading isLoading={citationLoading} message={"We are working on that citation right now"}/> 
                </div>
                <Citation citation={citation} setCitationLoading={setCitationLoading}/>
          </div>

          ) : (
          <>
              <div className='pt-10 hover:cursor'>
                  <div className='bg-white border rounded-md w-full h-full'>
                      <p className='font-medium text-gray-400 px-5 py-5'>Your citation will appear here</p>
                  </div>
              </div>
              <div className='pt-10 pb-5'>
                  <Loading isLoading={citationLoading} message={"We are working on that citation right now"}/> 
              </div>
          </>
        )}  
      </div>
    )
}
