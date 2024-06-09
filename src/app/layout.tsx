import './globals.css'

import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/providers/theme-provider'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Estoque Economico',
    default: 'Estoque Economico',
  },
  description:
    'Estoque Economico é uma plataforma de controle de estoque para pequenas empresas.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
