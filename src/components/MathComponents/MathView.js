import React, { useState } from 'react'
import { MathJaxContext } from 'better-react-mathjax'
import Loading from '../utility/Loading'
import Solution from './Solution'
import MathInput from './MathInput'

export default function MathView({tier, credits, setUserCredits}) {
    const [prompt, setPrompt] = useState(``)
    const [solution, setSolution] = useState()
    const [solutionLoading, setSolutionLoading] = useState(false)
    // const handleOpen = (page) => {
    //     window.open('/' + page, '_blank');
    // }
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
      <div className='flex flex-col lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 sm:pl-20 sm:pr-20 pl-5 pr-5 pt-5'>
        <MathInput tier={tier} solution={solution} prompt={prompt} setPrompt={setPrompt} credits={credits} setUserCredits={setUserCredits} setSolution={setSolution} setSolutionLoading={setSolutionLoading}/>
        { solution ? (
          <div>
              <div className='pt-5 pb-2'>
                  <Loading isLoading={solutionLoading} message={"We are working on that solution right now"}/> 
              </div>
              <Solution prompt={prompt} solution={solution} setSolutionLoading={setSolutionLoading}/>
          </div>
          ) : (
          <>
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