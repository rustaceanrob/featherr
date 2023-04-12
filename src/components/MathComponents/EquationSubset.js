import React, { useState } from 'react'
import EquationButton from './EquationButton'

export default function EquationSubset({subject, size, expressions, equation, setEquation}) {
    const [toggleDropdown, setToggleDropdown] = useState(false)
    return (
        <div className='flex flex-col pt-4'>
            <div className='flex flex-row justify-between items-center pb-2'>
                <h1 className='font-bold pb-2'>{subject}</h1> 
                <div>
                    <button className='border rounded-md px-2 py-1 bg-white hover:animate-pulse' onClick={() => setToggleDropdown(!toggleDropdown)}>
                        <h1 className='font-bold'>{toggleDropdown ? "Close" : "Open"}</h1>
                    </button>
                </div>
            </div>
            {
                toggleDropdown ? (
                    <div className={`grid xl:grid-cols-12 ${size} gap-1 w-full border-slate-100 rounded-md shadow-sm bg-white px-5 py-5`}>
                    {
                        expressions.map((expression)=> {
                            return <EquationButton expression={expression[0]} rendered={expression[1]} isFunc={expression[2]} equation={equation} setEquation={setEquation}/>
                        })
                    }
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}
