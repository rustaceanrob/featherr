import React, { useEffect } from 'react'
import CopyButton from '../CodeComponents/CopyButton'
import { AiOutlineWarning } from 'react-icons/ai'

export default function Citation({citation, setCitationLoading}) {
    useEffect(() => {
        setCitationLoading(false)
    }, [citation, setCitationLoading])
    return (
        <div className='pt-5 w-full hover:cursor pb-10'>
            <div className='bg-white border rounded-md shadow-xl shadow px-5 py-5'>
                <p className='font-medium' style={{"whiteSpace" : "pre-wrap"}}>{citation}</p>
            </div>
            <div className='flex flex-row justify-end items-end pl-5 pb-5'>
                <CopyButton code={["", citation, ""]}/>  
            </div>
            <div className='flex flex-col justify-center items-center border px-5 py-5 pt-5 rounded-lg bg-gradient-to-r from-amber-400/40 to-orange-400/40'>
                <div className='flex flex-row justify-center items-center'>
                    <AiOutlineWarning size={25}/>
                    <h1 className='pl-4 text-sm font-bold'>
                        Feather will give a "best guess" for missing information. 
                        Please check the source is correct before use.
                    </h1>
                </div>
            </div>
        </div> 
    )
}