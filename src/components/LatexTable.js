import React, { useEffect } from 'react'
import MathCategory from './utility/MathCategory'

export default function LatexTable() {
    let commonExpressionTypes = ['Fractions', 'Exponents', 'Square Root', 'Polynomials', 'Less Than', 'Less Or Equal', 'Greater Or Equal', 'Not Equal', 'Approximately']
    let commonExpressions = ['\\frac{1}{2}', 'x^2', '\\sqrt{x^4 - 16}', '2x^3 + x - 4', '<', '\\leq', '\\geq', '\\neq', '\\approx']
    let commonFunctionTypes = ['Sin', 'Cosine', 'Tangent', 'Inverse Sin', 'Inverse Tangent', 'Natural Log', 'Logrithm', 'Exponential', 'Limit' ,'Summation', 'Product']
    let commonFunctions = ['\\sin(x)', '\\cos(x)', '\\tan(x)', '\\arcsin(x)', '\\arctan(x)', '\\ln(x)', '\\log(x)', 'e^x', '\\lim' ,'\\sum', '\\prod']
    let greekAlpha = ['Pi','Alpha', 'Beta', 'Theta', 'Delta', 'Gamma', 'Sigma', 'Capital Gamma', 'Capital Delta', 'Capital Sigma']
    let greeks = ['\\pi','\\alpha', '\\beta', '\\theta', '\\delta', '\\gamma', '\\sigma', '\\Gamma', '\\Delta', '\\Sigma']
    let calculusExpressionsTypes = ['First Derivative', 'Derivative at a Point', 'Integral', 'Defined Integral', 'Limit', 'Defined Summation']
    let calculusExpressions = ['\\frac{d}{dx}', '\\frac{d}{dx} x^2 |_{x=3}', '\\int zdz', '\\int_0^1 x^2 dx', '\\lim_{x \\to a}', '\\sum_{i=1}^n']
    let statisticsExpressionsTypes = ['Expected Value', 'Variance', 'Mean', 'Hat', 'Binomial']
    let statisticsExpressions = ['\\mathbb{E}', '\\mathbb{V}', '\\bar{x}', '\\hat{p}', '\\binom{k}{1}']
    let matrixExpressionTypes = ['Matrix', 'Vector', 'Transpose', 'Inverse','Vector Dot Product', 'Vector Cross Product']
    let matrixExpressions = ['\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',  '\\begin{pmatrix} x \\\\ y \\end{pmatrix}', 'A^\\intercal', 'A^{-1}', '\\vec{a} \\cdot \\vec{c}', '\\vec{a} \\times \\vec{c}']

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='flex flex-col pl-5 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-5 pt-0 pb-10 bg-gray-100'>
            <MathCategory category={"Common Expressions"} expressionTypes={commonExpressionTypes} expressions={commonExpressions}/>
            <MathCategory category={"Common Functions"} expressionTypes={commonFunctionTypes} expressions={commonFunctions}/>
            <MathCategory category={"Greeks"} expressionTypes={greekAlpha} expressions={greeks}/>
            <MathCategory category={"Statistics"} expressionTypes={statisticsExpressionsTypes} expressions={statisticsExpressions}/>
            <MathCategory category={"Calculus"} expressionTypes={calculusExpressionsTypes} expressions={calculusExpressions}/>
            <MathCategory category={"Linear Algebra"} expressionTypes={matrixExpressionTypes} expressions={matrixExpressions}/>
            <div className='absolute top-0 left-0 h-screen object-cover w-full bg-gray-100 z-[-100]'>
            </div>
        </div>
    )
}
