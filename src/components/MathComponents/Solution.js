import React, { useEffect } from 'react'
import { MathJax } from 'better-react-mathjax'
import { AiOutlineWarning } from 'react-icons/ai'

export default function Solution({solution, setSolutionLoading}) {
    useEffect(() => {
        setSolutionLoading(false)
    }, [solution, setSolutionLoading])
    return (
        <div className='pt-5 w-full hover:cursor grid grid-cols-1 gap-5 pb-10'>
            <div className='flex flex-col justify-center items-center border px-5 py-5 pt-5 rounded-lg bg-gradient-to-r from-amber-400/40 to-orange-400/40'>
                <div className='flex flex-row justify-center items-center'>
                    <AiOutlineWarning size={25}/>
                    <h1 className='pl-4 text-sm font-bold'>
                        Feather is an AI, and AI can make mistakes too! Always double-check the work below.
                    </h1>
                </div>
            </div>
            <div className='bg-white border rounded-md shadow-xl shadow pt-5 px-5 py-5'>
                <p className='font-medium' style={{"whiteSpace" : "pre-wrap"}}>
                    <MathJax inline dynamic>
                        {solution}
                    </MathJax>
                </p>
            </div>
        </div> 
    )
}
