'use client'

import { useContext } from 'react'
import { ResumeContext } from '../context/ResumeContext'
import { MoveUp, MoveDown } from 'lucide-react'

export default function SectionReorder() {
  const { resume, setResume } = useContext(ResumeContext)

  const sections = Object.keys(resume).filter(
    key => !['name', 'email', 'phone'].includes(key)
  )

  const move = (index, direction) => {
    const newSections = [...sections]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newSections.length) return

    const temp = newSections[index]
    newSections[index] = newSections[targetIndex]
    newSections[targetIndex] = temp

    const newResume = {}
    Object.entries(resume).forEach(([key, value]) => {
      if (['name', 'email', 'phone'].includes(key)) {
        newResume[key] = value
      }
    })
    newSections.forEach(key => (newResume[key] = resume[key]))
    setResume(newResume)
  }

  return (
    <div className="card reorder-card">
      <h3 className="reorder-title">Reorder Sections</h3>
      <ul className="reorder-list">
        {sections.map((section, idx) => (
          <li key={section} className="reorder-item">
            <span className="section-name">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
            <div className="reorder-buttons">
              <button onClick={() => move(idx, -1)} title="Move Up" className="move-btn">
                <MoveUp size={18} />
              </button>
              <button onClick={() => move(idx, 1)} title="Move Down" className="move-btn">
                <MoveDown size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
