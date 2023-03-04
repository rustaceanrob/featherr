import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import Ask from './Ask'
import About from './utility/About'
import Citations from './Citations'
import Summaries from './Summaries/Summaries'
import FeatureRouter from './utility/FeatureRouter'
import Code from './CodeComponents/Code'

export default function MainView() {
    const navigate = useNavigate()
    const { user, logOut } = UserAuth()
    const [ feature, setFeature ] = useState("About")

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    const handleSignOut = async () => {
        try {
            await logOut()
            navigate('/login')
        } catch(error) {
            return
        }
    }

    return (
        <>
            <div className='bg-gray-100'>
                <div className='flex flex-row justify-end items-center pr-10 pt-5 sm:pb-4 pb-2 border-b'> 
                    <div className='flex flex-row'>
                        <button className="flex flex-row justify-center items-center rounded border px-2 py-2 bg-white hover:scale-110 duration-200" onClick={handleSignOut}>
                            <span className='text-sm font-bold'>Sign Out</span>
                            <CiLogout size={16} className='ml-2'/>
                        </button>
                        {
                            user.photoURL ? (
                                <img className="img-thumbnail object-contain h-10 w-10 rounded-3xl ml-5" src={user && user.photoURL}/>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
                <FeatureRouter currentFeature={feature} setFeature={setFeature}/>
                {/* where conditional rendering will occur */}
                {
                    {
                        'About': <About/>,
                        'Summarize': <Summaries/>,
                        'Code': <Code/>, 
                        'Cite': <Citations/>,
                        'Interact': <Ask/>,
                    } [feature]
                }
            </div>
            {/* background color */}
            <div className='absolute top-0 left-0 h-screen object-cover w-full bg-gray-100 z-[-100]'>
            </div>
        </>
    )
}
