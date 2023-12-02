import { Inter } from 'next/font/google'
import './globals.css'
import { DatalayerProvider } from '@/components/DatalayerProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <DatalayerProvider>{children}</DatalayerProvider>
      </body>
    </html>
  )
}
