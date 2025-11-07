import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebaseApp'

export const Login = () => {
    const handleSignIn = async ()=>{
        await signInWithPopup(auth,provider)
    }
  return (
    <div className='signin'>
        <p>Jelentkezz be</p>
        <button className='logInBtn' onClick={handleSignIn}>Bejelentkezés Google fiókkal</button>
    </div>
  )
}