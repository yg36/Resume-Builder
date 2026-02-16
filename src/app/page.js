'use client'

import { ResumeProvider } from './context/ResumeContext'
import Header from './components/Header'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import ResumeScore from './components/ResumeScore'
import PrivacyBadge from './components/PrivacyBadge'
import SectionReorder from './components/SectionReorder'
import TemplateSwitcher from './components/TemplateSwitcher'

export default function Home() {
  return (
    <ResumeProvider>
      <main className="container">
        <Header />

        <div className="builder-layout">
          <div className="left-panel">
            <ResumeForm />
            <SectionReorder />
            <TemplateSwitcher />
          </div>

          <div className="right-panel">
            <ResumePreview />
          </div>
        </div>

        <div className="bottom-panel">
          <ResumeScore />
          <PrivacyBadge />
        </div>
      </main>
    </ResumeProvider>
  )
}
