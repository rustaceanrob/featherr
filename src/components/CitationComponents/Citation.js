import React, { useEffect } from 'react'
import CopyButton from '../CodeComponents/CopyButton'

export default function Citation({citation, setCitationLoading}) {
    useEffect(() => {
        setCitationLoading(false)
    }, [citation, setCitationLoading])
    return (
        <div className='pt-10 w-full hover:cursor pb-10'>
            <div className='bg-white border rounded-md shadow-xl shadow px-5 py-5'>
                <p className='font-medium' style={{"whiteSpace" : "pre-wrap"}}>{citation}</p>
            </div>
            <div className='flex flex-row justify-end items-end pl-5'>
                <CopyButton code={citation}/>  
            </div>
        </div> 
    )
}