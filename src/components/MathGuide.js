import React, { useEffect } from 'react'

export default function MathGuide() {
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
                    </ul>
                </div>
                <div className='flex flex-row jusify-center items-center pt-10 pb-5'>
                    <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Using the Editor</h1>
                </div>
                <div className='border rounded-md bg-white px-5 py-5 bg-white'>
                    <h1 className='font-semibold'>
                        When you are using the <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>Featherr</span> math editor, 
                        there are some basic instructions to build equations. When you build equations, you have to use only the buttons provided except when adding normal text.
                        If you do not see the button you need to add on the main screen, open the "Equation Builder."
                        There are many buttons to help you build equations in the Equation Builder, and some have blank boxes. You may fill in these blank boxes with whatever you need. To move around the editor, 
                        you can use the tabbing button provided. The editor will show you a box where you are adding to the equation. 
                        If there is no box shown, everything you add will be added to the end of the equation.
                    </h1>
                </div>
                <div className='absolute top-0 left-0 h-screen object-cover w-full bg-gray-100 z-[-100]'>
                </div>
            </div>
    )
}