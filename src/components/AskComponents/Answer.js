import React, { useEffect } from 'react'

export default function Answer({answer, setAnswerLoading}) {
    useEffect(() => {
        setAnswerLoading(false)
    }, [answer, setAnswerLoading])
    return (
        <div className='pt-10 w-full hover:cursor pb-10'>
            <div className='bg-white border rounded-md shadow-xl shadow px-5 py-5'>
                <p className='font-medium' style={{"whiteSpace" : "pre-wrap"}}>{answer}</p>
            </div>
        </div> 
    )
}