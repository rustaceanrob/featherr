import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const signInWithGooglePopUp = () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithPopup(auth, googleProvider)
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, [])

    return (
        <UserContext.Provider value={{user, signInWithGooglePopUp, logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}