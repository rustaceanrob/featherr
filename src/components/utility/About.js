import React from 'react'

export default function About() {
  return (
    <div className='flex flex-col pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-10'>
        <div className='flex flex-row jusify-center items-center pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Hi there!</h1>

        </div>
        <div className='border rounded-md px-5 py-5 bg-green-100'>
            <h1 className='font-semibold'>
                For new users, it is recommended you read this section to get familiar with  <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Chewie.</span>
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>What is this app?</h1>

        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Chewie</span> is an application built for learning and productivity. 
                Powered by artificial intelligence, 
                this app can generate summaries for book chapters, create citations, and answer questions you have about a text you are reading.
                For students and academics, Scribe Pro can help explain confusing concepts in your text and define technical nomenclature. 
                For fervid readers, this application can provide summaries of text before you buy the publication, 
                so you can decide if you will do a deep dive into the material.
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Features</h1>

        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Summaries</span> provides customizable synopses of 
                books, movies, TV shows, and academic publications. You can choose the length and creativity of the response to meet your goals. 
                This feature is great for "pre-reading" a book to decide if you would like to read it in full. For fiction addicts, Scribe pro will try not to spoil the best portions of the book, 
                and, for technical readers, the summaries will provide a level of detail that will expand your understanding of a subject in just a couple minutes.
            </h1>
            <h1 className='font-semibold pt-5'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Interactions</span> allow you to expand your learning. 
                This feature allows you to ask open-ended questions about your text to help you hone in your understanding. Some example users include biology students that need to clear up 
                their understanding of a topic or defintion, or intense readers that want to examine and learn more about concepts from their text.
            </h1>
            <h1 className='font-semibold pt-5'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Citations</span> assists academics in creating bibliographies quickly and easily.
                When you are unsure about the year or publisher of your citation, artificial intelligence will try to fill in the missing info for you.
            </h1>
        </div>
        <div className='flex flex-row jusify-center items-center pt-5 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>How usage works</h1>

        </div>
        <div className='border rounded-md bg-white px-5 py-5'>
            <h1 className='font-semibold'>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Credits:</span> All features of <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700'>Chewie</span> are
                accessed with credits. You are given a 100 credits for free when you first sign in. If you need more credits, you can purchase more credits from a variety of pricing options.
            </h1>
        </div>
    </div>
  )
}
