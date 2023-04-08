import React, { useEffect, useState } from 'react'
import CopyButton from './CopyButton'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock({language, code, setCodeLoading}) {
    const [styledLang, setStyledLang] = useState("javascript")
    useEffect(() => {
        setCodeLoading(false)
        if (language === "C++") {
            setStyledLang("cpp")
        } else if (language === "C#") {
            setStyledLang("csharp")
        } else if (language === "HTML") {
            setStyledLang("cshtml")
        } else {
            setStyledLang(language.toLowerCase())
        }
    }, [code])
    
    return (
        <div className='pb-10 w-full hover:cursor'>
            <div>
                {code.map((codes, index) => {
                    if (index % 2 === 0) {
                        return ( <div>
                                { codes ? (
                                    <div className='bg-white border rounded-md shadow-xl shadow px-5 py-5'>
                                        <p className='font-semibold' style={{"whiteSpace" : "pre-wrap"}}>{codes.trim()}</p>
                                    </div>
                                ) : (
                                        <></>
                                )
                            }
                            </div>
                        )
                    } else {
                        return (
                            <div className='rounded-md border pt-2 pb-2'>
                                <SyntaxHighlighter className="rounded-md border" language={styledLang} style={a11yDark}>
                                    {codes.trim()}
                                </SyntaxHighlighter>
                            </div>
                        )
                    }
                })}
            </div>
            <div className='flex flex-row justify-end items-end pl-5'>
                <CopyButton code={code}/>  
            </div>
        </div> 
    )
}