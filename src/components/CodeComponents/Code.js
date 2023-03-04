import React, { useState } from 'react'
import Loading from '../utility/Loading'
import CodeBlock from './CodeBlock'
import CodeInput from './CodeInput'

export default function Code() {
    const [code, setCode] = useState()
    const [codeLoading, setCodeLoading] = useState(false)

    return (
      <div className='flex flex-col pl-20 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 pr-20 pt-5'>
        <CodeInput setCode={setCode} setCodeLoading={setCodeLoading}/>
        { code ? (
          <>
              <CodeBlock code={code} setCodeLoading={setCodeLoading}/>
              <div className='absolute top-5 pr-10'>
                  <Loading isLoading={codeLoading} message={"We are working on that code right now"}/> 
              </div>
          </>

          ) : (
          <>
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
