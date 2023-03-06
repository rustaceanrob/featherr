import React, { useEffect } from 'react'
import CopyButton from './CopyButton'

export default function CodeBlock({code, setCodeLoading}) {
    useEffect(() => {
        setCodeLoading(false)
        console.log(code)
    }, [code])
    return (
        <div className='pt-10 w-full hover:cursor pb-10'>
            <div className='bg-gradient-to-r from-slate-200 to-slate-300 border rounded-md shadow-xl shadow px-5 py-5 flex flex-row'>
                <p className='font-normal text-slate-900 code-font'>{code}</p>
            </div>
            <div className='flex flex-row justify-end items-end pl-5'>
                <CopyButton code={code}/>  
            </div>
        </div> 
    )
}