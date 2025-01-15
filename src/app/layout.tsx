import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TON BOC Generator',
  description: 'tool to generate BOC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
