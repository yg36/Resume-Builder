'use client'

import { ShieldCheck } from 'lucide-react'
import { useState } from 'react'

export default function PrivacyBadge() {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="privacy-badge"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ShieldCheck className={`badge-icon ${hover ? 'animate-bounce' : ''}`} size={18} />
      <span className="badge-text">
        Stored only in your browser. No server. No tracking.
      </span>

      {hover && (
        <div className="badge-tooltip">
          Your data never leaves this device. Safe & private.
        </div>
      )}
    </div>
  )
}
