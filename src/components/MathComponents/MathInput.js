import React, { useState } from 'react'
import { MathJax } from 'better-react-mathjax'
import { BiAddToQueue } from 'react-icons/bi'
import { AiOutlineFunction } from 'react-icons/ai'
import { MdClear } from 'react-icons/md'
import { getFunctions, httpsCallable } from "firebase/functions"
import MathButton from './MathButton'
import EquationBuilder from './EquationBuilder'

export default function MathInput({tier, credits, prompt, setPrompt, setUserCredits, setSolution, setSolutionLoading}) {
    const cost = 5
    const [simpleText, setSimpleText] = useState("")
    const [equationBuilder, setEquationBuilder] = useState(false)
    const expressions = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "\\div ", "\\times ", " = ", "(", ")", "x", "y", "x^2", "\\sqrt{x} ", "e^x", "\\ln ", "\\pi ", "\\sin(x) ", "\\cos(x) ", "\\tan(x) ", "\\frac{d}{dx} ", "\\int ", "dx"]
    const functions = getFunctions()
    const getMath = httpsCallable(functions, 'getMath')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')

    const toggleEquationView = (event) => {
        event.preventDefault()
        setEquationBuilder(!equationBuilder)  
    }

    const clearEquation = (event) => {
        event.preventDefault()
        setPrompt(removeBetweenDollars(prompt))
    }

    const removeBetweenDollars = (str) => {
        return str.replace(/\$.*?\$/g, '');
    }

    const replaceDollarSign = (str) => {
        const regex = /\$\d+(\.\d{1,2})?/g;
        const result = str.replace(regex, (match) => {
            const value = parseFloat(match.slice(1)).toFixed(2);
            return `${value} dollars`;
        });        
        return result;
    }

    const clearAllText = (event) => {
        event.preventDefault()
        setPrompt("")
    }
    
    const handleAddText = (event) => {
        event.preventDefault()
        console.log(replaceDollarSign(simpleText))
        setPrompt(prompt + replaceDollarSign(simpleText))
        setSimpleText("")
    }

    const getSolution = (event) => {
        event.preventDefault()
        if (prompt === "") { 
            setSolution("Please add text or an equation to your question.") 
            return 
        }
        setSolution("")
        getMath(
            {prompt: prompt, cost: cost}).then((response) => {
                setSolution(response.data.content.trim())
                decrementCredits({cost: cost}).then((response) => {
                    setUserCredits(response.data)
                })
        }).catch(() => {
            setSolution("There was an error fetching that answer for you. Errors in retrieving solutions do not count towards your credits.")
        })
        setSolutionLoading(true)
    }

    return (
        <div>
            {
                equationBuilder ? (
                    <EquationBuilder prompt={prompt} setPrompt={setPrompt} setEquationBuilder={setEquationBuilder}/>
                ) : (
                    <form className="border rounded-lg px-5 py-5 grid grid-cols-1 gap-2 justify-center items-center" onSubmit={getSolution}>
                        <div className='flex flex-col justify-center items-start'>
                            <label className='font-extrabold pb-2'>Your Question:</label>
                            <div className='flex flex-col w-full justify-center items-start border-slate-100 rounded-md shadow-sm bg-white px-5 py-5'>
                                <MathJax inline dynamic>{prompt}</MathJax>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-start'>
                            <label className='font-extrabold pb-2'>Add Text</label>
                            <div className='flex flex-row w-full justify-center items-center'>
                                <textarea rows="1" maxlength="1000" className="w-full break-words block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none pr-2" type="text" value={simpleText} placeholder="Add normal text (Find the roots of the polynomial): " onChange={(e) => setSimpleText(e.target.value)}/>
                                <button className='flex flex-row pl-2 px-2 py-2 hover:animate-pulse' onClick={handleAddText}>
                                    <BiAddToQueue size={20}/>
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-start'>
                            <label className='font-extrabold pb-2'>Quick Add</label>
                            <div className='grid xl:grid-cols-10 grid-cols-4 md:grid-cols-6 gap-1 w-full border-slate-100 rounded-md shadow-sm bg-white px-5 py-5'>
                            {
                                expressions.map((expression) => {
                                    return <MathButton prompt={prompt} setPrompt={setPrompt} expression={expression}/>
                                })
                            }
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 w-full justify-between items-center pt-2'>
                            <button className='flex flex-row justify-center items-center rounded-md border px-2 py-2 bg-white hover:animate-pulse w-full' onClick={clearAllText}>
                                    <h1 className='font-bold pr-2'>Clear All</h1>
                                    <MdClear className='text-red-600' size={20}/>
                                </button>
                                <button className='flex flex-row justify-center items-center rounded-md border px-2 py-2 bg-white hover:animate-pulse w-full' onClick={clearEquation}>
                                    <h1 className='font-bold pr-2'>Clear Equation</h1>
                                    <MdClear className='text-red-600' size={20}/>
                            </button>
                            <button className='flex flex-row justify-center items-center rounded-md border px-2 py-2 bg-white hover:animate-pulse w-full' onClick={toggleEquationView}>
                                <h1 className='font-bold pr-1'>Equation Builder</h1>
                                <AiOutlineFunction size={20}/>
                            </button>
                        </div>
                        <div className='flex flex-col justify-center items-start pt-2 pb-2'>            
                            <label className='font-extrabold pb-2 pr-2'>Solve</label>
                            <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={tier === "Basic" ? cost + " Credits": "Go!"}/>
                        </div>
                        {
                            credits - cost < 0 ? (
                                <div className='flex flex-col justify-center items-center bg-yellow-100 rounded-md px-2 py-2'>            
                                    <h1 className='font-extrabold pr-2'>Please upgrade your plan to continue</h1>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </form>
                )
            }
        </div>
    )
}