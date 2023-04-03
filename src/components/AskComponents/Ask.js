import React, { useState } from 'react'
import AskInput from './AskInput'
import Answer from './Answer'
import Loading from '../utility/Loading'
import { TypeAnimation } from 'react-type-animation'

export default function Ask({credits, setUserCredits}) {
    const [answer, setAnswer] = useState()
    const [answerLoading, setAnswerLoading] = useState(false)
    return (
      <div className='flex flex-col sm:pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 sm:pr-20 pl-5 pr-5 pt-5'>
        <AskInput answer={answer} credits={credits} setUserCredits={setUserCredits} setAnswer={setAnswer} setAnswerLoading={setAnswerLoading}/>
        { answer ? (
          <div>
                <div className='pt-5 pb-2'>
                    <Loading isLoading={answerLoading} message={"We are working on that answer for you right now"}/> 
                </div>
                <Answer answer={answer} setAnswerLoading={setAnswerLoading}/>
          </div>
          ) : (
          <>
              <div className='pt-5 hidden lg:block'>
                <div className='flex flex-col lg:flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white'>
                  <h1 className='font-extrabold pr-2 text-sm'>Try asking:</h1>
                  <TypeAnimation className='p-0 m-0 pt-2 lg:pt-0 text-sm font-extrabold text-transparent sm:leading-relaxed bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600' 
                      sequence={['Can you give me some resume tips?', 2000, 
                                 'Can you help me reword this sentence?', 2000, 
                                 'Can you give me an AP biology question on celluar metabolism?', 2000, 
                                 'How does a car engine work?', 2000]}
                      repeat={Infinity}/>
                </div>
              </div>
              <div className='pt-10 hover:cursor'>
                  <div className='bg-white border rounded-md w-full h-full'>
                      <p className='font-medium text-gray-400 px-5 py-5'>Your answer will appear here</p>
                  </div>
              </div>
              <div className='pt-10 pb-5'>
                  <Loading isLoading={answerLoading} message={"We are working on that answer for you right now"}/> 
              </div>
          </>
        )} 
      </div>
    )
}
