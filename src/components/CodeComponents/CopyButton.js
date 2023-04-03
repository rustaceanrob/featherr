import React from 'react'
import { FaCopy } from 'react-icons/fa'

export default function CopyButton({code}) {

    const copyToClip = async () => {
        // change to joining array then copying
        let result = ""
        for (let i = 0; i < code.length; i++) {
        if (i % 2 !== 0) {
            result += code[i]
        }
        }
        await navigator.clipboard.writeText(result)
        alert("Copied to clipboard!")
    }

    return (
        <div className='pt-5'>
            <button className='flex flex-row bg-white hover:animate-pulse rounded-md px-2 py-2 border z-[-1] items-center hover:scale-110 duration-200' onClick={copyToClip}>
                <h1 className='font-extrabold pr-2'>Copy</h1>
                <FaCopy size={20}/>
            </button>
        </div>
    )
}