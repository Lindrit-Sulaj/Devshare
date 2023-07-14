import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'
import { Navbar, ClientProvider } from '@/components'
import LoginModal from '@/components/modal/LoginModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col lg:flex-row`}>
        <AuthProvider>
          <ClientProvider>
            <LoginModal />
            <Navbar />
          </ClientProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
