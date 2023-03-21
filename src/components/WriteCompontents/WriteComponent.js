import React, { useState } from 'react'
import Loading from '../utility/Loading'
import Summary from '../Summaries/Summary'
import WriteInput from './WriteInput'
import { TypeAnimation } from 'react-type-animation'

export default function WriteComponent({credits, setUserCredits}) {
    const [draft, setDraft] = useState()
    const [draftLoading, setDraftLoading] = useState(false)

    return (
      <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <WriteInput draft={draft} credits={credits} setDraft={setDraft} setUserCredits={setUserCredits} setDraftLoading={setDraftLoading}/>
        { draft ? (
          <div>
                <div className='pt-5 pb-2'>
                  <Loading isLoading={draftLoading} message={"We are writing that right now"}/> 
                </div>
                <Summary summary={draft} setSummaryLoading={setDraftLoading}/>
          </div>
          ) : (
          <>
            <div className='pt-5'>
                <div className='flex flex-col lg:flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white'>
                <h1 className='font-extrabold pr-2 text-sm'>Try asking:</h1>
                <TypeAnimation className='p-0 m-0 pt-2 lg:pt-0 text-sm font-extrabold text-transparent sm:leading-relaxed bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600' 
                    sequence={['Can you write me a cover letter template?', 2000, 
                                'Can you write me an engaging email to a potential client?', 2000,
                                'Can you write me an SEO rich article for my business?', 2000]}
                    repeat={Infinity}/>
                </div>
            </div>
            <div className='pt-10 hover:cursor'>
                <div className='bg-white border rounded-md w-full h-full'>
                    <p className='text-gray-400 px-5 py-5'>Your draft will appear here</p>
                </div>
            </div>
            <div className='pt-10 pb-5'>
                <Loading isLoading={draftLoading} message={"We are writing that right now"}/> 
            </div>
          </>
        )}
      </div>
    )
}
