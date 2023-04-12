import React from 'react'
import { MathJax } from 'better-react-mathjax'

export default function MathButton({prompt, expression, setPrompt}) {
    const handleClick = (event) => {
        event.preventDefault()
        if (prompt.slice(-1) === "$") {
            setPrompt(prompt.replace(/\$$/, `${expression}$`))
        } else {
            setPrompt(prompt + `$${expression}$`)
        }
    }

    return (
        <button className='border px-2 py-2 rounded-md' onClick={(event) => handleClick(event)}>
            <MathJax>{"$" + expression.trim() + "$"}</MathJax>
        </button>
    )
}
