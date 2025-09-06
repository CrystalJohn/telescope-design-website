import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap"
})

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Telescope - AI Product Design Agency",
  description: "Modern AI product design agency specializing in innovative digital experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}