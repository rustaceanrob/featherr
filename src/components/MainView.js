import React, { useEffect, useState } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions"
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import { MdDownloading } from 'react-icons/md'
import { GrAddCircle } from 'react-icons/gr'
import Logo from '../assets/logo2.png'
import About from './utility/About'
import Citations from './CitationComponents/Citations'
import FeatureRouter from './utility/FeatureRouter'
import Code from './CodeComponents/Code'
import Debug from './DebugComponents/Debug'
import TLDR from './TLDRComponents/TLDR'
import Home from './HomeComponents/Home'
import MathView from './MathComponents/MathView'
import AddCreditsPage from './utility/AddCreditsPage'
import Account from './utility/Account'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function MainView() {
    const navigate = useNavigate()
    const { user, logOut } = UserAuth()
    const [ tier, setTier] = useState("Basic")
    const [ feature, setFeature ] = useState("Home")
    const [ userCredits, setUserCredits ] = useState()
    const functions = getFunctions()
    const doesNeedUser = httpsCallable(functions, 'doesNeedUser')   

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        doesNeedUser().then((response) => {
            setUserCredits(response.data.credits)
            if (response.data.page) {
                setFeature(response.data.page)
            }
        })
        getTier()
    }, [user])

    const getTier = async () => {
        const q = collection(db, 'customers', user.uid, 'subscriptions')
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => {
            if (doc.data().status === "active") {
                setTier("Bold")
            } else {
                setTier("Basic")
            }
        });
    }

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
                <div className='flex flex-row justify-end items-center pr-5 md:pr-10 pt-5 sm:pb-4 pb-2 border-b'> 
                    <div className='flex flex-row'>
                        {
                            userCredits ? (
                                    <>
                                                                        {
                                        tier === "Basic" ? (
                                            <h1 className='flex flex-row font-bold text-sm text-slate-400 justify-center items-center pr-4'>{userCredits} Credits</h1>
                                        ) : (
                                            <h1 className='flex flex-row font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900 justify-center items-center pr-4'>{tier} Plan</h1>
                                        )

                                    }
                                    </>
                            ) : (
                                <h1 className='flex flex-row font-bold text-sm text-slate-400 justify-center items-center pr-4'><MdDownloading size={20} className='animate-pulse mr-2'/> Downloading</h1>
                            )
                        }
                        <div className='pr-2 flex flex-row hidden sm:block justify-center items-center'>
                            <button className="flex flex-row justify-center items-center rounded border px-2 py-2 bg-gradient-to-r bg-white hover:animate-pulse hover:from-amber-600 hover:to-amber-400 hover:scale-110 duration-200" onClick={() => setFeature("Upgrade")}>
                                <GrAddCircle className='mr-1 text-amber-200'/>
                                <span className='text-sm font-bold'>Upgrade</span>
                            </button>
                        </div>
                        <button className="flex flex-row justify-center items-center rounded border pr-2 px-2 py-2 bg-white hover:scale-110 duration-200" onClick={handleSignOut}>
                            <span className='text-sm font-bold'>Sign Out</span>
                            <CiLogout size={16} className='sm:ml-2 ml-1'/>
                        </button>
                        <img className="justify-center items-center img-thumbnail hidden sm:block object-contain h-8 w-8 rounded-3xl ml-5" src={Logo} alt={""}/>
                    </div>
                </div>
                <FeatureRouter currentFeature={feature} setFeature={setFeature}/>
                {
                    {
                        'About': <About tier={tier} setFeature={setFeature}/>,
                        'Code': <Code tier={tier} credits={userCredits} setUserCredits={setUserCredits}/>, 
                        'Debug': <Debug tier={tier} credits={userCredits} setUserCredits={setUserCredits}/>,
                        'Math': <MathView tier={tier} credits={userCredits} setUserCredits={setUserCredits}/>,
                        'Cite': <Citations tier={tier} credits={userCredits} setUserCredits={setUserCredits}/>,
                        'Summarize': <TLDR tier={tier} credits={userCredits} setUserCredits={setUserCredits}/>,
                        'Upgrade': <AddCreditsPage/>,
                        'Account': <Account user={user} credits={userCredits} setFeature={setFeature}/>,
                        'Home': <Home setFeature={setFeature}/>
                    } [feature]
                }
            </div>
            {/* background color */}
            <div className='absolute top-0 left-0 h-screen object-cover w-full bg-gray-100 z-[-100]'>
            </div>
        </>
    )
}
