'use client'

import { useContext } from 'react'
import { ResumeContext } from '../context/ResumeContext'

export default function TemplateSwitcher() {
  const { template, setTemplate } = useContext(ResumeContext)

  const templates = ['minimal', 'modern', 'compact']

  return (
    <div className="card template-card">
      <h3 className="template-title">Choose Template</h3>
      <div className="template-options">
        {templates.map(t => (
          <button
            key={t}
            className={`template-btn ${template === t ? 'active' : ''}`}
            onClick={() => setTemplate(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
