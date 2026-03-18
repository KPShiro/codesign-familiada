import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Family Feud',
  description: 'Family Feud game management system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
