import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, showNavbar = true, showFooter = true }) {
  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}