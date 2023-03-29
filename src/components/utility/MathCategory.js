import React from 'react'
import TableExpression from './TableExpression'

export default function MathCategory({category, expressionTypes, expressions}) {
  return (
    <div>
        <div className='flex flex-row jusify-center items-center pt-10 pb-5'>
            <h1 className='text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>{category}</h1>
        </div>
        <div className='border rounded-md bg-white px-5 py-5 bg-white grid grid-cols-1 xl:grid-cols-2 gap-2'>
            {
                expressions.map((expression, index) => 
                {
                    return (
                            <TableExpression expressionType={expressionTypes[index]} expression={expression}/>
                        )
                    }
                )
            }
        </div>
    </div>
  )
}
