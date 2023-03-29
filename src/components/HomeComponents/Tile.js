import React from 'react'

export default function Tile({feature, setFeature, message, icon}) {
    return (
        <button className='flex flex-col border rounded-lg bg-white shadow-xl hover:scale-110 duration-200 px-10 py-10 justify-center items-center' onClick={() => setFeature(feature)}>
            <div className='flex flex-row justify-center items-center'>
                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 pr-2'>
                    {feature}
                </h1>
                { icon }
            </div>
            <p className='justify-start items-start pt-5 font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>
                {message}
            </p>
        </button>
    )
}
