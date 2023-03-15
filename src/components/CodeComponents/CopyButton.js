import React from 'react'
import { FaCopy } from 'react-icons/fa'

export default function CopyButton({code}) {

    const copyToClip = async () => {
        await navigator.clipboard.writeText(code)
        alert("Code copied to clipboard!")
    }

    return (
        <div className='pt-5'>
            <button className='flex flex-row bg-gradient-to-r from-slate-200 to-slate-300 rounded-md px-2 py-2 border z-[-1] items-center hover:scale-110 duration-200' onClick={copyToClip}>
                <h1 className='font-extrabold pr-2'>Copy</h1>
                <FaCopy size={20}/>
            </button>
        </div>
    )
}