import React from 'react'
import TierTile from './TierTile'

export default function AddCreditsPage() {
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-10 pb-10'>
        <TierTile tier={"Basic"} price={"Free"} description={"Credits reset to 50 on the first of every month. Perfect for drafting a couple emails and asking a couple questions every month."} fontStyle={"text-slate-600"} headerStyle={"text-slate-800"} perks={["Access to every feature"]}/>
        <TierTile tier={"Lite"} price={"$4"} description={"150 Credits awarded or added onto an existing balance on the first of every month. Ideal for hobbyist coders and writers. Maximum credit balance of 300."} headerStyle={"text-slate-800"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Great for new users"]}/>
        <TierTile tier={"Bold"} price={"$8"} description={"400 Credits awarded or added onto an existing balance on the first of every month. Great for students and recommended for most users. Maximum credit balance of 1000."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400"}  fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["Best value", "Cheaper than GitHub Copilot", "Cheaper than Chegg"]}/>
        <TierTile tier={"Pro"} price={"$16"} description={"750 Credits awarded or added onto an existing balance on the first of every month. Access to the best models available. Best for powerusers that read, write, and code frequently. Maximum credit balance of 2000."} headerStyle={"text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400"} fontStyle={"text-slate-600"} hover={"hover:scale-110 duration-200 hover:cursor-copy"} perks={["150 math and coding responses"]}/>
    </div>
  )
}
