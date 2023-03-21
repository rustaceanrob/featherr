import React from 'react'
import { SiOpenai } from 'react-icons/si'

export default function About({setFeature}) {
  return (
    <div className='flex flex-col pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-10'>
        <div className='flex flex-row jusify-center items-center pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Hi!</h1>

        </div>
        <div className='border rounded-md px-5 py-5 bg-green-100'>
            <h1 className='font-semibold'>
                For new users, it is recommended you read this section to get familiar with  <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather.</span>
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>What is this app?</h1>

        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> is an application built for learning and productivity. 
                Powered by artificial intelligence, 
                this app generates writing drafts, book and text summaries, citations, code, and even solutions to math questions. 
                For students, each feature can supercharge productivity in a unique way, and, for programmers, coding and debugging is made seemless.    
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>How usage works</h1>
        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                All features of <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> are
                accessed with <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Add")}> Credits</button>. You are given 50 credits for free when you first sign in. Free-tier users have their credits set back to 50 on the first of every month. If you need more credits, you can purchase <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Add")}> Credits</button> from a variety of pricing options.
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Features</h1>

        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Ask")}> Ask</button> provides 
                customizable answers to any questions you might have. Just pick a book or topic and ask away!
            </h1>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Cite")}> Cite</button> gives MLA and APA citations
                for books, articles, and anything else you might enter. As long as the material was created before 2022, <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> citations
                will attempt to fill in missing information for you, so you can save time working on your bibliography.
            </h1>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Code")}> Code</button> generates programs for you
                in a wide variety of languages, libraries, frameworks. Simply describe what you would like programmed, and the code is returned to you. If you are a seasoned programmer and want to learn a new language or framework, skip the documentation and describe what you need to code. Some of <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> itself was
                built with this feature.
            </h1>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Debug")}> Debug</button> helps you fix your code. 
                No need to stare at the console or rummage around Google and Stack Exchange for the solution when you have <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span>. Just paste the error
                and <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> will give you a human-readable fix!
            </h1>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Math")}> Math</button> crunches out solutions to math-based problems and questions.
                This feature can show you how to solve most problems and provide a reference to theorems and equations. Please check out our full  <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Math")}> Math Guide </button> to learn how to get the most out of this feature!
            </h1>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Summarize")}> Summarize</button> provides customizable synopses of 
                books. You can choose the length and creativity of the response to meet your goals and interests!
            </h1>
            <h1 className='font-semibold pb-4'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("TLDR")}> TLDR</button> stands for Too Long, Didn't Read. Just paste in a big block of text, 
                and <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> will summarize the text for you in a style of your choice: either a paragraph or bullet points.
            </h1>
            <h1 className='font-semibold'>
                <button className='font-extrabold text-transparent hover:animate-pulse bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' onClick={() => setFeature("Write")}> Write</button> is a powerful writing tool for jumpstarting your first draft and beating
                writer's block. Just describe what you would like written, and <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> takes care of the rest.
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Disclaimer</h1>
        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> is an AI, and AI can get things wrong! While it is true that <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> and the underlying technology is
                incredibly powerful, it is up to you to decide if you trust the steps used to solve the problem. Each time you get a response, check the work shown for any errors. Additionally, we have a zero tolerance policy for requests that violate the terms of use. 
                Your question will be flagged and you will not get a response. This will not alter the responses for the intended use cases. Our content moderation is inherited from <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://openai.com/'>Open AI</a>. If they flag your question, it is flagged here too.
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Learn More About How Feather Works</h1>
        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> reponses are generated by <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://openai.com/research/gpt-4'>GPT</a>, which was created
                by <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://openai.com/'>Open AI</a>. <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://openai.com/research/gpt-4'>GPT</a> is a Large-Language Model, which means it is a big 
                codebase that tries to solve a simple problem: given all the information I have, what do I say next? <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> uses this underlying technology
                and tunes it to do the task at hand. Whereas <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://chat.openai.com/'>ChatGPT</a> may not do exactly what you ask all the time, 
                we hope <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Feather</span> will do the job. Congratulations to <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://openai.com/'>Open AI</a> for
                their amazing work on <a className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700' href='https://openai.com/research/gpt-4'>GPT</a>, we encourage you to read more about them below:
            </h1>
            <a href='https://openai.com/'>
                <div className='flex flex-row justify-start items-center pt-4 hover:animate-pulse'>
                    <h1 className='text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 pr-2'>Open AI</h1>
                    <SiOpenai size={25} />
                </div>
            </a>
        </div>
    </div>
  )
}
