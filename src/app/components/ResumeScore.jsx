'use client'

import { useContext, useEffect, useState } from 'react'
import { ResumeContext } from '../context/ResumeContext'

export default function ResumeScore() {
  const { resume } = useContext(ResumeContext)
  const [mounted, setMounted] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)

  const sections = Object.entries(resume).filter(
    ([key]) => !['name', 'email', 'phone'].includes(key)
  )

  const total = sections.length
  const filled = sections.filter(([_, val]) => val && val.trim() !== '').length
  const score = total ? Math.round((filled / total) * 100) : 0

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let start = 0
    const step = Math.ceil(score / 20)
    const interval = setInterval(() => {
      start += step
      if (start >= score) {
        start = score
        clearInterval(interval)
      }
      setAnimatedScore(start)
    }, 15)
    return () => clearInterval(interval)
  }, [score, mounted])

  const getColor = () => {
    if (score < 50) return '#ef4444'
    if (score < 80) return '#f59e0b'
    return '#22c55e'
  }

  // Static path for server-side rendering
  const svgPath =
    'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'

  return (
    <div className="score-card fade-in">
      <div className="score-circle">
        <svg viewBox="0 0 36 36">
          <path className="circle-bg" d={svgPath} />
          {mounted && (
            <path
              className="circle"
              stroke={getColor()}
              strokeDasharray={`${animatedScore}, 100`}
              d={svgPath}
            />
          )}
          <text x="18" y="20.35" className="percentage">
            {mounted ? animatedScore : 0}%
          </text>
        </svg>
      </div>
      <div className="score-text">
        <h3>Resume Completeness</h3>
        {score < 100 && <p>Fill more sections to reach 100%</p>}
        {score === 100 && <p>All sections complete! 🎉</p>}
      </div>
    </div>
  )
}
