import React, { useState } from 'react'
import { MathJax } from 'better-react-mathjax'
import { BiAddToQueue } from 'react-icons/bi'
import { MdClear } from 'react-icons/md'
import { GiMultiDirections } from 'react-icons/gi'
import EquationSubset from './EquationSubset'

export default function EquationBuilder({prompt, setPrompt, setEquationBuilder}) {
    const [equation, setEquation] = useState("")
    const subjects = ['Numbers and Arithmetic', 'Variables and Constants', 'Powers and Roots', 'Exponential and Logarithmic Functions', 'Trigonometric Functions', 'Calculus and Series']
    const symbols = {
        "Numbers and Arithmetic": [["0", "0", false], ["1", "1", false], ["2", "2", false], ["3", "3", false], ["4", "4", false], ["5", "5", false], 
        ["6", "6", false], ["7", "7", false], ["8", "8", false], ["9", "9", false], ["+", "+", false], ["-", "-", false], ["\\div", "\\div", false], ["\\times", "\\times", false],
        ["=", "=", false], ["(", "(", false], [")", ")", false], ["\\pm", "\\pm", false], ["\\frac{@@}{}", "\\frac{\\boxed{.}}{\\boxed{.}}", true]],
        "Variables and Constants": [["x", "x", false], ["y", "y", false], ["z", "z", false], ["a", "a", false], ["b", "b", false], ["c", "c", false], ["t", "t", false], ["w", "w", false], ["h", "h", false], 
                    ["i", "i", false], ["j", "j", false], ["k", "k", false], ["l", "l", false], ["p", "p", false], ["s", "s", false], ["d", "d", false], ["u", "u", false], ["q", "q", false],
                    ["m", "m", false], ["n", "n", false], ["v", "v", false], ["\\pi", "\\pi", false], ["\\frac{\\pi}{2}", "\\frac{\\pi}{2}", false], ["\\frac{\\pi}{3}", "\\frac{\\pi}{3}", false], ["\\frac{\\pi}{4}", "\\frac{\\pi}{4}", false], 
                    ["\\frac{\\pi}{6}", "\\frac{\\pi}{6}", false], ["e", "e", false]], 
        "Powers and Roots": [["x^2", "x^2", false], ["x^{@@}", "x^\\boxed{}", true], ["{@@}^2", "\\boxed{}^2", true], ["{@@}^{}", "\\boxed{}^\\boxed{}", true], ["\\sqrt{x}", "\\sqrt{x}", false], 
                            ["\\sqrt{@@}", "\\sqrt{\\boxed{}}", true], ["\\sqrt[3]{@@}", "\\sqrt[3]{\\boxed{}}", true], ["\\sqrt[n]{@@}", "\\sqrt[n]{\\boxed{}}", true]],
        "Exponential and Logarithmic Functions": [["e^x", "e^x", false], ["e^{@@}", "e^\\boxed{}", true], ["\\ln(x)", "\\ln(x)", false], ["\\ln({@@})", "\\ln(\\boxed{})", true],
                            ["\\log_{2}", "\\log_{2}", false], ["\\log_{10}", "\\log_{10}", false], ["\\log_{@@}", "\\log_\\boxed{}", true], ["e^{rt}", "e^{rt}", false]], 
        "Trigonometric Functions": [["\\sin(x)", "\\sin(x)", false], ["\\cos(x)", "\\cos(x)", false], ["\\tan(x)", "\\tan(x)", false], ["\\sin({@@})", "\\sin(\\boxed{})", true], ["\\cos({@@})", "\\cos(\\boxed{})", true], ["\\tan({@@})", "\\tan(\\boxed{})", true], ["\\csc({@@})", "\\csc(\\boxed{})", true], 
                                    ["\\cot({@@})", "\\cot(\\boxed{})", true], ["\\sec({@@})", "\\sec(\\boxed{})", true], ["\\sin^{-1}({@@})", "\\sin^{-1}(\\boxed{})", true], ["\\cos^{-1}({@@})", "\\cos^{-1}(\\boxed{})", true], ["\\tan^{-1}({@@})", "\\tan^{-1}(\\boxed{})", true], ["\\csc^{-1}({@@})", "\\csc^{-1}(\\boxed{})", true], 
                                    ["\\cot^{-1}({@@})", "\\cot^{-1}(\\boxed{})", true], ["\\sec^{-1}({@@})", "\\sec^{-1}(\\boxed{})", true], ["\\sinh({@@})", "\\sinh(\\boxed{})", true], ["\\cosh({@@})", "\\cosh(\\boxed{})", true], ["\\tanh({@@})", "\\tanh(\\boxed{})", true], 
                                    ["\\sin^{@@}({})", "\\sin^{\\boxed{}}(\\boxed{})", true], ["\\cos^{@@}({})", "\\cos^{\\boxed{}}(\\boxed{})", true], ["\\tan^{@@}({})", "\\tan^{\\boxed{}}(\\boxed{})", true]],
        "Calculus and Series": [["\\frac{d}{dx}", "\\frac{d}{dx}", false], ["\\frac{d}{d@@}", "\\frac{d}{d\\boxed{}}", true], ["\\frac{d^2}{dx}", "\\frac{d^2}{dx}", false],  
                                ["\\frac{d^{@@}}{dx}", "\\frac{d^{\\boxed{}}}{dx}", true], ["\\int", "\\int", false], ["\\int_{@@}^{}", "\\int_{\\boxed{}}^{\\boxed{}}", true], 
                                ["dx", "dx", false], ["d{@@}", "d\\boxed{}", true],["\\sum", "\\sum", false], ["\\sum_{@@}^{}", "\\sum_{\\boxed{}}^{\\boxed{}}", true], ["\\prod", "\\prod", false], 
                                ["\\prod_{@@}^{}", "\\prod_{\\boxed{}}^{\\boxed{}}", true], ["\\lim_{x \\to a}", "\\lim_{x \\to a}", false], ["\\lim_{x \\to \\infty}", "\\lim_{x \\to \\infty}", false],
                                ["\\lim_{n \\to \\infty}", "\\lim_{n \\to \\infty}", false], ["\\lim_{{@@} \\to {}}", "\\lim_{\\boxed{} \\to \\boxed{}}", false]]
    }
    
    const frameSizes = {"Numbers and Arithmetic": "grid-cols-10", "Variables and Constants": "grid-cols-10", "Powers and Roots": "grid-cols-4", 
                        "Exponential and Logarithmic Functions": "grid-cols-4", "Trigonometric Functions": "grid-cols-4", "Calculus and Series": "grid-cols-4"}

    const goBack = (event) => {
        event.preventDefault()
        if (!prompt.includes(equation.replace(/@/g, ""))) {
            handleAddToPrompt(event)
        }
        setEquationBuilder(false)
    }

    const replaceSubstring = (str) => {
        return str.replace(/@([^@]*)@/g, '\\boxed{$1}');
    }

    const moveSymbolsNaviely = (str) => {
        //replaces next possible {} should try to do this as much as possible
        let result = str.replace(/@/g, "")
        if (result.includes('{}')) {
            return result.replace('{}', '{@@}');
        } else {
            return result;
        }
    }

    const getBracketPairs = (str) => {
        const stack = [];
        const pairs = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '{') {
                stack.push(i);
            } else if (str[i] === '}') {
                if (stack.length === 0) {
                    throw new Error('Unmatched closing bracket at index ' + i);
                }
                pairs.push([stack.pop(), i]);
            }
        }
        if (stack.length > 0) {
            throw new Error('Unmatched opening bracket at index ' + stack.pop());
        }
        return pairs;
    }

    const moveAtSymbols = (str) => {
        let leftMostOpenBracket = -1;
        let rightMostOpenBracket = str.length;
        let leftBracketsAfterEdit = 0
        const currentEditStartIndex = str.indexOf("{@")
        const currentEditEndIndex = str.indexOf("@}")
        for (let i = 0; i < str.length; i++) { 
            if (str[i] === "{") { 
                if (i < currentEditStartIndex) {
                    leftMostOpenBracket = i // find the left most bracket out of the edit area
                } else if (i > currentEditEndIndex){
                    leftBracketsAfterEdit++ //keep track of how many { are present after the edit to know what } is the next outer bracket
                }
            } else if (str[i] === "}" && i > currentEditEndIndex) {
                if (leftBracketsAfterEdit === 0) {
                    rightMostOpenBracket = i
                } else {
                    leftBracketsAfterEdit--
                }
            }
        }
        if (leftMostOpenBracket < 0 && rightMostOpenBracket < str.length) {
            // console.log("naive move cannot find parent bracket")
            return moveSymbolsNaviely(str)
        } else if (str.slice(leftMostOpenBracket, rightMostOpenBracket).includes('{}')) {
            // console.log("naive move, found sub-bracket")
            return moveSymbolsNaviely(str)
        } else {
            // console.log("move to parent bracket")
            const pairs = getBracketPairs(str)
            const sortedPairs = pairs.sort((a, b) => b[0] - a[0])
            let pair
            for (let i = 0; i < sortedPairs.length; i++) {
                if (sortedPairs[i][0] < currentEditStartIndex && sortedPairs[i][1] > currentEditEndIndex) {
                    pair = sortedPairs[i]
                    break
                }
            }
            try { 
                return str.slice(0, pair[0]) + "{@" + str.slice(pair[0] + 1, pair[1]).replace(/@/g, "") + "@}" + str.slice(pair[1] + 1)
            } catch {
                console.log("catch index OOB error")
                return moveSymbolsNaviely(str)
            }
        }
    }
    const clearEdit = (str) => {
        return str.replace(/@[^@]*@/g, "@@");
    }

    const handleClearBox = () => {
        setEquation(clearEdit(equation))
    }

    const handleMoveUp = () => {
        setEquation(moveAtSymbols(equation))
    }

    const handleAddToPrompt = (event) => {
        event.preventDefault()
        const cleaned = equation.replace(/@/g, "")
        if (prompt.slice(-1) === "$") {
            setPrompt(prompt.replace(/\$$/, `${cleaned}$`))
        } else {
            setPrompt(prompt.trim()+ ` $${cleaned}$`)
        }
    }

    return (
        <div className="border rounded-lg px-5 py-5 flex flex-col">
            <div className='flex flex-col justify-center items-start'>
                <label className='font-extrabold pb-2'>Your Question:</label>
                <div className='flex flex-col w-full justify-center items-start border-slate-100 rounded-md shadow-sm bg-white px-5 py-5'>
                    <MathJax inline dynamic>{prompt}</MathJax>
                </div>
                <button className='w-full flex flex-row pt-2 justify-center items-center' onClick={(e) => goBack(e)}>
                    <h1 className='flex flex-row w-full justify-center items-center font-extrabold border px-2 py-2 bg-white rounded-md hover:animate-pulse'>Go Back</h1>
                </button>
            </div>
            <label className='font-extrabold pb-2 pt-2'>Your Equation:</label>
            <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col w-full justify-center items-start border-slate-100 rounded-md shadow-sm bg-white px-5 py-5'>
                    <MathJax inline dynamic>{equation ? "$$" + replaceSubstring(equation) + "$$" : ""}</MathJax>
                </div>
                <button className='flex flex-row pl-2 px-2 py-2 hover:animate-pulse' onClick={(event) => handleAddToPrompt(event)}>
                    <BiAddToQueue size={20}/>
                </button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 w-full justify-between items-center pt-4 pb-4'>
                <button className='flex flex-row justify-center items-center rounded-md border px-2 py-2 bg-white hover:animate-pulse w-full' onClick={() => setEquation("")}>
                    <h1 className='font-bold pr-2'>Clear Equation</h1>
                    <MdClear className='text-red-600' size={20}/>
                </button>
                <button className='flex flex-row justify-center items-center rounded-md border px-2 py-2 bg-white hover:animate-pulse w-full' onClick={handleClearBox}>
                    <h1 className='font-bold pr-2'>Clear Box</h1>
                    <MdClear className='text-red-600' size={20}/>
                </button>
                <button className='flex flex-row justify-center items-center rounded-md border px-2 py-2 bg-white hover:animate-pulse w-full' onClick={handleMoveUp}>
                    <h1 className='font-bold pr-2'>Move Editor</h1>
                    <GiMultiDirections className='text-gray-600' size={20}/>
                </button>
            </div>
            <div>
                {
                    subjects.map((subject) => {
                        return <EquationSubset key={subject} subject={subject} size={frameSizes[subject]} expressions={symbols[subject]} equation={equation} setEquation={setEquation}/>
                    })
                }
            </div>
        </div>
    )
}
