"use client"

import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import CapabilitiesAndStats from "@/components/CapabilitiesAndStats"
import PortfolioAndContact from "@/components/PortfolioAndContact"
import { Toaster } from "sonner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Global Layout Structure */}
      <div className="relative w-full">
        {/* Sticky Header */}
        <Header />
        
        {/* Main Content Stack */}
        <main className="w-full">
          {/* Hero Section - Full viewport, saturated background */}
          <section id="hero" className="w-full">
            <HeroSection />
          </section>
          
          {/* Capabilities & Stats - Full-width with alternating backgrounds */}
          <section id="capabilities-stats" className="w-full">
            <CapabilitiesAndStats />
          </section>
          
          {/* Portfolio & Contact - Neutral/dark band with grid layout */}
          <section id="portfolio-contact" className="w-full">
            <PortfolioAndContact />
          </section>
        </main>
      </div>
      
      {/* Global Toast Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  )
}