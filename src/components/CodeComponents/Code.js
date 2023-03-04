import React, { useState } from 'react'
import Loading from '../utility/Loading'
import CodeBlock from './CodeBlock'
import CodeInput from './CodeInput'
import CopyButton from './CopyButton'

export default function Code() {
    const [code, setCode] = useState()
    const [codeLoading, setCodeLoading] = useState(false)
    

    return (
      <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <CodeInput setCode={setCode} setCodeLoading={setCodeLoading}/>
        { code ? (
          <div>
                <CodeBlock code={code} setCodeLoading={setCodeLoading}/>
                <div className='absolute top-5 pr-10'>
                    <Loading isLoading={codeLoading} message={"We are working on that code right now"}/> 
                </div>
          </div>

          ) : (
          <>
            <div className='pt-5'>
                <div className='flex flex-row justify-center items-center border px-5 py-5 rounded-lg bg-green-200'>
                    <h1 className='pl-2 pr-4 text-sm font-normal'>Please describe your program as a question and try to be as specific as possible. 
                    For example, change "Write a fast sorting algorithm" to "Can you write me a function that sorts a list efficiently?" 
                    When GPT encouters an issue in writing your code, we will not charge the credits against your account.</h1>
                </div>
            </div>
              <div className='pt-10 hover:cursor'>
                  <div className='bg-white border rounded-md w-full h-full'>
                      <p className='font-medium code-font text-gray-400 px-5 py-5'>Your code will appear here</p>
                  </div>
              </div>
              <div className='pt-10'>
                  <Loading isLoading={codeLoading} message={"We are working on that code right now"}/> 
              </div>
          </>
        )}
      </div>
    )
}
