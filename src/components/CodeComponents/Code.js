import React, { useState } from 'react'
import Loading from '../utility/Loading'
import CodeBlock from './CodeBlock'
import CodeInput from './CodeInput'
import { TypeAnimation } from 'react-type-animation'

export default function Code({tier, credits, setUserCredits}) {
    const [code, setCode] = useState()
    const [codeLoading, setCodeLoading] = useState(false)
    const [language, setLanguage] = useState("Python")

    return (
      <div className='flex flex-col sm:pl-20 lg:pl-40 lg:pr-40 xl:pl-80 xl:pr-80 md:pl-20 md:pr-20 sm:pr-20 pl-5 pr-5 pt-5'>
        <CodeInput tier={tier} code={code} credits={credits} setUserCredits={setUserCredits} language={language} setLanguage={setLanguage} setCode={setCode} setCodeLoading={setCodeLoading}/>
        { code ? (
          <div>
                <div className='pt-5 pb-5'>
                  <Loading isLoading={codeLoading} message={"We are working on that code right now"}/> 
                </div>
                <CodeBlock code={code} setCodeLoading={setCodeLoading} language={language}/>
          </div>

          ) : (
          <>
            <div className='pt-5 hidden sm:block'>
                <div className='flex flex-col lg:flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white'>
                  <h1 className='font-extrabold pr-2 text-sm'>Try asking:</h1>
                  <TypeAnimation className='p-0 m-0 pt-2 lg:pt-0 text-sm font-extrabold text-transparent sm:leading-relaxed bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600' 
                      sequence={['Provide an example of how to use @override.', 2000, 
                                 'Write a function to train a linear regression.', 2000,
                                 'How do I join two tables with Pandas?', 2000]}
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
