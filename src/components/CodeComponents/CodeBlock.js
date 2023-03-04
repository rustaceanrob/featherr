import React, { useEffect } from 'react'
import CopyButton from './CopyButton'

export default function CodeBlock({code, setCodeLoading}) {
    useEffect(() => {
        setCodeLoading(false)
        console.log(code)
    }, [code])
    return (
        <div className='pt-10 w-full hover:cursor pb-10'>
            <div className='bg-slate-300 border rounded-md shadow-xl shadow px-5 py-5'>
                <p className='font-normal text-slate-900 code-font'>{code}</p>
            </div>
            <CopyButton code={code}/>
        </div> 
    )
}