import React, { useState } from 'react'
import { MathJaxContext } from 'better-react-mathjax'
import Loading from '../utility/Loading'
import Solution from './Solution'
import MathInput from './MathInput'

export default function MathView({credits, setUserCredits}) {
    const [solution, setSolution] = useState()
    const [solutionLoading, setSolutionLoading] = useState(false)
    const handleOpen = (page) => {
        window.open('/' + page, '_blank');
    }
    const mjaxConfig = {
      loader: { load: ["[tex]/html"] },
      tex: {
        packages: { "[+]": ["html"] },
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"]
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\[", "\\]"]
        ]
      }
    }

    return (
      <MathJaxContext version={3} config={mjaxConfig}>
      <div className='flex flex-col lg:pl-60 lg:pr-60 md:pl-20 md:pr-20 sm:pl-20 sm:pr-20 pl-5 pr-5 pt-5'>
        <MathInput solution={solution} credits={credits} setUserCredits={setUserCredits} setSolution={setSolution} setSolutionLoading={setSolutionLoading}/>
        { solution ? (
          <div>
              <div className='pt-5 pb-2'>
                  <Loading isLoading={solutionLoading} message={"We are working on that solution right now"}/> 
              </div>
              <Solution solution={solution} setSolutionLoading={setSolutionLoading}/>
          </div>
          ) : (
          <>
            <div className='pt-5 justify-center items-center' >
              <div className='flex flex-row justify-center items-center border px-5 py-5 rounded-lg bg-white'>
                <h1 className='font-extrabold pr-2 text-sm'>Not sure where to start? Check out the <span className='font-extrabold hover:animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'><button onClick={() => handleOpen("mathguide")}>Math Guide</button></span>. 
                Looking for a LaTeX command? Check out the <span className='font-extrabold hover:animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900'><button onClick={() => handleOpen("latextable")}>LaTeX Table</button></span>. </h1>
                <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-900'></span>
              </div>
            </div>
            <div className='pt-10 hover:cursor'>
                <div className='bg-white border rounded-md w-full h-full'>
                    <p className='text-gray-400 px-5 py-5'>Your solution will appear here</p>
                </div>
            </div>
            <div className='pt-10 pb-5'>
                <Loading isLoading={solutionLoading} message={"We are working on that solution right now"}/> 
            </div>
          </>
        )}
      </div>
      </MathJaxContext>
    )
}