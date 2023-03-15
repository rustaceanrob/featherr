import React from 'react'
import { BsQuestionCircle, BsInfoCircle, BsCodeSlash, BsTerminal } from 'react-icons/bs'
import { CiText } from 'react-icons/ci'
import { MdSummarize, MdOutlineReceiptLong } from 'react-icons/md'
import Tile from './Tile'


export default function Home({setFeature}) {
  return (
    <div className='flex flex-col pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-10'>
        <div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 pb-5'>
            <Tile feature={"About"} setFeature={setFeature} icon={<BsInfoCircle className='text-amber-700'/>} message={"Learn more about Feather"}/>
            <Tile feature={"Ask"} setFeature={setFeature} icon={<BsQuestionCircle className='text-amber-700'/>} message={"Ask for help on anything"}/>
            <Tile feature={"Cite"} setFeature={setFeature} icon={<CiText size={20} className='text-amber-700'/>} message={"Get MLA and APA citations"}/>
            <Tile feature={"Code"} setFeature={setFeature} icon={<BsCodeSlash className='text-amber-700'/>} message={"Generate code"}/>
            <Tile feature={"Debug"} setFeature={setFeature} icon={<BsTerminal className='text-amber-700'/>} message={"Readable error explanations"}/>
            <Tile feature={"Summarize"} setFeature={setFeature} icon={<MdSummarize className='text-amber-700'/>} message={"Summarize a book"}/>
            <Tile feature={"TLDR"} setFeature={setFeature} icon={<MdOutlineReceiptLong className='text-amber-700'/>} message={"Summarize a chunk of text"}/>
        </div>
    </div>
  )
}
