import React, { useState } from 'react'
import Loading from '../utility/Loading'
import CodeBlock from './CodeBlock'
import CodeInput from './CodeInput'
import { TypeAnimation } from 'react-type-animation'

export default function Code({credits, setUserCredits}) {
    const [code, setCode] = useState()
    const [codeLoading, setCodeLoading] = useState(false)

    return (
      <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <CodeInput code={code} credits={credits} setUserCredits={setUserCredits} setCode={setCode} setCodeLoading={setCodeLoading}/>
        { code ? (
          <div>
                <div className='pt-5 pb-5'>
                  <Loading isLoading={codeLoading} message={"We are working on that code right now"}/> 
                </div>
                <CodeBlock code={code} setCodeLoading={setCodeLoading}/>
          </div>

          ) : (
          <>
            <div className='pt-5'>
                <div className='flex flex-col lg:flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white'>
                  <h1 className='font-extrabold pr-2 text-sm'>Try asking:</h1>
                  <TypeAnimation className='p-0 m-0 pt-2 lg:pt-0 text-sm font-extrabold text-transparent sm:leading-relaxed bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600' 
                      sequence={['Write an example Express server.', 2000, 
                                 'Make a functional component in React that represents a form.', 2000, 
                                 'Write a script to train a CNN in Tensorflow.', 2000]}
                      repeat={Infinity}/>
                </div>
              </div>
              <div className='pt-10 hover:cursor'>
                  <div className='bg-white border rounded-md w-full h-full'>
                      <p className='font-medium code-font text-gray-400 px-5 py-5'>Your code will appear here</p>
                  </div>
              </div>
              <div className='pt-10 pb-5'>
                  <Loading isLoading={codeLoading} message={"We are working on that code right now"}/> 
              </div>
          </>
        )}
        
      </div>
    )
}
