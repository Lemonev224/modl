import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

export const metadata = {
  title: 'MODL — Be Your Own Agency',
  description: 'Everything your agency does. For $30 a month. Keep 100% of your earnings.',
  openGraph: {
    title: 'MODL — Be Your Own Agency',
    description: 'Professional comp card, verified casting calls, contracts and payments. You never need an agency again.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}