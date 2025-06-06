import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import birthdayConfig from '@/config/birthdayConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Happy Birthday ${birthdayConfig.name}! 🎉`,
  description: `A special birthday experience created just for ${birthdayConfig.name}`,
  keywords: ['birthday', 'celebration', 'games', 'memories', birthdayConfig.name],
  authors: [{ name: 'Birthday Experience Creator' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: `Happy Birthday ${birthdayConfig.name}! 🎉`,
    description: `A special birthday experience created just for ${birthdayConfig.name}`,
    type: 'website',
    images: [
      {
        url: '/og-birthday.png',
        width: 1200,
        height: 630,
        alt: `${birthdayConfig.name}'s Birthday Experience`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Happy Birthday ${birthdayConfig.name}! 🎉`,
    description: `A special birthday experience created just for ${birthdayConfig.name}`,
    images: ['/og-birthday.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --primary-color: ${birthdayConfig.theme.primaryColor};
                --secondary-color: ${birthdayConfig.theme.secondaryColor};
                --accent-color: ${birthdayConfig.theme.accentColor};
                --background-color: ${birthdayConfig.theme.backgroundColor};
                --text-color: ${birthdayConfig.theme.textColor};
                --font-family: ${birthdayConfig.theme.fontFamily};
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-text">
          {children}
        </div>
      </body>
    </html>
  )
} 