// /app/assessment/layout.js
'use client'

import ProtectedRoute from '../../components/ProtectedRoute'

export default function AssessmentLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}