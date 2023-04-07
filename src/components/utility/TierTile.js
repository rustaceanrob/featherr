import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { db } from '../../config/firebase'
import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore'
import { loadStripe } from '@stripe/stripe-js'
import { UserAuth } from '../../context/AuthContext'

export default function TierTile({tier, price, stripeId, description, fontStyle, headerStyle, hover, perks, setUserDidClick}) {
      const { user } = UserAuth()

      const handleCheckout = async (id) => {
        setUserDidClick(true)
        if (id) {
          const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
              price: id,
              success_url: window.location.origin,
              cancel_url: window.location.origin,
          });
          onSnapshot(doc(db, `customers/${user.uid}/checkout_sessions/${docRef.id}`), async (snap) => {
              const { error, sessionId } = snap.data();
              if (error) {
                alert(`An error occured: ${error.message}`);
                setUserDidClick(false)
              }
              if (sessionId) {
                const stripe = await loadStripe('pk_live_51MovlrGjPi5BxZQHCBBEYdS1KE2fobksKBhDVCu30YcRuRgxESfCxLBczbNCwQcVQd1Bi2n4262NsgKGOnap0jgv000fv7N2dl')
                stripe.redirectToCheckout({sessionId})
                setUserDidClick(false)
              }
          });
        }
    }
    return (
        <div className={`flex flex-col justify-start px-5 py-5 bg-gradient-to-b from-white to-slate-200 border rounded-md shadow-xl ${hover}`} onClick={() => handleCheckout(stripeId)}>
            <div className='flex flex-row justify-between items-start pl-2 pr-2'>
                <h1 className={`${headerStyle} font-extrabold `}>{tier} Plan</h1>
                <h1 className='text-slate-800 font-bold'>{price}</h1>
            </div>
            <div className='pt-5 pl-2 pr-2 flex flex-col justify-start items-start'>
                <h1 className={`font-bold text-sm ${fontStyle} justify-start items-start`}>{description}</h1>
            </div>
            <div className='pt-5 pl-2 pr-2  justify-center items-center'>
                {
                  perks.map(item => {
                    return (
                    <div key={item} className="flex flex-row justify-start items-center pb-4">
                      <BsFillCheckCircleFill size={20} className='text-green-400'/>
                      <h1 className='pl-2 md:pl-4 font-bold'>{item}</h1>
                    </div> )
                  })
                }
            </div>
        </div>
    )
}
