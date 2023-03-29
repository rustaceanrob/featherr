import React from 'react'
import TierTile from './TierTile'

export default function AddCreditsPage() {
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-10'>
        <TierTile tier={"Basic"} price={"Free"} description={"Credits reset to 50 on the first of every month. Perfect for asking a couple questions every month and casual reading."} fontStyle={"text-slate-600"} headerStyle={"text-slate-800"} perks={["Great for new users"]}/>
        <TierTile tier={"Lite"} price={"$4"} description={"400 Credits awarded or added onto an existing balance on the first of every month. Ideal for hobbyist coders and writers. Maximum credit balance of 500."} headerStyle={"text-slate-800"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Access to Math"]}/>
        <TierTile tier={"Bold"} price={"$8"} description={"800 Credits awarded or added onto an existing balance on the first of every month. Great for students and recommended for most users. Maximum credit balance of 1000."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400"}  fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Cheaper than GitHub Copilot", "Cheaper than Chegg"]}/>
        <TierTile tier={"Pro"} price={"$16"} description={"2000 Credits awarded or added onto an existing balance on the first of every month. Access to the best models available. Best for powerusers that read, write, and code frequently. Maximum credit balance of 3000."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Best value"]}/>
    </div>
  )
}
