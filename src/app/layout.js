import './styles/globals.css'

export const metadata = {
  title: 'Instant Resume Maker',
  description: 'Create and download resume instantly. No login required.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
