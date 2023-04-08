import React from 'react'
import { MathJax } from 'better-react-mathjax'
import { getFunctions, httpsCallable } from "firebase/functions"
import MathButton from './MathButton'

export default function MathInput({tier, credits, prompt, setPrompt, setUserCredits, setSolution, setSolutionLoading}) {
    const cost = 5
    const expressions = ["\\div", "\\times", "\\frac{1}{2}", "x", "y", "x^2", "\\sqrt{x}", "x^3", "\\leq", "\\geq", "\\neq","\\approx", 
                            "e^x", "\\ln", "\\sin(x)", "\\cos(x)", "\\tan(x)", "\\pi", "\\alpha", "\\beta", "\\epsilon",
                             "\\sigma", "\\mathbb{E}(X)", "\\bar{x}", "\\binom{k}{1}", "\\frac{d}{dx}", "\\int", "dx", "A^\\intercal", "A^{-1}"]
    const functions = getFunctions()
    const getMath = httpsCallable(functions, 'getMath')
    const decrementCredits = httpsCallable(functions, 'decrementCredits')    

    const getSolution = (event) => {
        event.preventDefault()
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
            <form className="border rounded-lg px-5 py-5 grid grid-cols-1 gap-2 justify-center items-center" onSubmit={getSolution}>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>What question do you have?</label>
                    <textarea rows="3" maxlength="1000" className="w-full block px-2 py-2 border-slate-100 rounded-md shadow-sm focus:outline-none" type="text" value={prompt} placeholder="Use LaTeX for inputting math expressions. Check out the guide for help!"  required onChange={(e) => setPrompt(e.target.value)}/>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-extrabold pb-2'>Your Question:</label>
                    <div className='flex flex-col w-full justify-center items-start border-slate-100 rounded-md shadow-sm bg-white px-5 py-5'>
                        <MathJax inline dynamic>{prompt}</MathJax>
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
                <div className='flex flex-col justify-center items-start pt-2 pb-2'>            
                    <label className='font-extrabold pb-2 pr-2'>Solve</label>
                    <input disabled={credits - cost < 0} className="w-full font-extrabold border rounded-lg px-2 py-2 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:animate-pulse duration-200 bg-white" type="submit" value={tier === "Basic" ? cost + " Credits": "Go!"}/>
                </div>
                {
                    credits - cost < 0 ? (
                        <div className='flex flex-col justify-center items-center bg-yellow-100 rounded-md px-2 py-2'>            
                            <h1 className='font-extrabold pr-2'>Please add more credits</h1>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </form>
        </div>
    )
}