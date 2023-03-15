import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Citation from './Citation'
import CitationInput from './CitationInput'

export default function Citations() {
    const [citation, setCitation] = useState()
    const [citationLoading, setCitationLoading] = useState(false)
    
    return (
      <div className='flex flex-col pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-5'>
        <CitationInput setCitation={setCitation} setCitationLoading={setCitationLoading}/>
        { citation ? (
          <div>
                <Citation citation={citation} setCitationLoading={setCitationLoading}/>
                <div className='absolute top-5 left-5'>
                    <Loading isLoading={citationLoading} message={"We are working on that citation right now"}/> 
                </div>
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
