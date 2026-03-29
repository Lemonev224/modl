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
  description: 'Everything your management agency does. For £25 a month. Keep 100% of your earnings.',
  openGraph: {
    title: 'MODL — Be Your Own Agency',
    description: 'Earnings tracking, content scheduling, fan CRM, and analytics — all in one dashboard. You never need a management agency again.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}