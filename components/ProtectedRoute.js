'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Brain } from 'lucide-react'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser')
      
      if (currentUser) {
        setIsAuthenticated(true)
      } else {
        // Redirect to auth page if not logged in
        router.push('/auth')
        return
      }
      
      setIsLoading(false)
    }

    // Small delay to prevent flash
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
            <Brain className="text-white" size={32} />
          </div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to auth page
  }

  return children
}