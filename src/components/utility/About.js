import React from 'react'
import { SiOpenai } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

export default function About({setFeature}) {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col sm:pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 sm:pr-20 pr-5 pl-5 pt-10 pb-10'>
            <div className='flex flex-row jusify-center items-center pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Hi!</h1>
            </div>
            <div className='border rounded-md px-5 py-5 bg-green-100'>
                <h1 className='font-semibold'>
                    For new users, it is recommended you read this section to get familiar with  <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr.</span>
                </h1>
            </div>
            <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>What is this app?</h1>
            </div>
            <div className='border rounded-md bg-white px-5 py-5'>
                <h1 className='font-semibold'>
                    <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> is an application built for learning and productivity. 
                    Powered by artificial intelligence, 
                    this app generates text summaries, citations, code, and even solutions to math questions. 
                    For students, each feature can supercharge productivity in a unique way, and, for programmers, coding and debugging are made seemless.    
                </h1>
            </div>
            <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>How usage works</h1>
            </div>
            <div className='border rounded-md bg-white px-5 py-5'>
                <h1 className='font-semibold'>
                    All features of <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> are
                    accessed with credits for Basic Tier users. You are given 150 credits for free when you first sign in. If you have less than 25 credits, all users get 25 credits free of charge on the first of every month. 
                    For unlimited usage, you can purchase a <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Add")}> Subscription</button>.
                </h1>
            </div>
            <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Features</h1>

            </div>
            <div className='border rounded-md bg-white px-5 py-5'>
                <h1 className='font-semibold pb-4'>
                    <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Cite")}> Cite</button> gives MLA and APA citations
                    for books, articles, and anything else you might enter. As long as the material was created before 2022, <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> citations
                    will attempt to fill in missing information for you, so you can save time working on your bibliography.
                </h1>
                <h1 className='font-semibold pb-4'>
                    <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Code")}> Code</button> generates programs for you
                    in a wide variety of languages, libraries, frameworks. Simply describe what you would like programmed, and the code is returned to you. If you are an experienced programmer and want to learn a new language or framework, skip the documentation and describe what you need to code. If you are learning to program, feel free to ask for code explanations. Some of <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> itself was
                    built with this feature.
                </h1>
                <h1 className='font-semibold pb-4'>
                    <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Debug")}> Debug</button> helps you fix your code. 
                    No need to stare at the console or rummage around Google and Stack Exchange for the solution when you have <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span>. Just paste the error
                    and <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> will give you a human-readable fix!
                </h1>
                <h1 className='font-semibold pb-4'>
                    <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Math")}> Math</button> crunches out solutions to math-based problems and questions.
                    This feature can show you how to solve most problems and provide a reference to theorems and equations. Please check out our full  <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => navigate("/mathguide")}> Math Guide </button> to learn how to get the most out of this feature!
                </h1>
                <h1 className='font-semibold pb-4'>
                    <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Summarize")}> Summarize</button> does the reading for you. Just paste in a big block of text, 
                    and <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> will summarize the text for you in a style of your choice: either a paragraph or bullet points.
                </h1>
            </div>
            <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Disclaimer</h1>
            </div>
            <div className='border rounded-md bg-white px-5 py-5'>
                <h1 className='font-semibold'>
                    <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> is an AI, and AI can get things wrong! While it is true that <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> and the underlying technology are
                    incredibly powerful, it is up to you to decide if you trust the steps used to solve the problem. Each time you get a response, check the work shown for any errors. Additionally, we have a zero tolerance policy for requests that violate the terms of use. 
                    Your question will be flagged and you will not get a response. This will not alter the responses for the intended use cases. Our content moderation is inherited from <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://openai.com/'>Open AI</a>. If they flag your question, it is flagged here too.
                </h1>
            </div>
            <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Ready to Start?</h1>
            </div>
            <div className='flex justify-center items-center border rounded-md bg-white px-5 py-5'>
                <h1 className='font-semibold justify-center items-center'>
                    Head to the <button className='font-extrabold hover:animate-pulse text-blue-600' onClick={() => setFeature("Home")}> Home</button> page!
                </h1>
            </div>
            <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
                <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Learn More About How Featherr Works</h1>
            </div>
            <div className='border rounded-md bg-white px-5 py-5'>
                <h1 className='font-semibold'>
                    <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> reponses are generated by <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://openai.com/research/gpt-4'>GPT</a>, which was created
                    by <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://openai.com/'>Open AI</a>. <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://openai.com/research/gpt-4'>GPT</a> is a Large-Language Model, which means it is a big 
                    codebase that tries to solve a simple problem: given all the information I have, what do I say next? <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> uses this underlying technology
                    and tunes it to do the task at hand. Whereas <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://chat.openai.com/'>ChatGPT</a> may not do exactly what you ask all the time, 
                    we hope <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'>Featherr</span> will do the job. Congratulations to <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://openai.com/'>Open AI</a> for
                    their amazing work on <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900' href='https://openai.com/research/gpt-4'>GPT</a>, we encourage you to read more about them below:
                </h1>
                <a href='https://openai.com/'>
                    <div className='flex flex-row justify-start items-center pt-4 hover:hover:animate-pulse'>
                        <h1 className='text-xl font-extrabold pr-2'>Open AI</h1>
                        <SiOpenai size={25} />
                    </div>
                </a>
            </div>
        </div>
    )
}
