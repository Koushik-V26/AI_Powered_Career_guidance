'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "../firebase/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [onboardingStatus, setOnboardingStatus] = useState('loading') // 'loading', 'complete', 'incomplete'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        // Check Firestore for user's onboarding data
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          setOnboardingStatus('complete')
        } else {
          setOnboardingStatus('incomplete')
        }
      } else {
        setOnboardingStatus('incomplete')
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = () => {
    return signOut(auth)
  }

  const value = {
    currentUser,
    onboardingStatus,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}