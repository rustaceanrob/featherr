import React from 'react'
import { AiOutlineCopy, AiFillFileWord } from 'react-icons/ai'
import { saveAs } from 'file-saver'

export default function WriteToolbar({text}) {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        alert("Code copied to clipboard!")
    }

    const handleWordDownload =  () => {
        const blob = new Blob([text], { type: 'application/msword' });
        saveAs(blob, 'FeatherrDraft.docx');
    }

    return (
        <div className='pb-10'>
            <div className='flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 gap-2 border bg-white px-2 py-2 rounded-md shadow-xl shadow'>
                <button className='px-2 py-2 duration-200 flex flex-row items-center justify-center hover:animate-pulse border rounded-lg px-2 py-2' onClick={handleCopy}>
                    <h1 className='font-bold pr-2'>Copy Text</h1>
                    <AiOutlineCopy size={25}/>
                </button>
                <button className='px-2 py-2 duration-200 flex flex-row items-center justify-center hover:animate-pulse border rounded-lg px-2 py-2' onClick={handleWordDownload}>
                    <h1 className='font-bold pr-2'>Download Word Document</h1>
                    <AiFillFileWord className='text-blue-600' size={25}/>
                </button>
            </div>
        </div>
    )
}
