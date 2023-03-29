import React, { useState } from 'react'
import { BiNavigation } from 'react-icons/bi'

export default function FeatureRouter({currentFeature, setFeature}) {
    const [toggleDrop, setToggleDrop] = useState(false)
    
    const onNavigationClick = (feature) => {
        setFeature(feature)
        setToggleDrop(false)
    }
    
    return (
        <div className="absolute top-5 left-10 block flex flex-row">
            <button className='flex flex-row justify-center items-center px-2 py-2 hover:scale-110 duration-200' onClick={() => setToggleDrop(!toggleDrop)}>
                <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 pr-1'>{currentFeature}</h1>
                <BiNavigation className='text-blue-900'/>
            </button>
            {
                toggleDrop ? (
                    <div className='absolute top-15 bg-white border rounded-md px-5 py-5 flex flex-col justify-start items-start'>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200' onClick={() => onNavigationClick("Ask")}>Ask</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Cite")}>Cite</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Code")}>Code</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Debug")}>Debug</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Math")}>Math</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Summarize")}>Summarize</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("TLDR")}>TLDR</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Write")}>Write</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Home")}>Home</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("Account")}>Account</button>
                        <button className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-110 duration-200 pt-2' onClick={() => onNavigationClick("About")}>About</button>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}
