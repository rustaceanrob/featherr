import React from 'react'
import { MathJax } from 'better-react-mathjax'

export default function EquationButton({expression, rendered, isFunc, equation, setEquation}) {
    
    const appendString = (str, subStr) => {
        const atIndex = str.lastIndexOf('@');
        if (atIndex !== -1) {
            let firstPart;
            let secondPart
            if (isFunc) {
                firstPart = str.slice(0, atIndex).replace(/@/g, "");
                secondPart = str.slice(atIndex).replace(/@/g, "");
            } else {
                firstPart = str.slice(0, atIndex);
                secondPart = str.slice(atIndex);
            }
          return `${firstPart}${subStr}${secondPart}`;
        }
        return `${str}${subStr}`;
    }
      
    const handleClick = (event) => {
        event.preventDefault()
        console.log(appendString(equation, expression))
        setEquation(appendString(equation, expression))
    }

    return (
        <button className='border text-sm px-1 py-1 rounded-md hover:animate-pulse' onClick={(event) => handleClick(event)}>
            <MathJax>{"$" + rendered.trim() + "$"}</MathJax>
        </button>
    )
}
