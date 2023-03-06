import React, { useState } from 'react'
import AskInput from './AskInput'
import Answer from './Answer'
import Loading from '../utility/Loading'

export default function Ask() {
    const [answer, setAnswer] = useState()
    const [answerLoading, setAnswerLoading] = useState(false)
    return (
      <div className='flex flex-col pl-20 lg:pl-60 lg:pr-60 md:pl-60 md:pr-60 pr-20 pt-5'>
        <AskInput setAnswer={setAnswer} setAnswerLoading={setAnswerLoading}/>
        { answer ? (
          <div>
                <Answer answer={answer} setAnswerLoading={setAnswerLoading}/>
                <div className='absolute top-5 pr-10'>
                    <Loading isLoading={answerLoading} message={"We are working on that answer for you right now"}/> 
                </div>
          </div>
          ) : (
          <>
              <div className='pt-5'>
                <div className='flex flex-row justify-center items-center border px-5 py-5 rounded-lg bg-green-200'>
                    <h1 className='pl-2 pr-4 text-sm font-normal'>For the best results, please end your question with a question mark. 
                    Adjust the length of your response in the advanced settings.</h1>
                </div>
              </div>
              <div className='pt-10 hover:cursor'>
                  <div className='bg-white border rounded-md w-full h-full'>
                      <p className='font-medium text-gray-400 px-5 py-5'>Your answer will appear here</p>
                  </div>
              </div>
              <div className='pt-10'>
                  <Loading isLoading={answerLoading} message={"We are working on that answer for you right now"}/> 
              </div>
          </>
        )} 
      </div>
    )
}
