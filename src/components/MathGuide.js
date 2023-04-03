import React, { useEffect } from 'react'
import { SiLatex } from 'react-icons/si'
import LaTeXExpression from './utility/LaTeXExpression'
import { useNavigate } from 'react-router-dom'

export default function MathGuide() {
    let expressions = ['\\frac{2x}{3}', '4 \\geq 3', 'f(x) = e^3x',"\\sin x", '\\alpha + \\beta x', '\\int\\cos (x) dx', '\\mathbb{E} (X) = \\mu', '\\binom{k}{1}', '\\int_{0}^{\\pi}{\\cos (x) dx}', '\\sum_{i=0}^{n}{i^2}']
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    return (
            <div className='flex flex-col sm:pl-20 sm:pr-20 pl-5 pr-5 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40  pt-10 pb-10 bg-gray-100'>
                <div className='flex flex-col justify-center items-center border rounded-md px-5 py-5 bg-green-200'>
                    <h1 className='font-extrabold'>
                        In a hurry? Skip to the Quick Start below.
                    </h1>
                </div>
                <div className='flex flex-row jusify-center items-center pt-10 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Math with Featherr</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                        <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> is an AI, so the math section behaves differently than how a calculator does.
                        A calculator does exactly what you tell it to do, but the calculator cannot interpret word-based questions and tell you how to solve problems. This is where <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> steps in!
                        You can ask questions about math, physics, statistics, etc. and <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> can not only provide a solution, but can show you the steps to get to the answer. 
                    </h1>
                </div>
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Strengths and Weaknesses</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                    <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span>, like a human, has strengths and weaknesses when it comes to math and writing. Although <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> is extremely exceptional at math,
                    it is best to know what <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> may struggle with. These are not rules that are set in stone, but using <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> for completing 
                    graduate level mathematical proofs, for instance, is not advised. This list is not comprehensive but is meant to help guide questions when using <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> for math.
                    </h1>
                    <h1 className='font-extrabold pt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>
                        Strengths
                    </h1>
                    <ul className='flex flex-col font-semibold justify-center items-start'>
                        <li className='pt-2 font-semibold'>
                            1. Most high school math and standardized test questions (SAT, ACT, GRE).
                        </li>
                        <li className='pt-2 font-semibold'>
                            2. Most algebra, as long as it is not very complex.
                        </li>
                        <li className='pt-2 font-semibold'>
                            3. Word problems and statistics.
                        </li>
                        <li className='pt-2 font-semibold'>
                            4. Definitions, simple proofs, and problem solving methods.
                        </li>
                        <li className='pt-2 font-semibold'>
                            5. Many derivatives
                        </li>
                        <li className='pt-2 font-semibold'>
                            6. Many integrals
                        </li>
                    </ul>
                    <h1 className='font-extrabold pt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>
                        Weaknesses
                    </h1>
                    <ul className='font-semibold'>
                    <li className='pt-2 font-semibold'>
                            1. Needlessly complex algebra, statistics, derivatives and integrals
                        </li>
                        <li className='pt-2 font-semibold'>
                            2. Extremely complex mathematical expressions
                        </li>
                        {/* <li className='pt-2 font-semibold'>
                            3. Questions that require exceptional mathematical skill
                        </li> */}
                    </ul>
                </div>
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>How Featherr Understands Math</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                        The world of math is complex. 
                        When you think about how many different symbols there are to represent math concepts, you quickly realize how many there are. This is part of what makes math so powerful, but it is hard to represent equations with just your keyboard. 
                        To ensure you can ask <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> about all different types of math problems in a standarized way, <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> uses a 
                        math formatting tool called <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span>. When you want to tell <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> about a complex equation you are working
                        with, <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span> allows you to simply represent that equation in a way the computer can understand.
                    </h1>
                </div>
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Using LaTeX</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                        When you need to input a math equation, you have two options for using <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span>. The first option is to use 
                        in-line <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span>. In-line <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span> lets you 
                        write normal words and insert a math equation on the same line. To start a <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span> math equation, you can use one $ symbol at the beginning and end of your equation.
                        The second option is block style <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span>. Block expressions allow you to put an equation on a new line. To start and end a block expression, use $$.
                    </h1>
                </div>
                {/* example */}
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Example</h1>
                </div>
                <div className='flex flex-col pt-2 pb-2'>
                                        <div className='flex flex-col jusitfy-center items-center border rounded-md bg-white px-10 py-5 bg-white'>
                                            <div className='flex flex-row justify-center items-center'>
                                                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 pr-2'>Your Input:</h1>
                                                <h1>$</h1>
                                                <h1 className='font-bold'>x^2 + e^x + \cos(x)</h1>
                                                <h1>$</h1>
                                            </div>
                                            <div className='flex flex-row justify-center items-center'>
                                                <LaTeXExpression text={"x^2 + e^x + \\cos(x)"}/>
                                            </div>
                                        </div>
                                    </div>
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX Quick Start</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                        Here is a list of how to input a variety of common math expressions and how to input them with <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span>. Please input equations like this when submitting your questions
                        to  <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span>! Feel free to copy any of
                        these expressions for your question.
                    </h1>
                </div>
                <div className='grid grid-cols-1 gap-2 xl:grid-cols-2 pt-5'>
                    {
                        expressions.map((expression) => 
                            {
                                return (
                                    <div className='flex flex-col pt-2 pb-2'>
                                        <div className='flex flex-col jusitfy-center items-center border rounded-md bg-white px-10 py-5 bg-white'>
                                            <div className='flex flex-row justify-center items-center'>
                                                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 pr-2'>Input:</h1>
                                                <h1>$</h1>
                                                <h1 className='font-bold'>{expression}</h1>
                                                <h1>$</h1>
                                            </div>
                                            <LaTeXExpression text={expression}/>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Can't Find What You Need?</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                        Check out the <span className='font-extrabold text-blue-600 hover:animate-pulse'><button onClick={() => navigate('/latextable')}>LaTeX Table</button></span>!
                    </h1>
                </div>
                <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Need More LaTeX Help?</h1>
                </div>
                <div className='border rounded-md px-5 py-5 bg-white grid grid-cols-1 xl:grid-cols-2 gap-2 justify-center'>
                    <h1 className='col-span-1 xl:col-span-2 font-semibold'>The best way to figure out how to enter your expression with <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>LaTeX</span> is <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> itself!
                    You can ask how to write your expression using the <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Ask</span> feature, but if you would like to save credits you may learn from these resources.
                    </h1>
                    <a href="https://www.latex-project.org/help/documentation/" className='flex flex-row justify-center items-center hover:animate-pulse pt-2'>
                        <h1 className='font-bold pr-2'>Official LaTeX Documentation</h1>
                        <SiLatex/>
                    </a>
                    <a href="https://www.latex-project.org/help/documentation/amsldoc.pdf" className='flex flex-row justify-center items-center hover:animate-pulse pt-2'>
                        <h1 className='font-bold'>LaTeX Math Guide</h1>
                    </a>
                </div>
                <div className='absolute top-0 left-0 h-screen object-cover w-full bg-gray-100 z-[-100]'>
                </div>
            </div>
    )
}