'use client'

import { Moon, Sun, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mount check for SSR + localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.body.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (dark) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark, mounted])

  return (
    <div className="hero-container">
      {/* Theme toggle */}
      <button
        className="theme-toggle hover-effect"
        onClick={() => setDark(!dark)}
        title="Toggle Dark/Light Mode"
      >
        {dark ? (
          <Sun size={20} className="icon-toggle animate-spin" />
        ) : (
          <Moon size={20} className="icon-toggle animate-spin" />
        )}
      </button>

      {/* Centered content */}
      <div className="hero-center">
        <FileText size={48} className="logo gradient-text fade-in" />
        <h1 className="hero-title fade-in">Build Your Resume Instantly</h1>
        <div className="hero-line"></div>
        <p className="hero-subtitle fade-in delay-1">
          No login. No payment. Stored only in your browser.
        </p>
      </div>
    </div>
  )
}
