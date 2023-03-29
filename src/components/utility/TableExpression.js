import React from 'react'
import { MathJaxContext, MathJax } from 'better-react-mathjax'

export default function TableExpression({expressionType, expression}) {
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
        <div className='grid grid-cols-3 gap-3 border rounded-md px-2 py-2'>
            <div className='flex flex-row justify-center items-center'>
                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700'>{expressionType}</h1>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <h1 className='font-bold'>{expression}</h1>
            </div>
            <div className='flex flex-row justify-start items-center'>
                <MathJaxContext version={3} config={mjaxConfig}>
                    <MathJax inline>
                        {"$" + expression + "$"}
                    </MathJax>
                </MathJaxContext>
            </div>
        </div>
    )
}
