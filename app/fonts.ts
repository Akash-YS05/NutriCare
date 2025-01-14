import { Inter, Poppins } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})
