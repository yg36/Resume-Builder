'use client'

import { useContext, useRef } from 'react'
import { ResumeContext } from '../context/ResumeContext'
import {
  FileText,
  Bookmark,
  Briefcase,
  Link as LinkIcon,
  GraduationCap
} from 'lucide-react'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const sectionIcons = {
  summary: <FileText size={16} />,
  skills: <Bookmark size={16} />,
  experience: <Briefcase size={16} />,
  projects: <FileText size={16} />,
  education: <GraduationCap size={16} />,
  links: <LinkIcon size={16} />
}

export default function ResumePreview() {
  const { resume, template } = useContext(ResumeContext)
  const resumeRef = useRef()

  const sections = Object.entries(resume).filter(
    ([key, value]) => value && !['name', 'email', 'phone'].includes(key)
  )

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    const canvas = await html2canvas(resumeRef.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${resume.name || 'resume'}.pdf`)
  }

  return (
    <div className={`card resume-preview fade-in ${template}`} ref={resumeRef}>
      <div className="resume-header">
        <h1 className="resume-name">{resume.name || 'Your Name'}</h1>
        {(resume.email || resume.phone) && (
          <p className="resume-contact">
            {resume.email} {resume.email && resume.phone ? '|' : ''} {resume.phone}
          </p>
        )}
      </div>

      {sections.map(([key, value], idx) => (
        <Section key={key} title={key} content={value} index={idx} template={template} />
      ))}

      {sections.length > 0 && (
        <button className="export-btn hover-effect" onClick={downloadPDF}>
          Download as PDF
        </button>
      )}
    </div>
  )
}

function Section({ title, content, index, template }) {
  const icon = sectionIcons[title.toLowerCase()] || <FileText size={16} />

  let sectionClass = 'section-content'
  if (template === 'modern') sectionClass += ' modern-section'
  if (template === 'compact') sectionClass += ' compact-section'

  return (
    <div className={`resume-section fade-in delay-${index + 1}`}>
      <h3 className="section-title">
        <span className="section-icon">{icon}</span>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h3>
      <p className={sectionClass}>{content}</p>
    </div>
  )
}
