import { ReactNode } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Linhas | AGERBA',
  description:
    'App construído para acesso a dados de linhas reguladas pela AGERBA',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-inter flex h-screen flex-col bg-zinc-100`}
      >
        {children}
      </body>
    </html>
  )
}
