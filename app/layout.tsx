import { Navbar, Footer } from '@/components'
import '../styles/globals.css'
import type { Metadata } from 'next'
import ProvidersWrapper from './ProviderWrapper'

export const metadata: Metadata = {
  title: 'Lost & Found',
  description: 'Reuniting people with their lost items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='relative'>
        <ProvidersWrapper>
          <main>
            <Navbar />
            {children}
          </main>
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  )
}
