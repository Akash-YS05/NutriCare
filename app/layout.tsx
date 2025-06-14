import type { Metadata } from "next"
import { Inter, Manjari } from 'next/font/google'
import './globals.css'
import {Sidebar} from '@/components/ui/Sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Provider from '@/components/Provider'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "NutriCare - Healthcare Services",
  description: "Professional healthcare services for your well-being",
}

const manjari = Manjari({weight: "400", style: 'normal', subsets: ['latin'] })
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${inter.className} ${manjari.className}`} >
        <Provider>
          <div className="flex h-screen">
            {session && <Sidebar />}
            <main className="flex-1 overflow-y-auto">
              {children}
              <Toaster position="top-right" reverseOrder={false} />
              <Analytics/>
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}