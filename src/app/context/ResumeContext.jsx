'use client'
import { createContext, useState, useEffect } from 'react'

export const ResumeContext = createContext()

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    projects: '',
    education: '',
    links: ''
  })

  const [template, setTemplate] = useState('minimal') // <-- Add this

  // Load saved resume
  useEffect(() => {
    const saved = localStorage.getItem('resume-data')
    if (saved) setResume(JSON.parse(saved))
  }, [])

  // Save resume automatically
  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(resume))
  }, [resume])

  // Optional: save template too
  useEffect(() => {
    localStorage.setItem('resume-template', template)
  }, [template])

  return (
    <ResumeContext.Provider value={{ resume, setResume, template, setTemplate }}>
      {children}
    </ResumeContext.Provider>
  )
}
