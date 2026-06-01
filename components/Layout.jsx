'use client'
import React from 'react'

export default function Layout({children}){
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="text-xl font-semibold">AI Career Guidance</div>
          <nav className="space-x-4">
            <a href="/" className="text-sm text-indigo-600">Home</a>
            <a href="/onboarding" className="text-sm text-gray-700">Onboarding</a>
          </nav>
        </div>
      </header>
      <section className="py-8">{children}</section>
      <footer className="text-center text-sm text-gray-500 py-6">© AI Career Guidance</footer>
    </div>
  )
}
