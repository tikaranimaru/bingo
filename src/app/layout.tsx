import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KC BINGO',
  description: 'ビンゴゲームを楽しもう！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" data-theme="lemonade">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
