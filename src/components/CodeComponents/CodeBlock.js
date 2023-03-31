import React, { useEffect } from 'react'
import CopyButton from './CopyButton'
import Prism from "prismjs";
import "../../dracula.css";

export default function CodeBlock({code, setCodeLoading}) {
    useEffect(() => {
        Prism.highlightAll()
        setCodeLoading(false)
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
                            <pre>
                                <code className={"lang-js"}>{codes.replace(/#/g, "#//").trim()}</code>
                            </pre>
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