import React from 'react'
import { BsQuestionCircle, BsInfoCircle, BsCodeSlash, BsTerminal } from 'react-icons/bs'
import { TbMathSymbols } from 'react-icons/tb'
import { CiText } from 'react-icons/ci'
import { TfiWrite } from 'react-icons/tfi'
import { MdSummarize, MdOutlineReceiptLong } from 'react-icons/md'
import Tile from './Tile'


export default function Home({setFeature}) {
  return (
    <div className='flex flex-col sm:pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 sm:pr-20 pl-10 pr-10 pt-10 pb-10'>
        <div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 pb-5'>
            <Tile feature={"About"} setFeature={setFeature} icon={<BsInfoCircle className='text-blue-700'/>} message={"Learn more about Featherr"}/>
            <Tile feature={"Ask"} setFeature={setFeature} icon={<BsQuestionCircle className='text-blue-700'/>} message={"Ask for help on anything"}/>
            <Tile feature={"Cite"} setFeature={setFeature} icon={<CiText size={20} className='text-blue-700'/>} message={"Get MLA and APA citations"}/>
            <Tile feature={"Code"} setFeature={setFeature} icon={<BsCodeSlash className='text-blue-700'/>} message={"Generate code"}/>
            <Tile feature={"Debug"} setFeature={setFeature} icon={<BsTerminal className='text-blue-700'/>} message={"Readable error explanations"}/>
            <Tile feature={"Math"} setFeature={setFeature} icon={<TbMathSymbols size={20} className='text-blue-700'/>} message={"Solve math problems"}/>
            <Tile feature={"Summarize"} setFeature={setFeature} icon={<MdSummarize className='text-blue-700'/>} message={"Summarize a book"}/>
            <Tile feature={"TLDR"} setFeature={setFeature} icon={<MdOutlineReceiptLong className='text-blue-700'/>} message={"Summarize a chunk of text"}/>
            <Tile feature={"Write"} setFeature={setFeature} icon={<TfiWrite className='text-blue-700'/>} message={"Overcome writer's block"}/>
        </div>
    </div>
  )
}
