import React from 'react'
import { FaPython, FaJava, FaCss3 } from 'react-icons/fa'
import { SiJavascript, SiCplusplus, SiCsharp, SiRuby, SiMysql } from 'react-icons/si'
import { AiFillHtml5 } from 'react-icons/ai'
import { DiPhp } from 'react-icons/di'


export default function CodeButton({language, setLanguage}) {
    const handleClickEvent = (event) => {
        event.preventDefault()
        setLanguage(language)
    }

    return (
        <button onClick={(event) => handleClickEvent(event)}className='flex flex-row justify-center items-center border px-2 py-2 rounded-md w-full bg-white hover:animate-pulse'>
            <h1 className='font-semibold pr-1 sm:pr-2 lg:pr-4'>{language}</h1>
            {
                {
                    "Python": <FaPython className='text-gray-700'/>,
                    "Java": <FaJava className='text-gray-700'/>,
                    "C++": <SiCplusplus className='text-gray-700'/>,
                    "JavaScript": <SiJavascript className='text-gray-700'/>,
                    "C#": <SiCsharp className='text-gray-700'/>,
                    "PHP": <DiPhp size={20} className='text-gray-700'/>,
                    "Ruby": <SiRuby className='text-gray-700'/>,
                    "HTML": <AiFillHtml5 className='text-gray-700'/>,
                    "CSS": <FaCss3 className='text-gray-700'/>,
                    "SQL": <SiMysql size={20} className='text-gray-700'/>
                } [language]
            }
        </button>
    )
}
