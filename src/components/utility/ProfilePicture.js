import React, { useEffect, useState } from 'react'

export default function ProfilePicture({user}) {
    const [picture, setPicture] = useState(null)
    useEffect(() => {
        setPicture(user.photoURL)
    }, [user?.photoURL])

    return (
        <img className="img-thumbnail object-contain h-10 w-10 rounded-3xl ml-5" src={picture}/>
    )
}
