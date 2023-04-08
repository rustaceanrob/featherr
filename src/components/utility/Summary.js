import React, { useEffect } from 'react'

export default function Summary({summary, setSummaryLoading}) {
    useEffect(() => {
        setSummaryLoading(false)
    }, [summary, setSummaryLoading])
    return (
        <div className='pt-5 w-full hover:cursor pb-10'>
            <div className='bg-white border rounded-md shadow-xl shadow px-5 py-5'>
                <p className='font-medium' style={{"whiteSpace" : "pre-wrap"}}>{summary}</p>
            </div>
        </div> 
    )
}
