import React, { useEffect } from 'react'

export default function Summary({summary, setSummaryLoading}) {
    useEffect(() => {
        setSummaryLoading(false)
        console.log(summary)
    }, [summary])
    return (
        <div className='pt-10 w-full hover:cursor pb-10'>
            <div className='bg-white border rounded-md shadow-xl shadow px-5 py-5'>
                <p className='font-medium'>{summary}</p>
            </div>
        </div> 
    )
}
