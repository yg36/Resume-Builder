'use client'

import { useContext, useRef, useEffect } from 'react'
import { ResumeContext } from '../context/ResumeContext'
import { User, Mail, Phone, FileText, Bookmark, Briefcase, Link as LinkIcon, GraduationCap } from 'lucide-react'

const iconsMap = {
  name: <User size={18} />,
  email: <Mail size={18} />,
  phone: <Phone size={18} />,
  summary: <FileText size={18} />,
  skills: <Bookmark size={18} />,
  experience: <Briefcase size={18} />,
  projects: <FileText size={18} />,
  education: <GraduationCap size={18} />,
  links: <LinkIcon size={18} />
}

export default function ResumeForm() {
  const { resume, setResume } = useContext(ResumeContext)
  const refs = useRef({})

  // Auto-resize textareas
  useEffect(() => {
    Object.values(refs.current).forEach((el) => {
      if (el) el.style.height = 'auto'
      if (el) el.style.height = el.scrollHeight + 'px'
    })
  }, [resume])

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value })
  }

  return (
    <div className="card form fade-in">
      <h2 className="form-header">Resume Details</h2>

      {Object.keys(resume).map((field) => (
        <div key={field} className="form-group">
          <label className="form-label">
            <span className="label-icon">{iconsMap[field]}</span>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <textarea
            ref={(el) => (refs.current[field] = el)}
            name={field}
            value={resume[field]}
            onChange={handleChange}
            rows={field === 'summary' ? 3 : 2}
            className="form-input"
            placeholder={`Enter your ${field}`}
          />
        </div>
      ))}
    </div>
  )
}
