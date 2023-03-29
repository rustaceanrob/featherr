import React from 'react'
import { MathJaxContext, MathJax } from 'better-react-mathjax'

export default function LaTeXExpression({text}) {
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
        <div className='flex flex-row justify-start items-center pt-2'>
            <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 pr-2'>Output:</h1>
            <MathJaxContext version={3} config={mjaxConfig}>
                <MathJax inline>
                    {"$" + text + "$"}
                </MathJax>
            </MathJaxContext>
        </div>
    )
}
